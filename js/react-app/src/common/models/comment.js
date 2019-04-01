import { PropTypes } from 'prop-types';

import user from './user';

export default PropTypes.shape({
  id: PropTypes.number,
  createDate: PropTypes.string,
  updateDate: PropTypes.string,
  content: PropTypes.string,
  contentElement: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isAuthor: PropTypes.bool,
  user,
});
