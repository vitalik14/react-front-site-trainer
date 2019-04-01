import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getMealCategories } from '../../../common/actions/meals';
import Grid from './MealCategoryGrid';

const mapStateToProps = (
  { meals: { isFetchingCategories, categories } },
  { baseDomain },
) => ({
  baseDomain, isFetchingCategories, categories,
});

export default connect(mapStateToProps)(onComponentDidMount(getMealCategories)(Grid));
