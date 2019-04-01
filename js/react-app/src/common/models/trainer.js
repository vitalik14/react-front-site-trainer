import { PropTypes } from 'prop-types';

import user from './user';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([user, PropTypes.bool]),
});
