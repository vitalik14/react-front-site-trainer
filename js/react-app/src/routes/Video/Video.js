import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WhatsHot from '@material-ui/icons/Whatshot';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Webcam from 'react-webcam';

import styles from './Video.scss';
import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';
import Comments from '../../common/components/Comments/Comments';
import { difficultyColors, difficultyLabels } from '../../common/helpers';
import {
  BlueButton,
  PrimaryButton,
  SecondaryButton,
  TextBlueButton,
  TextLightGreyButton,
} from '../../common/customizedMaterialComponents';
import { sendVideoFeedback } from '../../common/services/videos';
import handleError from '../../common/errorHandler';
import {
  addFavorite,
  deleteFavorite,
  updateFavorite,
  like,
  unlike,
} from '../../common/services/user';
import Loader from '../../common/components/Loaders/Button/ButtonLoader';
import video from '../../common/models/video';

const getWebCamTooltipTitle = () => {
  if (localStorage.purLifeWebCamAllowed === 'false') {
    return 'Wir benötigen Ihren Zugang, um Ihre Computer-Webkamera zu verwenden. Bitte erlauben Sie es in Ihren Einstellungen.';
  }

  if (localStorage.purLifeWebCamAllowed === undefined) {
    return 'Wir benötigen Ihren Zugang, um Ihre Computer-Webkamera zu verwenden';
  }

  return '';
};

export default class Video extends Component {
  subjects = [
    'Video lädt nicht',
    'Video endet zu früh',
    'Fehler im Video',
    'Falscher Kurs',
    'Falscher Trainer',
  ];

  state = {
    isFeedbackModalOpen: false,
    isSendingFeedback: false,
    subjectSelectValue: 0,
    subjectTextFieldValue: '',
    messageTextFieldValue: '',
    feedbackSent: false,
    isWebCamViewEnabled: false,
    isFavModalOpen: false,
    isAddedToFavorite: null,
    isSubmittingFav: false,
    isDeletingFromFav: false,
    noteTextField: '',
    newNote: '',
    changedFavorite: false,
    difficultySelectValue: 0,
    newDifficulty: 0,
    newFavId: null,
    isLiking: false,
    liked: null,
  };

  componentWillReceiveProps({ data: { meta } }) {
    if (meta) {
      this.setState({
        noteTextField: meta.isFavorite ? meta.favorite.data.note : '',
        difficultySelectValue: meta.isFavorite ? meta.favorite.data.difficulty : 0,
      });
    }
  }

  submitFav = () => {
    const {
      state: {
        noteTextField,
        difficultySelectValue,
        isAddedToFavorite,
        newFavId,
      },
      props: {
        data: { id, meta: { isFavorite: isFav, favorite: { id: favId = null } = {} } },
      },
    } = this;

    const isFavorite = isAddedToFavorite === null
      ? isFav
      : isAddedToFavorite;

    this.setState({ isSubmittingFav: true });
    const request = isFavorite
      ? updateFavorite(newFavId || favId, noteTextField, difficultySelectValue)
      : addFavorite('video', id, noteTextField, difficultySelectValue);
    request
      .then(({ data }) => {
        this.setState({
          isFavModalOpen: false,
          isSubmittingFav: false,
          isAddedToFavorite: true,
          newNote: noteTextField,
          changedFavorite: true,
          newDifficulty: difficultySelectValue,
          newFavId: data.favorite_data.id,
        });
      })
      .catch(handleError);
  };

  deleteFav = () => {
    const {
      props: {
        data: { meta: { favorite: { id: favId = null } = {} } },
      },
      state: { newFavId },
    } = this;
    this.setState({ isDeletingFromFav: true });
    deleteFavorite('video', newFavId || favId)
      .then(() => {
        this.setState({
          isFavModalOpen: false,
          isDeletingFromFav: false,
          isAddedToFavorite: false,
          noteTextField: '',
          newNote: '',
          difficultySelectValue: 0,
          newDifficulty: 0,
          changedFavorite: true,
          newFavId: null,
        });
      })
      .catch(handleError);
  };

  updateNote = ({ target: { value } }) => this.setState({ noteTextField: value });

  closeFavModal = () => {
    const {
      state: {
        changedFavorite,
        newNote,
        newDifficulty,
      },
      props: {
        data: {
          meta: {
            favorite: {
              data: {
                note: favNote = null,
                difficulty: favDifficulty = null,
              } = {},
            } = {},
          },
        },
      },
    } = this;
    const note = changedFavorite
      ? newNote
      : favNote || '';
    const difficulty = changedFavorite
      ? newDifficulty
      : favDifficulty || 0;
    this.setState({
      isFavModalOpen: false,
      noteTextField: note,
      difficultySelectValue: difficulty,
    });
  };

  closeFeedbackDialog = () => {
    this.setState({
      isFeedbackModalOpen: false,
      isSendingFeedback: false,
      subjectSelectValue: 0,
      subjectTextFieldValue: '',
      messageTextFieldValue: '',
    });
  };

  sendFeedback = () => {
    const {
      props: { id },
      state: {
        subjectSelectValue,
        subjectTextFieldValue,
        messageTextFieldValue,
      },
    } = this;
    const subject = subjectSelectValue === 6
      ? subjectTextFieldValue
      : this.subjects[subjectSelectValue - 1];
    this.setState({ isSendingFeedback: true });
    sendVideoFeedback(id, subject, messageTextFieldValue)
      .then(() => {
        this.closeFeedbackDialog();
        this.setState({ feedbackSent: true });
      })
      .catch(handleError);
  };

  enableWebCamView = () => {
    if (localStorage.purLifeWebCamAllowed === 'false') {
      return null;
    }

    const { props: { setSidebarExpansionState } } = this;
    setSidebarExpansionState(false);
    document.body.classList.add('sidebar-collapsed');

    if (localStorage.purLifeWebCamAllowed === 'true') {
      return this.setState({ isWebCamViewEnabled: true });
    }

    navigator.getMedia = (
      navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia
    );

    navigator.getMedia(
      { video: true },
      () => {
        localStorage.setItem('purLifeWebCamAllowed', 'true');
        this.setState({ isWebCamViewEnabled: true });
      },
      () => {
        localStorage.setItem('purLifeWebCamAllowed', 'false');
        setSidebarExpansionState(null);
        document.body.classList.remove('sidebar-collapsed');
      },
    );

    return null;
  };

  disableWebCamView = () => {
    const { props: { setSidebarExpansionState } } = this;
    setSidebarExpansionState(null);
    document.body.classList.remove('sidebar-collapsed');
    this.setState({ isWebCamViewEnabled: false });
  };

  handleLikeClick = () => {
    const { state: { liked: localLiked }, props: { data: { id, user: { isLiked } } } } = this;
    const liked = localLiked === null
      ? isLiked
      : localLiked;
    this.setState({ isLiking: true });
    if (liked) {
      unlike('video', id)
        .then(() => this.setState({ isLiking: false, liked: false }))
        .catch(handleError);
    } else {
      like('video', id)
        .then(() => this.setState({ isLiking: false, liked: true }))
        .catch(handleError);
    }
  };

  render = () => {
    const {
      state: {
        isFeedbackModalOpen,
        isSendingFeedback,
        subjectSelectValue,
        subjectTextFieldValue,
        messageTextFieldValue,
        feedbackSent,
        isWebCamViewEnabled,
        isFavModalOpen,
        isSubmittingFav,
        isDeletingFromFav,
        isAddedToFavorite,
        noteTextField,
        difficultySelectValue,
        isLiking,
        liked,
      },
      props: {
        baseDomain,
        id,
        loading,
        data,
      },
    } = this;

    if (loading || !Object.keys(data).length) return <LayoutLoader />;

    const isLiked = liked === null
      ? data.user.isLiked
      : liked;

    const isFavorite = isAddedToFavorite === null
      ? data.meta.isFavorite
      : isAddedToFavorite;

    const favLoading = isSubmittingFav || isDeletingFromFav;

    return (
      <>
        <div className={styles.block}>
          <div className={styles.topWrapper}>
            <div className={styles.titleWrapper}>
              <a
                href={`${baseDomain}/kurse/${data.course.slug}`}
                className={styles.title}
              >
                {data.course.name}
              </a>
              <div
                className={styles.difficultyDesktopIconWrapper}
                style={{ color: difficultyColors[data.level - 1] || '#CFD8DC' }}
              >
                <Tooltip title={difficultyLabels[data.level - 1] || ''}>
                  <FitnessCenterIcon color="inherit" fontSize="inherit" />
                </Tooltip>
              </div>
            </div>
            <div className={styles.actionIconsWrapper}>
              <div className={styles.likeWrapper}>
                {isLiking && <Loader color="#9e9e9d" />}
                <div className={styles.likeIconCont} data-red={isLiked ? 'true' : null}>
                  <Tooltip title={isLiked ? 'Unähnlich' : 'Mögen'}>
                    <IconButton
                      style={{ fontSize: 'inherit' }}
                      color="inherit"
                      onClick={this.handleLikeClick}
                      disabled={!!isLiking}
                    >
                      <ThumbUpIcon color="inherit" fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className={styles.favoriteIconCont} data-red={isFavorite ? 'true' : null}>
                <Tooltip
                  title={
                    isFavorite
                      ? 'Favoritendetails bearbeiten oder aus Favoriten entfernen'
                      : 'Zu meinen Favoriten hinzufügen'
                  }
                >
                  <IconButton
                    style={{ fontSize: 'inherit' }}
                    color="inherit"
                    onClick={() => this.setState({ isFavModalOpen: true })}
                  >
                    <FavoriteIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={styles.videoViewsWrapper}>
            <div
              className={`embed-container ${styles.vimeoContainer}`}
              style={{
                flexBasis: isWebCamViewEnabled ? '50%' : '100%',
                paddingBottom: isWebCamViewEnabled ? '0' : '56.25%',
              }}
            >
              <iframe
                title="PurLife Video"
                src="https://player.vimeo.com/video/304255172"
                // src={`https://player.vimeo.com/video/${data.vimeoId}`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
            {isWebCamViewEnabled && (
              <div className={styles.webCamView}>
                <Webcam audio={false} width="100%" height="auto" />
              </div>
            )}
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.infoTopWrapper}>
              <p className={styles.tools}>
                Hilfsmittel: &nbsp;
                {data.course.tools}
              </p>
              <div className={styles.infoTopLeftInnerWrapper}>
                <div>
                  <div className={styles.infoIconWrapper}>
                    <WhatsHot color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    {data.kcal}
                    &nbsp;kcal
                  </span>
                </div>
                <div>
                  <div className={styles.infoIconWrapper}>
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    {data.duration}
                    &nbsp;min
                  </span>
                </div>
                <div
                  className={styles.difficultyMobileIconWrapper}
                  style={{ color: difficultyColors[data.level - 1] || '#CFD8DC' }}
                >
                  <Tooltip title={difficultyLabels[data.level - 1] || ''}>
                    <FitnessCenterIcon color="inherit" fontSize="inherit" />
                  </Tooltip>
                </div>
              </div>
            </div>
            {data.description && (
              <p className={styles.description}>
                {data.description}
                <br />
              </p>
            )}
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data.course.descriptions.full }}
            />
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.trainerInfoWrapper}>
              <a
                href={`${baseDomain}/fitbook/profile/${data.trainer.user.id}`}
                className={styles.trainerAvatarLink}
              >
                <img
                  src={data.trainer.user.profilePicUrl}
                  alt={`Avatar von ${data.trainer.name}`}
                  className={styles.trainerAvatar}
                />
              </a>
              <a
                href={`${baseDomain}/fitbook/profile/${data.trainer.user.id}`}
                className={styles.trainerName}
              >
                {data.trainer.name}
              </a>
            </div>
            <div className={styles.buttonsWrapper}>
              <TextLightGreyButton
                onClick={() => this.setState({ isFeedbackModalOpen: true, feedbackSent: false })}
              >
                PROBLEM MELDEN
              </TextLightGreyButton>
              {!isWebCamViewEnabled && (
                <Tooltip title={getWebCamTooltipTitle()}>
                  <TextLightGreyButton onClick={this.enableWebCamView}>
                    SELBSTKONTROLLE
                    <sup className={styles.beta}>Beta</sup>
                  </TextLightGreyButton>
                </Tooltip>
              )}
              {isWebCamViewEnabled && (
                <TextLightGreyButton onClick={this.disableWebCamView}>
                  BEENDEN SIE SELBSTKONTROLLE
                </TextLightGreyButton>
              )}
            </div>
          </div>
        </div>
        <Comments
          baseDomain={baseDomain}
          entityType="video"
          entityItemId={id}
        />
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < 768}
          open={isFeedbackModalOpen || isSendingFeedback}
          onClose={this.closeFeedbackDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Problem melden</DialogTitle>
          <DialogContent>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="subject-select">Ground *</InputLabel>
              <Select
                value={subjectSelectValue}
                variant="outlined"
                onChange={({ target: { value } }) => this.setState({ subjectSelectValue: value })}
                input={<Input name="subject-select" id="subject" />}
              >
                <MenuItem value={0} disabled><em>Wählen</em></MenuItem>
                <MenuItem value={1}>Video lädt nicht</MenuItem>
                <MenuItem value={2}>Video endet zu früh</MenuItem>
                <MenuItem value={3}>Fehler im Video</MenuItem>
                <MenuItem value={4}>Falscher Kurs</MenuItem>
                <MenuItem value={5}>Falscher Trainer</MenuItem>
                <MenuItem value={6}>Anderer</MenuItem>
              </Select>
            </FormControl>
            {subjectSelectValue === 6 && (
              <TextField
                fullWidth
                id="subject-text"
                label="Benutzerdefiniertes Ground *"
                value={subjectTextFieldValue}
                onChange={
                  ({ target: { value } }) => this.setState({ subjectTextFieldValue: value })
                }
                margin="normal"
                variant="outlined"
              />
            )}
            <TextField
              fullWidth
              multiline
              id="message"
              label="Beschreibung"
              value={messageTextFieldValue}
              onChange={({ target: { value } }) => this.setState({ messageTextFieldValue: value })}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isSendingFeedback}
              onClick={this.closeFeedbackDialog}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={
                isSendingFeedback
                || subjectSelectValue === 0
                || (subjectSelectValue === 6 && !subjectTextFieldValue)}
              onClick={this.sendFeedback}
            >
              Verlassen und löschen
              {isSendingFeedback && (
                <div style={{ height: 16, marginLeft: 15 }}>
                  <CircularProgress color="inherit" size={16} />
                </div>
              )}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
        <Snackbar
          className="successSnackbar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={5000}
          open={feedbackSent}
          onClose={() => this.setState({ feedbackSent: false })}
          ContentProps={{
            'aria-describedby': 'feedback-sent-message',
          }}
          message={(
            <>
              <div className="successIconWrapper">
                <CheckCircleIcon color="inherit" fontSize="inherit" />
              </div>
              <span id="feedback-sent-message">Vielen Dank! Ihr Feedback wurde erfolgreich gesendet.</span>
            </>
          )}
          action={[
            <div key="close" className="closeSnackbarIconWrapper">
              <IconButton
                aria-label="Close"
                color="inherit"
                style={{
                  width: 30,
                  height: 30,
                  fontSize: 'inherit',
                }}
                onClick={() => this.setState({ feedbackSent: false })}
              >
                <CloseIcon color="inherit" fontSize="inherit" />
              </IconButton>
            </div>,
          ]}
        />
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < 768}
          open={isFavModalOpen || favLoading}
          onClose={this.closeFavModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {!isFavorite && 'Zu Favoriten hinzufügen'}
            {isFavorite && 'Favorit bearbeiten'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              multiline
              id="note"
              label="Dein Kommentar"
              value={noteTextField}
              onChange={this.updateNote}
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="difficulty-select">Wie schwer findest Du den Kurs?</InputLabel>
              <Select
                value={difficultySelectValue}
                variant="outlined"
                onChange={
                  ({ target: { value } }) => this.setState({ difficultySelectValue: value })
                }
                input={<Input name="difficulty-select" id="difficulty" />}
              >
                <MenuItem value={0}><em>Keiner</em></MenuItem>
                <MenuItem value={1}>Sehr leicht</MenuItem>
                <MenuItem value={2}>Einfach</MenuItem>
                <MenuItem value={3}>Mittel</MenuItem>
                <MenuItem value={4}>Schwer</MenuItem>
                <MenuItem value={5}>Sehr schwer</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            {isFavorite && (
              <PrimaryButton
                disabled={favLoading}
                onClick={this.deleteFav}
              >
                Entfernen
                {isDeletingFromFav && <Loader color="#ffffff" />}
              </PrimaryButton>
            )}
            <SecondaryButton
              disabled={favLoading}
              onClick={this.closeFavModal}
            >
              Schließen
            </SecondaryButton>
            <BlueButton
              color="primary"
              disabled={favLoading}
              onClick={this.submitFav}
            >
              Speichern
              {isSubmittingFav && <Loader color="#ffffff" />}
            </BlueButton>
          </DialogActions>
        </Dialog>
      </>
    );
  };
}

Video.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  data: video,
  setSidebarExpansionState: PropTypes.func.isRequired,
};

Video.defaultProps = {
  data: {},
};
