import { connect } from 'react-redux';

import SingleMeal from './SingleMeal';

const mapStateToProps = ({ meals: { isFetchingCurrentItem, currentItem } }) => ({
  isFetching: isFetchingCurrentItem,
  data: currentItem,
});

export default connect(mapStateToProps)(SingleMeal);
