import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import TrainingPlanSearch from './TrainingPlanSearch';

export default class TrainingPlanSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGoal: 1,
      isPreferencesFilterOn: false,
    };

    this.handleGoalSelect = this.handleGoalSelect.bind(this);
    this.handlePreferencesFilterToggle = this.handlePreferencesFilterToggle.bind(this);
  }

  handleGoalSelect(selectedGoal) {
    this.setState({ selectedGoal });
  }

  handlePreferencesFilterToggle() {
    this.setState(({ isPreferencesFilterOn }) => ({
      isPreferencesFilterOn: !isPreferencesFilterOn,
    }));
  }

  render() {
    const {
      state: { selectedGoal, isPreferencesFilterOn },
      props: { baseDomain },
    } = this;
    return (
      <TrainingPlanSearch
        baseDomain={baseDomain}
        selectedGoal={selectedGoal}
        isPreferencesFilterOn={isPreferencesFilterOn}
        onGoalSelect={this.handleGoalSelect}
        onPreferencesFilterToggle={this.handlePreferencesFilterToggle}
      />
    );
  }
}

TrainingPlanSearchContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
