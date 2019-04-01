import React from 'react';
import PropTypes from 'prop-types';
import VideoCamIcon from '@material-ui/icons/Videocam';
import CountUp from 'react-countup/build';

import styles from './TrainerGridItem.scss';

const TrainerGridItem = ({
  baseDomain,
  userId,
  name,
  profilePicUrl,
  trainerId,
  videosCount,
}) => (
  <div className={styles.wrapper}>
    <a href={`${baseDomain}/fitbook/profile/${userId}`} className={styles.avatarLink}>
      <img src={profilePicUrl} alt={`Avatar von ${name}`} className={styles.avatar} />
    </a>
    <div className={styles.infoWrapper}>
      <a href={`${baseDomain}/fitbook/profile/${userId}`} className={styles.trainerName}>{name}</a>
      <div className={styles.videosCountWrapper}>
        <div className={styles.videoIconWrapper}>
          <VideoCamIcon color="inherit" fontSize="inherit" />
        </div>
        <a href={`${baseDomain}/videos?trainer=${trainerId}`} className={styles.videosCount}>
          <CountUp end={videosCount} />
        </a>
      </div>
    </div>
  </div>
);

TrainerGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  trainerId: PropTypes.number.isRequired,
  videosCount: PropTypes.number.isRequired,
};

export default TrainerGridItem;
