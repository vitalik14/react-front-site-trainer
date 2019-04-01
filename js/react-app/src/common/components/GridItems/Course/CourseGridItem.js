import React from 'react';
import { PropTypes } from 'prop-types';
import VideoIcon from '@material-ui/icons/Videocam';

import styles from './CourseGridItem.scss';

const CourseGridItem = ({
  baseDomain,
  name,
  description,
  slug,
  thumbnailUrl,
  videosCount
}) => (
  <div className={styles.cont}>
    <a href={`${baseDomain}/kurse/kurse/${slug}`} className={styles.link}>
      <div
        className={styles.thumbnail}
        style={{
          backgroundImage: thumbnailUrl
            ? `url(${thumbnailUrl})`
            : `url(${baseDomain}/assets/images/default/course.jpg`
        }}
      />
    </a>
    <div className={styles.infoCont}>
      <div>
        <a href={`${baseDomain}/kurse/kurse/${slug}`} className={styles.link}>
          <h2 className={styles.title}>{name}</h2>
        </a>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.infoBottomCont}>
        <div className={styles.infoBottomInnerCont} />
        <div className={styles.infoBottomInnerCont}>
          <div className={styles.videoIconCont}>
            <VideoIcon color="inherit" fontSize="inherit" />
          </div>
          <p>{videosCount}</p>
        </div>
      </div>
    </div>
  </div>
);

CourseGridItem.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  videosCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired
};

export default CourseGridItem;
