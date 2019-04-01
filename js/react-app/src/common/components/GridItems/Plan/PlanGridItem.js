import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PersonIcon from '@material-ui/icons/Person';
import { PrimaryButton } from '../../../customizedMaterialComponents';
import Loader from '../../Loaders/Button/ButtonLoader';
import styles from './PlanGridItem.scss';
import { pinTrainingPlan, unpinTrainingPlan } from '../../../services/training';
import handleError from '../../../errorHandler';

export default class PlanGridItem extends Component {
  state = {
    isUpdatingPinState: false,
    isPinned: null
  };

  pin = () => {
    this.setState({ isUpdatingPinState: true });

    const {
      props: { id }
    } = this;

    pinTrainingPlan(id)
      .then(() => this.setState({ isUpdatingPinState: false, isPinned: true }))
      .catch(handleError);
  };

  unpin = () => {
    this.setState({ isUpdatingPinState: true });

    const {
      props: { id }
    } = this;

    unpinTrainingPlan(id)
      .then(() => this.setState({ isUpdatingPinState: false, isPinned: false }))
      .catch(handleError);
  };

  render() {
    const {
      state: { isUpdatingPinState, isPinned: isPinnedStateValue },
      props: {
        openDialog,
        baseDomain,
        id,
        thumbnailUrl,
        name,
        description,
        duration,
        inProgress,
        isPinned: isPinnedServerValue,
        marker,
        trainers,
        appPromotion,
        shouldShowLink
      }
    } = this;

    const isPinned =
      isPinnedStateValue === null ? isPinnedServerValue : isPinnedStateValue;

    return (
      <div className={styles.cont}>
        <a href={`${baseDomain}/kurse/trainingplans/${id}`}>
          {marker === 'new-ribbon' && (
            <div className={styles.ribbonContainer}>
              <div className={styles.ribbon}>Neu</div>
            </div>
          )}
          <div
            className={styles.thumbnail}
            style={{
              backgroundImage: thumbnailUrl
                ? `url(${thumbnailUrl})`
                : `url(${baseDomain}/assets/images/default/plan.jpg`
            }}
          />
        </a>
        <div className={styles.innerCont}>
          <div>
            <a
              href={`${baseDomain}/kurse/trainingplans/${id}`}
              className={styles.title}
            >
              {name}
              {marker === 'new' && <div className={styles.labelInfo}>Neu</div>}
              {marker === 'prev' && (
                <div className={styles.labelInfo}>§20 zertifiziert</div>
              )}
            </a>
            <ul className={styles.userList}>
              {trainers ? (
                trainers.map(el => {
                  return (
                    <li key={el.user.id}>
                      <PersonIcon color="inherit" fontSize="inherit" />
                      <span>{el.user.name}</span>
                    </li>
                  );
                })
              ) : (
               null
              )}
            </ul>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {appPromotion && (
              <a href={`${baseDomain}/apps`} className={styles.btnLegitRipple}>
                {' '}
                Als App
              </a>
            )}
          </div>
          {inProgress && (
            <div className={styles.inProgress}>
              Dieses Programm läuft noch. <br />
              Du kannst diesen Trainingsplan wählen, sobald das Programm
              abgeschlossen ist.
            </div>
          )}
          <div className={styles.bottomCont}>
            <div style={{ justifyContent: 'space-between' }}>
              <div className={styles.metadataLeftInnerWrapper}>
                {!isPinned && (
                  <Tooltip title="Füge es meinen fixierten Trainingsplänen hinzu">
                    <div
                      className={styles.metadataIconWrapper}
                      style={{ marginRight: -10 }}
                    >
                      <IconButton
                        color="inherit"
                        style={{
                          width: 24,
                          height: 24,
                          padding: 0,
                          fontSize: 'inherit'
                        }}
                        onClick={this.pin}
                      >
                        <BookmarkBorderIcon
                          color="inherit"
                          fontSize="inherit"
                        />
                      </IconButton>
                    </div>
                  </Tooltip>
                )}
                {isPinned && (
                  <Tooltip title="Entferne es aus meinen fixierten Trainingsplänen">
                    <div
                      className={styles.metadataIconWrapper}
                      style={{ marginRight: -10 }}
                    >
                      <IconButton
                        color="inherit"
                        style={{
                          width: 24,
                          height: 24,
                          padding: 0,
                          fontSize: 'inherit'
                        }}
                        onClick={this.unpin}
                      >
                        <BookmarkIcon color="inherit" fontSize="inherit" />
                      </IconButton>
                    </div>
                  </Tooltip>
                )}
                {isUpdatingPinState && <Loader color="#9E9E9E" />}
              </div>

              <div className={styles.timeAgoCont}>
                <div className={styles.calendarIconCont}>
                  <CalendarTodayIcon color="inherit" fontSize="inherit" />
                </div>
                <span className={styles.timeAgo}>
                  {duration}
                  &nbsp;
                  {duration === 1 ? 'Tage' : 'Tag'}
                </span>
              </div>
            </div>
            <div className={styles.metadataWrapper}>
              <div className={styles.metadataRightInnerWrapper}>
                {shouldShowLink && (
                  <PrimaryButton id={id} onClick={openDialog}>
                    PLAN WAHLEN
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PlanGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  inProgress: PropTypes.bool.isRequired,
  isPublic: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  isCustom: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  isPinned: PropTypes.bool.isRequired,
  marker: PropTypes.string,
  trainers: PropTypes.arrayOf(PropTypes.object),
  appPromotion: PropTypes.bool.isRequired,
  shouldShowLink: PropTypes.bool
};

PlanGridItem.defaultProps = {
  shouldShowLink: true
};
