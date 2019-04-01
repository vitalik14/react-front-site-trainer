import { PropTypes } from 'prop-types';

import video from './video';
import meal from './meal';
import post from './post';

export default PropTypes.shape({
  fav: PropTypes.shape({
    id: PropTypes.number,
    data: PropTypes.shape({
      note: PropTypes.string,
      difficulty: PropTypes.number,
    }),
  }),
  entity: PropTypes.oneOfType([video, meal, post]),
});
