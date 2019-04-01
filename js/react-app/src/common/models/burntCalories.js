import { PropTypes } from 'prop-types';

const burntCaloriesDataModel = {
  value: PropTypes.string,
  max: PropTypes.string,
  remaining: PropTypes.string,
  percent: PropTypes.string,
};

export default PropTypes.shape({
  today: PropTypes.shape(burntCaloriesDataModel),
  week: PropTypes.shape(burntCaloriesDataModel),
  month: PropTypes.shape(burntCaloriesDataModel),
});
