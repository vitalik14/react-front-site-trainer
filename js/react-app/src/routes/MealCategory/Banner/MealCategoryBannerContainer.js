import { connect } from 'react-redux';

import Banner from './MealCategoryBanner';

const mapStateToProps = ({
  meals: { isFetchingCategoryInfo, categoryInfo },
}) => ({ isFetchingCategoryInfo, categoryInfo });

export default connect(mapStateToProps)(Banner);
