import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import { StyledButton } from '../customizedMaterialComponents';
import styles from './ThisDayTrainingPlan.scss';
import videoModel from '../../../common/models/video';
import { formatDateLong } from '../../../common/helpers';
import VideoGridItem from '../../../common/components/GridItems/Video/VideoGridItem';
import { PrimaryButton, TextBlueButton } from '../../../common/customizedMaterialComponents';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';
import { stopTrainingPlan } from '../../../common/services/training';
import handleError from '../../../common/errorHandler';

export default class ThisDayTrainingPlan extends Component {
  state = { isStopConfirmModalOpen: false, isStopping: false, localEnabled: null };

  stopPlan = () => {
    this.setState({ isStopping: true });
    stopTrainingPlan()
      .then(() => this.setState({
        isStopConfirmModalOpen: false,
        isStopping: false,
        localEnabled: false,
      }))
      .catch(handleError);
  };

  render() {
    const {
      state: { isStopConfirmModalOpen, isStopping, localEnabled },
      props: {
        baseDomain,
        trainingPlan: {
          enabled,
          inFuture,
          changeAllowed,
          startDate,
          today: videos,
        },
      },
    } = this;

    const isEnabled = localEnabled === null
      ? enabled
      : localEnabled;

    if (!isEnabled) {
      return (
        <>
          <div className={styles.topCont}>
            <h2 className={styles.heading}>Dein heutiges training plan</h2>
          </div>
          <p>Ihr Trainingsplan ist nicht aktiviert</p>
        </>
      );
    }

    if (inFuture) {
      return (
        <>
          <div className={styles.topCont}>
            <h2 className={styles.heading}>Dein heutiges training plan</h2>
          </div>
          <p>
            Ihr Trainingsplan beginnt am&ngsp;
            {formatDateLong(new Date(startDate))}
          </p>
        </>
      );
    }

    return (
      <>
        <div className={styles.topCont}>
          <h2 className={styles.heading}>Dein heutiges training plan</h2>
          <div className={styles.buttonsCont}>
            {changeAllowed && (
              <>
                <StyledButton color="secondary">BEARBEITEN</StyledButton>
                <StyledButton
                  color="secondary"
                  onClick={() => this.setState({ isStopConfirmModalOpen: true })}
                >
                  BEENDEN
                </StyledButton>
              </>
            )}
            <StyledButton color="primary" href={`${baseDomain}/kurse/wochenplan`}>WOCHENPLAN</StyledButton>
          </div>
        </div>
        <div className={styles.plansCont}>
          {
            videos.map(({
              id,
              trainer: {
                name: coachName,
                user: {
                  id: coachId,
                  profilePicUrl: coachAvatarUrl,
                },
              },
              course: {
                name: courseName,
                banners: { default: thumbnailUrl },
              },
              level,
              course: { tools },
              kcal,
              duration,
              user: {
                playAmount,
                playedInPercent,
              },
              meta: {
                isFavorite,
                favorite: {
                  id: favId = null,
                  data: {
                    note: favNote = null,
                    difficulty: favDifficulty = null,
                  } = {},
                } = {},
              },
            }) => (
              <div key={id} className={styles.videoGridItemWrapper}>
                <VideoGridItem
                  baseDomain={baseDomain}
                  id={id}
                  thumbnailURL={thumbnailUrl}
                  coachId={coachId}
                  coachName={coachName}
                  coachAvatarUrl={coachAvatarUrl}
                  level={level}
                  courseName={courseName}
                  tools={tools}
                  kcal={kcal}
                  duration={duration}
                  isFav={isFavorite}
                  favId={favId}
                  favNote={favNote}
                  favDifficulty={favDifficulty}
                  playsAmount={playAmount}
                  lastPlayedPercentage={playedInPercent}
                />
              </div>
            ))
          }
        </div>
        <Dialog
          fullScreen={window.innerWidth < 768}
          open={isStopConfirmModalOpen || isStopping}
          onClose={() => this.setState({ isStopConfirmModalOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Bist Du Dir sicher?</DialogTitle>
          <DialogContent>
            <DialogContentText>Willst Du den Plan wirklich beenden?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isStopping}
              onClick={() => this.setState({ isStopConfirmModalOpen: false })}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isStopping}
              onClick={this.stopPlan}
            >
              LÖSCHEN
              {isStopping && <ButtonLoader color="white" />}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

ThisDayTrainingPlan.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  trainingPlan: PropTypes.shape({
    enabled: PropTypes.bool,
    inFuture: PropTypes.bool,
    changeAllowed: PropTypes.bool,
    startDate: PropTypes.string,
    today: PropTypes.arrayOf(videoModel),
  }),
};

ThisDayTrainingPlan.defaultProps = {
  trainingPlan: null,
};
