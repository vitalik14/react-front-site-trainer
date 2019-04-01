import { connect } from 'react-redux';

import { getMealCategoryItems } from '../../../common/actions/meals';
import SimilarMeals from './SimilarMeals';

const mapStateToProps = ({ meals: { isFetchingCategoryItems, categoryItems } }) => ({
  isFetching: isFetchingCategoryItems,
  items: categoryItems,
});

const mapDispatchToProps = (dispatch, { id }) => ({
  fetchItems: () => dispatch(getMealCategoryItems(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimilarMeals);
