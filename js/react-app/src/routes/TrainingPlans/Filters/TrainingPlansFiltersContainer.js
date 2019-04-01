import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import TrainingPlansFilters from './TrainingPlansFilters';
import { getPlans, getAllTrainers, getGoals } from '../../../common/actions/training';

const mapStateToProps = ({
  training: {
    isFetchingTrainers,
    trainers,
    isFetchingGoals,
    goals,
  },
}) => ({
  isFetchingTrainers,
  trainers,
  isFetchingGoals,
  goals,
});

const mapDispatchToProps = dispatch => ({
  reloadPlans: (orderBy, trainer, level, goal) => dispatch(
    getPlans(
      {
        page: 1, orderBy, trainer, level, goal,
      },
    ),
  ),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount([getAllTrainers, getGoals])(TrainingPlansFilters));
