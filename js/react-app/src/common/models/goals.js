import { PropTypes } from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
);
