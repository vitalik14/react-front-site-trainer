import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import styles from './SingleTrainingPlan.scss';
import {
  fetchSingleTrainingPlan,
  fetchCurrentTrainingPlan,
  pinTrainingPlan,
  unpinTrainingPlan,
  setTrainingPlan,
} from '../../common/services/training';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import { PrimaryButton, TextBlueButton, WhiteButton } from '../../common/customizedMaterialComponents';
import VideoGridItem from '../../common/components/GridItems/Video/VideoGridItem';
import handleError from '../../common/errorHandler';
import { camalizeKeys, toDateString } from '../../common/helpers';

const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

const StyledFab = withStyles({
  root: {
    backgroundColor: '#ffffff',
    width: 32,
    height: 32,
    minHeight: 'auto',
    position: 'relative',
    zIndex: 2,
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
})(Fab);

const StyledCircularProgress = withStyles({
  root: {
    position: 'absolute',
    top: -3,
    left: -3,
    color: '#ec407a',
    zIndex: 1,
  },
})(CircularProgress);

export default class SingleTrainingPlan extends Component {
  state = {
    loading: true,
    data: {},
    expandedWeeks: [1],
    pinned: null,
    isPinning: false,
    isSetPlanModalOpen: false,
    isSettingPlan: false,
    isCurrentPlan: null,
    currentPlanName: '',
    mealPlanSelectValue: 0,
    startDateValue: toDateString(new Date()),
  };

  componentDidMount() {
    const { props: { id } } = this;
    fetchSingleTrainingPlan(id)
      .then(({ data: { trainingplan } }) => this.setState({
        loading: false,
        data: camalizeKeys(trainingplan),
      }))
      .then(fetchCurrentTrainingPlan)
      .then(({
        data: { trainingplan: { id: currentPlanId, name: currentPlanName } },
      }) => this.setState({ isCurrentPlan: id === currentPlanId, currentPlanName }))
      .catch(handleError);
  }

  toggleWeek = num => this.setState(({ expandedWeeks }) => ({
    expandedWeeks: expandedWeeks.includes(num)
      ? expandedWeeks.filter(week => week !== num)
      : [...expandedWeeks, num],
  }));

  handlePinClick = () => {
    this.setState({ isPinning: true });

    const { state: { pinned, data } } = this;

    const isPinned = pinned === null
      ? data.metadata.isPinned
      : pinned;

    if (isPinned) {
      unpinTrainingPlan(data.id)
        .then(() => this.setState({ isPinning: false, pinned: false }))
        .catch(handleError);
    } else {
      pinTrainingPlan(data.id)
        .then(() => this.setState({ isPinning: false, pinned: true }))
        .catch(handleError);
    }
  };

  setPlan = () => {
    this.setState({ isSettingPlan: true });
    const { state: { data: { id }, mealPlanSelectValue, startDateValue } } = this;
    setTrainingPlan(id, !!mealPlanSelectValue, startDateValue)
      .then(() => {
        this.setState({
          isSettingPlan: false,
          isCurrentPlan: true,
          isSetPlanModalOpen: false,
          mealPlanSelectValue: 0,
          startDateValue: toDateString(new Date()),
        });
      })
      .catch(handleError);
  };

  closeSetPlanDialog = () => {
    const { state: { isSettingPlan } } = this;
    if (!isSettingPlan) {
      this.setState({
        isSetPlanModalOpen: false,
        mealPlanSelectValue: 0,
        startDateValue: toDateString(new Date()),
      });
    }
  };

  isExpanded = week => this.state.expandedWeeks.includes(+week); // eslint-disable-line

  render() {
    const {
      state: {
        loading,
        data,
        pinned,
        isPinning,
        isSetPlanModalOpen,
        isSettingPlan,
        currentPlanName,
        mealPlanSelectValue,
        startDateValue,
        isCurrentPlan,
      },
      props: { baseDomain },
    } = this;

    if (loading) return <Loader />;

    const isPinned = pinned === null
      ? data.metadata.isPinned
      : pinned;

    return (
      <>
        <div
          className={styles.banner}
          style={{
            backgroundImage: `url(${data.banners.default || `${baseDomain}/assets/images/default/plan.jpg`})`,
          }}
        >
          <div>
            <h1 className={styles.bannerTitle}>{data.name}</h1>
            <p
              className={styles.bannerDescription}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
          <div className={styles.actionsWrapper}>
            {!isCurrentPlan && (
              <WhiteButton
                onClick={() => this.setState({ isSetPlanModalOpen: true })}
                style={{ boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)' }}
              >
                PLAN WAHLEN
              </WhiteButton>
            )}
            {isCurrentPlan && (
              <WhiteButton href={`${baseDomain}/kurse/wochenplan`}>
                WOCHENPLAN
              </WhiteButton>
            )}
            <div className={styles.actionIconWrapper} data-red={isPinned ? 'true' : null}>
              <Tooltip
                title={
                  isPinned
                    ? 'Entferne es aus meinen fixierten Trainingsplänen'
                    : 'Füge es meinen fixierten Trainingsplänen hinzu'
                }
              >
                <StyledFab
                  color="inherit"
                  style={{ fontSize: 'inherit' }}
                  onClick={this.handlePinClick}
                  disabled={isPinning}
                >
                  {!isPinned && <BookmarkBorderIcon color="inherit" fontSize="inherit" />}
                  {isPinned && <BookmarkIcon color="inherit" fontSize="inherit" />}
                </StyledFab>
              </Tooltip>
              {isPinning && <StyledCircularProgress size={38} />}
            </div>
          </div>
        </div>
        {isCurrentPlan && (
          <p
            className="placeholder"
          >
            Dies ist dein aktueller Plan.
            Sie können den Inhalt anzeigen, indem Sie zur Wochenplanseite navigieren.
          </p>
        )}
        {!isCurrentPlan && Object.entries(data.content).map(([week, days]) => (
          <Fragment key={week}>
            <div className="weekTitleWrapper">
              <h2 className="weekTitle">{`Woche ${week}`}</h2>
              <div className="expandIconWrapper" data-expanded={this.isExpanded(week) ? 'true' : null}>
                <IconButton
                  color="inherit"
                  style={{
                    width: 32,
                    height: 32,
                    padding: 0,
                    fontSize: 'inherit',
                  }}
                  onClick={() => this.toggleWeek(+week)}
                >
                  {this.isExpanded(week) && (
                    <RemoveIcon color="inherit" fontSize="inherit" />
                  )}
                  {!this.isExpanded(week) && (
                    <AddIcon color="inherit" fontSize="inherit" />
                  )}
                </IconButton>
              </div>
            </div>
            <Collapse in={this.isExpanded(week)}>
              {Object.entries(days).map(([day, videos]) => (
                <Fragment key={day}>
                  <h2 className={styles.day}>{weekDays[day]}</h2>
                  <div className="gridWrapper">
                    {Object.values(videos).map(({ videoData }) => (
                      <div className="gridItem" key={Math.random()}>
                        {!!videoData && (
                          <VideoGridItem
                            baseDomain={baseDomain}
                            id={videoData.id}
                            courseName={videoData.course.name}
                            coachId={videoData.trainer.user.id}
                            coachName={videoData.trainer.name}
                            coachAvatarUrl={videoData.trainer.user.profilePicUrl}
                            level={videoData.level}
                            thumbnailURL={videoData.course.banners.default}
                            tools={videoData.course.tools}
                            kcal={videoData.kcal}
                            duration={videoData.duration}
                            playsAmount={videoData.user.playAmount}
                            lastPlayedPercentage={videoData.user.playedInPercent}
                            isFav={videoData.meta.isFavorite}
                            favId={
                              videoData.meta.isFavorite
                                ? videoData.meta.favorite.id
                                : null
                            }
                            favNote={
                              videoData.meta.isFavorite
                                ? videoData.meta.favorite.data.note
                                : null
                            }
                            favDifficulty={
                              videoData.meta.isFavorite
                                ? videoData.meta.favorite.data.difficulty
                                : null
                            }
                          />
                        )}
                        {!videoData && <p>Keine Videos</p>}
                      </div>
                    ))}
                  </div>
                </Fragment>
              ))}
            </Collapse>
          </Fragment>
        ))}
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < 768}
          open={isSetPlanModalOpen || isSettingPlan}
          onClose={this.closeSetPlanDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Trainingsplan wählen</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="subject-select">Mit Ernährungsplan?</InputLabel>
              <Select
                value={mealPlanSelectValue}
                onChange={({ target: { value } }) => this.setState({ mealPlanSelectValue: value })}
                input={<OutlinedInput name="subject-select" id="subject" labelWidth={200} />}
              >
                <MenuItem value={0}>Nein</MenuItem>
                <MenuItem value={1}>Ja</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              label="Wann möchtest Du starten?"
              value={startDateValue}
              onChange={({ target: { value } }) => this.setState({ startDateValue: value })}
              margin="normal"
              variant="outlined"
            />
            <p>
              {isCurrentPlan && 'Dies ist Dein aktueller Trainingsplan. Wenn Du diesen Plan wählst, fängst Du diesen neu an.'}
              {!isCurrentPlan && `Wenn Du diesen Trainingsplan wählst, wird Dein aktueller Plan (${currentPlanName}) überschrieben.`}
            </p>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isSettingPlan}
              onClick={this.closeSetPlanDialog}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isSettingPlan}
              onClick={this.setPlan}
            >
              WÄHLEN
              {isSettingPlan && (
                <div style={{ height: 16, marginLeft: 15 }}>
                  <CircularProgress color="inherit" size={16} />
                </div>
              )}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

SingleTrainingPlan.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
