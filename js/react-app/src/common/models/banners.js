import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  default: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  square: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  wide: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
});
