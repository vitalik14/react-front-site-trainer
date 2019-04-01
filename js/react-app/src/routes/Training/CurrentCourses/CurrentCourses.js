import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import sharedStyles from '../Training.scss';
import componentStyles from './CurrentCourses.scss';
import ScheduleGridItem from '../../../common/components/GridItems/Schedule/ScheduleGridItem';
import schedule from '../../../common/models/schedule';
import { getVimeoVideoURL } from '../../../common/helpers';

const CurrentCourses = ({
  baseDomain,
  isFetching,
  data,
}) => (
  <div>
    <h3 className={sharedStyles.blockTitle}>Liveplan</h3>
    {isFetching && (
      <div className={sharedStyles.loaderCont}>
        <CircularProgress />
      </div>
    )}
    {!isFetching && (
      <div className={componentStyles.gridCont}>
        <div className={componentStyles.gridItem}>
          <ScheduleGridItem
            baseDomain={baseDomain}
            roomNumber={1}
            liveSrc={data.room1.live ? data.room1.live['360p'] : null}
            videoId={data.room1.video ? data.room1.video.id : null}
            vimeoVideoURL={data.room1.video ? getVimeoVideoURL(data.room1.video.files) : null}
            startTime={data.room1.startTime}
            difficultyLevel={
              data.room1.level
              || (data.room1.video && data.room1.video.level)
              || null
            }
            trainerName={data.room1.trainerName}
            trainerImgURL={data.room1.profilePicUrl}
            duration={data.room1.duration}
          />
        </div>
        <div className={componentStyles.gridItem}>
          <ScheduleGridItem
            baseDomain={baseDomain}
            roomNumber={2}
            liveSrc={data.room2.live ? data.room2.live['360p'] : null}
            videoId={data.room2.video ? data.room2.video.id : null}
            vimeoVideoURL={data.room2.video ? getVimeoVideoURL(data.room2.video.files) : null}
            startTime={data.room2.startTime}
            difficultyLevel={
              data.room2.level
              || (data.room2.video && data.room2.video.level)
              || null
            }
            trainerName={data.room2.trainerName}
            trainerImgURL={data.room2.profilePicUrl}
            duration={data.room2.duration}
          />
        </div>
      </div>
    )}
  </div>
);

CurrentCourses.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    room1: schedule,
    room2: schedule,
  }).isRequired,
};

export default CurrentCourses;
