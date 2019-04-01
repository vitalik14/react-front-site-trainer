import { PropTypes } from 'prop-types';

import trainer from './trainer';
import video from './video';
import { fullCourse as course } from './course';

export default PropTypes.shape({
  id: PropTypes.number,
  startTime: PropTypes.string,
  duration: PropTypes.number,
  live: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      type: PropTypes.string,
      urls: PropTypes.shape({
        auto: PropTypes.string,
        '360p': PropTypes.string,
        '720p': PropTypes.string,
      }),
      vimeoId: PropTypes.number,
    }),
  ]),
  videoId: PropTypes.number,
  level: PropTypes.number,
  trainer,
  video,
  course,
});
