import React from 'react';
import { PropTypes } from 'prop-types';
import FlowPlayer from 'react-flow-player';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import styles from './ScheduleGridItem.scss';

const difficultyColors = ['#7ED321', '#F8CF1C', '#D0021B'];

const renderVideoPlayer = (videoId, vimeoVideoURL, liveSrc) => {
  if (!videoId) {
    return (
      <div className={styles.noVideoCont}>
        <p className={styles.noVideoText}>Kein Video ¯\_(ツ)_/¯</p>
      </div>
    );
  }

  if (liveSrc) {
    return (
      <div className={styles.videoCont}>
        <FlowPlayer
          playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
          playerId="flowPlayer"
          sources={[
            {
              type: 'video/webm',
              src: liveSrc,
            },
          ]}
        />
      </div>
    );
  }

  return (
    <div className={styles.videoCont}>
      <iframe
        title="Vimeo"
        // src={vimeoVideoURL}
        src="https://player.vimeo.com/video/304255172"
        width="100%"
        height={299}
        frameBorder="0"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
      />
    </div>
  );
};

const ScheduleGridItem = ({
  baseDomain,
  liveSrc,
  videoId,
  vimeoVideoURL,
  startTime,
  roomNumber,
  trainerName,
  trainerImgURL,
  duration,
  difficultyLevel,
}) => (
  <a href={videoId ? `${baseDomain}/videos/watch/${videoId}` : null} className={styles.cont}>
    {renderVideoPlayer(videoId, vimeoVideoURL, liveSrc)}
    <div className={styles.bottomCont}>
      <div className={styles.bottomInnerCont}>
        <p className={styles.title}>
          In Raum&nbsp;
          {roomNumber}
          &nbsp;seit&nbsp;
          {startTime}
          &nbsp;Uhr
        </p>
        {difficultyLevel && (
          <div style={{ color: difficultyColors[difficultyLevel - 1], fontSize: 20 }}>
            <FitnessCenterIcon color="inherit" fontSize="inherit" />
          </div>
        )}
      </div>
      <div className={styles.bottomInnerCont}>
        <div className={styles.trainerCont}>
          <img src={trainerImgURL} alt="Trainer avatar" className={styles.trainerImg} />
          <p className={styles.trainerName}>{trainerName}</p>
        </div>
        <div className={styles.durationCont}>
          <div className={styles.durationIconCont}>
            <AccessTimeIcon color="inherit" fontSize="inherit" />
          </div>
          <span className={styles.duration}>
            {duration}
            &nbsp;min
          </span>
        </div>
      </div>
    </div>
  </a>
);

ScheduleGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  liveSrc: PropTypes.string,
  videoId: PropTypes.number,
  vimeoVideoURL: PropTypes.string,
  startTime: PropTypes.string.isRequired,
  roomNumber: PropTypes.number.isRequired,
  trainerName: PropTypes.string.isRequired,
  trainerImgURL: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.number,
};

ScheduleGridItem.defaultProps = {
  liveSrc: null,
  videoId: null,
  vimeoVideoURL: null,
  difficultyLevel: null,
};

export default ScheduleGridItem;
