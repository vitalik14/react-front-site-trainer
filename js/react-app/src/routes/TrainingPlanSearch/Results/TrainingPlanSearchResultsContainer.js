import { connect } from 'react-redux';

import TrainingPlanSearchResults from './TrainingPlanSearchResults';
import { getPlans } from '../../../common/actions/training';

const mapStateToProps = (
  {
    training: {
      isFetchingPlans,
      hasFetchedPlans,
      plans,
      plansCount,
      plansCurrentPage,
      plansPerPage,
      canPaginatePlans,
    },
  },
  { baseDomain, selectedGoal, isPreferencesFilterOn },
) => ({
  isFetchingPlans,
  hasFetchedPlans,
  plans,
  plansCount,
  plansCurrentPage,
  plansPerPage,
  canPaginatePlans,
  baseDomain,
  selectedGoal,
  isPreferencesFilterOn,
});

const mapDispatchToProps = dispatch => ({
  loadMorePlans: (page, goal, filterByPreferences) => dispatch(
    getPlans({ page, goal, user_specific: +filterByPreferences }, false),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingPlanSearchResults);
