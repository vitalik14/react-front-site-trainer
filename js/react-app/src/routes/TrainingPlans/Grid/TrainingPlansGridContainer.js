import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import TrainingPlansGrid from './TrainingPlansGrid';
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
  { baseDomain },
) => ({
  baseDomain,
  isFetchingPlans,
  hasFetchedPlans,
  plans,
  plansCount,
  plansCurrentPage,
  plansPerPage,
  canPaginatePlans,
});

const mapDispatchToProps = dispatch => ({
  loadMorePlans: (page, shouldReplace) => dispatch(
    getPlans({ page }, shouldReplace),
  ),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(getPlans)(TrainingPlansGrid));
