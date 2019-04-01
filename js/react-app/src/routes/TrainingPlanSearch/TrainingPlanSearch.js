import React from 'react';
import { PropTypes } from 'prop-types';

import TrainingPlanSearchFormContainer from './Form/TrainingPlanSearchFormContainer';
import TrainingPlanSearchResultsContainer from './Results/TrainingPlanSearchResultsContainer';
import styles from './TrainingPlanSearch.scss';

const TrainingPlanSearch = ({
  baseDomain,
  selectedGoal,
  isPreferencesFilterOn,
  onGoalSelect,
  onPreferencesFilterToggle,
}) => (
  <div>
    <h1 className={styles.title}>
      Trainingsplan finden
    </h1>
    <TrainingPlanSearchFormContainer
      baseDomain={baseDomain}
      selectedGoal={selectedGoal}
      isPreferencesFilterOn={isPreferencesFilterOn}
      onGoalSelect={onGoalSelect}
      onPreferencesFilterToggle={onPreferencesFilterToggle}
    />
    <TrainingPlanSearchResultsContainer
      baseDomain={baseDomain}
      selectedGoal={selectedGoal}
      isPreferencesFilterOn={isPreferencesFilterOn}
    />
  </div>
);

TrainingPlanSearch.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  selectedGoal: PropTypes.number.isRequired,
  isPreferencesFilterOn: PropTypes.bool.isRequired,
  onGoalSelect: PropTypes.func.isRequired,
  onPreferencesFilterToggle: PropTypes.func.isRequired,
};

export default TrainingPlanSearch;
