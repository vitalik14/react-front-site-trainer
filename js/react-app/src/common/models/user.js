import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  gender: PropTypes.number,
  profilePicUrl: PropTypes.string,
  privilege: PropTypes.string,
  type: PropTypes.string,
  enabled: PropTypes.number,
});
