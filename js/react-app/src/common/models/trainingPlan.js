import { PropTypes } from 'prop-types';

import goals from './goals';
import banners from './banners';
import video from './video';

export default PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  goals,
  age: PropTypes.arrayOf(PropTypes.string),
  genger: PropTypes.number,
  duration: PropTypes.number,
  banners,
  description: PropTypes.string,
  metadata: PropTypes.shape({
    inProgress: PropTypes.bool,
    isPublic: PropTypes.number,
    isCustom: PropTypes.number,
    isPinned: PropTypes.bool,
    marker: PropTypes.string,
    appPromotion: PropTypes.bool,
    whenFinished: PropTypes.string,
  }),
  video,
  videoType: PropTypes.string,
});
