import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Timer from '@material-ui/icons/Timer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Moment from 'moment';
import 'moment/locale/de';
import styles from './VideoGridItem.scss';
import {
  BlueButton,
  PrimaryButton,
  SecondaryButton
} from '../../../customizedMaterialComponents';
import { difficultyColors, difficultyLabels } from '../../../helpers';
import Loader from '../../Loaders/Button/ButtonLoader';
import {
  addFavorite,
  deleteFavorite,
  updateFavorite
} from '../../../services/user';
import handleError from '../../../errorHandler';

const TrainingPlanFavIconButton = withStyles({
  root: {
    width: 30,
    height: 30,
    padding: 0
  }
})(IconButton);

const getShortenedToolsStr = tools =>
  tools.length < 25 ? tools : `${tools.slice(0, 25).trim()}...`;

export default class VideoGridItem extends Component {
  state = {
    isFavModalOpen: false,
    isAddedToFavorite: null,
    isSubmitting: false,
    isDeleting: false,
    noteTextField: '',
    newNote: '',
    changedFavorite: false,
    difficultySelectValue: 0,
    newDifficulty: 0,
    newFavId: null
  };

  componentDidMount() {
    const {
      props: { favNote, favDifficulty }
    } = this;
    this.setState({
      noteTextField: favNote || '',
      difficultySelectValue: favDifficulty || 0
    });
  }

  submitFav = () => {
    const {
      state: {
        noteTextField,
        difficultySelectValue,
        isAddedToFavorite,
        newFavId
      },
      props: { id, favId, isFav }
    } = this;

    const isFavorite = isAddedToFavorite === null ? isFav : isAddedToFavorite;

    this.setState({ isSubmitting: true });
    const request = isFavorite
      ? updateFavorite(newFavId || favId, noteTextField, difficultySelectValue)
      : addFavorite('video', id, noteTextField, difficultySelectValue);
    request
      .then(({ data }) => {
        this.setState({
          isFavModalOpen: false,
          isSubmitting: false,
          isAddedToFavorite: true,
          newNote: noteTextField,
          changedFavorite: true,
          newDifficulty: difficultySelectValue,
          newFavId: data.favorite_data.id
        });
      })
      .catch(handleError);
  };

  deleteFav = () => {
    const {
      props: { favId },
      state: { newFavId }
    } = this;
    this.setState({ isDeleting: true });
    deleteFavorite('video', newFavId || favId)
      .then(() => {
        this.setState({
          isFavModalOpen: false,
          isDeleting: false,
          isAddedToFavorite: false,
          noteTextField: '',
          newNote: '',
          difficultySelectValue: 0,
          newDifficulty: 0,
          changedFavorite: true,
          newFavId: null
        });
      })
      .catch(handleError);
  };

  updateNote = ({ target: { value } }) =>
    this.setState({ noteTextField: value });

  closeFavModal = () => {
    const {
      state: {
        changedFavorite,
        newNote,
        newDifficulty,
        isSubmitting,
        isDeleting
      },
      props: { favNote, favDifficulty }
    } = this;
    if (!isSubmitting && !isDeleting) {
      const note = changedFavorite ? newNote : favNote || '';
      const difficulty = changedFavorite ? newDifficulty : favDifficulty || 0;
      this.setState({
        isFavModalOpen: false,
        noteTextField: note,
        difficultySelectValue: difficulty
      });
    }
  };

  fromNow = () => {
    Moment.locale('de');
    const date = '2019-01-01 11:00:00';
    const x = new Moment();

    if (Math.floor(Moment.duration(x.diff(new Moment(date))).asDays()) <= 28) {
      return Moment(date).fromNow();
    }

    if (Math.floor(Moment.duration(x.diff(new Moment(date))).asDays()) > 28) {
      return Moment(date).format('DD.MM.Y');
    }

    return null;
  };

  render() {
    const {
      state: {
        isFavModalOpen,
        isSubmitting,
        isDeleting,
        isAddedToFavorite,
        noteTextField,
        difficultySelectValue
      },
      props: {
        id,
        courseName,
        coachId,
        coachName,
        coachAvatarUrl,
        level,
        thumbnailURL,
        tools,
        kcal,
        date,
        duration,
        playsAmount,
        lastPlayedPercentage,
        downloadLink,
        isFav,
        baseDomain,
        column
      },
      fromNow
    } = this;

    const isFavorite = isAddedToFavorite === null ? isFav : isAddedToFavorite;

    const loading = isSubmitting || isDeleting;

    return (
      <div
        key={id}
        className={styles.cont}
        style={
          column
            ? {
                display: 'flex',
                height: 'auto',
                marginBottom: 20
              }
            : {}
        }
      >
        <a
          href={`${baseDomain}/videos/watch/${id}`}
          className={styles.thumbnailCont}
          style={
            column
              ? {
                  flexBasis: '40%'
                }
              : {}
          }
        >
          <div
            className={styles.thumbnail}
            style={{ backgroundImage: `url(${thumbnailURL})` }}
          />
          <div className={styles.courseTitleWrapper}>
            <span className={styles.courseTitle}>{courseName}</span>
          </div>
          <div className={styles.playIconCont}>
            <svg
              width={36}
              height={36}
              viewBox="0 0 36 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-63.000000, -269.000000)">
                  <polygon points="63 269 99 269 99 305 63 305" />
                  <circle
                    fill="#FFFFFF"
                    opacity="0.700000048"
                    cx="81"
                    cy="287"
                    r="18"
                  />
                  <polygon
                    fill="#EC407A"
                    fillRule="nonzero"
                    points="77.25 279.363636 77.25 294.636364 89.25 287"
                  />
                </g>
              </g>
            </svg>
          </div>
          {!!playsAmount && (
            <div className={styles.progressBar}>
              <div
                className={styles.progressBarPlayed}
                style={{ width: `${lastPlayedPercentage}%` }}
              />
            </div>
          )}
        </a>
        <div
          className={styles.bottomCont}
          style={
            column
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  flexBasis: '60%',
                  justifyContent: 'space-between'
                }
              : {}
          }
        >
          <div>
            <div className={styles.coachCont}>
              <a
                href={`${baseDomain}/fitbook/profile/${coachId}`}
                className={styles.coachAvatarLink}
              >
                <img
                  className={styles.coachAvatar}
                  src={coachAvatarUrl}
                  alt="Trainer avatar"
                />
              </a>
              <div>
                <a
                  href={`${baseDomain}/fitbook/profile/${coachId}`}
                  className={styles.coachName}
                >
                  {coachName}
                </a>
                <div className={styles.toolsCont}>
                  <span className={styles.toolsAmount}>
                    {getShortenedToolsStr(tools)}
                  </span>
                  {tools.length > 24 && (
                    <Tooltip title={tools} placement="right">
                      <div className={styles.iconCont}>
                        <HelpOutlineIcon color="inherit" fontSize="inherit" />
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            <Tooltip title={difficultyLabels[level - 1] || ''}>
              <div
                style={{
                  color: difficultyColors[level - 1] || '#CFD8DC',
                  fontSize: 20,
                  cursor: 'help'
                }}
              >
                <FitnessCenterIcon color="inherit" fontSize="inherit" />
              </div>
            </Tooltip>
          </div>
          <div>
            <div className={styles.infoCont}>
              {kcal > 0 ? (
                <div>
                  <div className={styles.iconCont}>
                    <WhatshotIcon color="inherit" fontSize="inherit" />
                  </div>
                  <span>
                    {kcal}
                    &nbsp;kcal
                  </span>
                </div>
              ) : null}
              <div>
                <div className={styles.iconCont}>
                  <Timer color="inherit" fontSize="inherit" />
                </div>
                <span>
                  {duration}
                  &nbsp;min
                </span>
              </div>
              <div>
                <div className={styles.iconCont}>
                  {fromNow(date) ? (
                    <AccessTimeIcon color="inherit" fontSize="inherit" />
                  ) : (
                    'ID: '
                  )}
                </div>
                <span>{fromNow(date) || id}</span>
              </div>
            </div>
            <TrainingPlanFavIconButton
              onClick={() => this.setState({ isFavModalOpen: true })}
            >
              <div
                className={styles.iconCont}
                data-red={isFavorite ? 'true' : null}
              >
                <FavoriteIcon color="inherit" fontSize="inherit" />
              </div>
            </TrainingPlanFavIconButton>
          </div>
        </div>
        {downloadLink && (
          <div className={styles.downloadButtonWrapper}>
            <BlueButton
              type="submit"
              style={{ width: '100%' }}
              href={downloadLink}
              target="_blank"
            >
              Herunterladen
            </BlueButton>
          </div>
        )}
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < 768}
          open={isFavModalOpen || loading}
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
              disabled={loading}
              style={{ marginBottom: 20 }}
            />
            <FormControl fullWidth variant="outlined" disabled={loading}>
              <InputLabel htmlFor="difficulty-select">
                Wie schwer findest Du den Kurs?
              </InputLabel>
              <Select
                value={difficultySelectValue}
                onChange={({ target: { value } }) =>
                  this.setState({ difficultySelectValue: value })
                }
                input={
                  <OutlinedInput
                    name="difficulty-select"
                    id="difficulty"
                    labelWidth={235}
                  />
                }
              >
                <MenuItem value={0}>
                  <em>Keiner</em>
                </MenuItem>
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
              <PrimaryButton disabled={loading} onClick={this.deleteFav}>
                Entfernen
                {isDeleting && <Loader color="#ffffff" />}
              </PrimaryButton>
            )}
            <SecondaryButton disabled={loading} onClick={this.closeFavModal}>
              Schließen
            </SecondaryButton>
            <BlueButton
              color="primary"
              disabled={loading}
              onClick={this.submitFav}
            >
              Speichern
              {isSubmitting && <Loader color="#ffffff" />}
            </BlueButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

VideoGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  courseName: PropTypes.string.isRequired,
  coachId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  coachName: PropTypes.string.isRequired,
  coachAvatarUrl: PropTypes.string.isRequired,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  thumbnailURL: PropTypes.string.isRequired,
  tools: PropTypes.string.isRequired,
  kcal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  playsAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  lastPlayedPercentage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  downloadLink: PropTypes.string,
  isFav: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  favId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  favNote: PropTypes.string,
  favDifficulty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  column: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

VideoGridItem.defaultProps = {
  downloadLink: null,
  column: false,
  favId: null,
  favNote: '',
  favDifficulty: 0
};
