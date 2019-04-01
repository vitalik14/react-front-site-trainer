import { PropTypes } from 'prop-types';

export default {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  read: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};
