import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import schedule from '../../../models/schedule';
import styles from './ScheduleListItem.scss';

const difficultyColors = ['#7ED321', '#F8CF1C', '#D0021B'];

const InfoIconButton = withStyles({
  root: {
    width: 30,
    height: 30,
    fontSize: 20
  }
})(IconButton);

function checkTime(time, duration) {
  let currentTime = new Date();
  let fixDate = new Date();
  let courseStart = time.split(':');

  fixDate.setHours(courseStart[0], courseStart[1]);

  if ((currentTime.getTime() > fixDate.getTime()) && (currentTime.getTime() < fixDate.getTime() + (duration * 60 * 1000))) {
    return true;
  } else {
    return false;
  }
}

const renderSchedule = (
  baseDomain,
  {
    course: { name: courseTitle, slug: courseSlug, kcal },
    videoId,
    level,
    duration,
    trainer: {
      name: trainerName,
      user: { profilePicUrl: trainerImgURL }
    }
  },
  time
) => (
  <a 
    data-live={checkTime(time, duration)}
    href={videoId ? `${baseDomain}/videos/watch/${videoId}` : null}
    className={styles.innerWrap}
  >
    <div className={styles.mainInfoWrap}>
      <img
        src={trainerImgURL}
        alt="Trainer avatar"
        className={styles.trainerImg}
      />
      <div>
        <div className={styles.titleWrap}>
          <p className={styles.title}>{courseTitle}</p>
          <div className={styles.infoIconCont}>
            <InfoIconButton
              href={`${baseDomain}/kurse/${courseSlug}`}
              color="inherit"
            >
              <InfoIcon color="inherit" fontSize="inherit" />
            </InfoIconButton>
          </div>
          <div className={styles.badgeLive}>LIVE</div>
        </div>
        <p className={styles.trainerName}>{trainerName}</p>
      </div>
    </div>
    <div className={styles.extraInfoWrap}>
      <div
        style={{
          color: difficultyColors[level - 1] || '#CFD8DC',
          fontSize: 20
        }}
      >
        <FitnessCenterIcon color="inherit" fontSize="inherit" />
      </div>
      <div>
        {kcal >= 1 && (<div className={styles.extraInfoInnerWrap}>
          <div className={styles.iconCont}>
            <WhatshotIcon color="inherit" fontSize="inherit" />
          </div>
          <span>
            {Math.round(kcal * duration)}
            &nbsp;kcal
          </span>
        </div>)}
        <div className={styles.extraInfoInnerWrap}>
          <div className={styles.iconCont}>
            <AccessTimeIcon color="inherit" fontSize="inherit" />
          </div>
          <span>
            {duration}
            &nbsp;min
          </span>
        </div>
        <div className={styles.extraInfoInnerWrap}>
          <span className={styles.live}>Live</span>
        </div>
      </div>
    </div>
  </a>
);

const renderSchedulePlaceholder = () => (
  <div className={styles.innerWrap}>
    <p className={styles.placeholderText}>
      {/* Kein Zeitplan für Raum&nbsp;
      {roomNumber}
      &nbsp;für diese Zeit */}
    </p>
  </div>
);

const ScheduleListItem = ({ baseDomain, flexDirection, time, rooms }) => (
  <li className={styles.wrap}>
    <span data-id-time={time} className={styles.time}>{time}</span>
    <div className={styles.outerWrap} data-flex-direction={flexDirection}>
      {rooms[1]
        ? renderSchedule(baseDomain, rooms[1], time)
        : renderSchedulePlaceholder(1)}
      {rooms[2]
        ? renderSchedule(baseDomain, rooms[2], time)
        : renderSchedulePlaceholder(2)}
    </div>
  </li>
);

ScheduleListItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  flexDirection: PropTypes.string,
  time: PropTypes.string.isRequired,
  rooms: PropTypes.shape({
    1: schedule,
    2: schedule
  }).isRequired
};

ScheduleListItem.defaultProps = {
  flexDirection: 'row'
};

export default ScheduleListItem;
