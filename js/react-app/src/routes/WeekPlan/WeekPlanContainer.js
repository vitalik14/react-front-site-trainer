import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import WeekPlan from './WeekPlan';

export default class WeekPlanContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWeeks: [0, 1, 2, 3, 4, 5, 6],
    };

    this.handleWeekFiltersApply = this.handleWeekFiltersApply.bind(this);
  }

  handleWeekFiltersApply(selectedWeeks) {
    this.setState({ selectedWeeks });
  }

  render() {
    const { state: { selectedWeeks }, props: { baseDomain } } = this;
    return (
      <WeekPlan
        baseDomain={baseDomain}
        selectedWeeks={selectedWeeks}
        onFiltersApply={this.handleWeekFiltersApply}
      />
    );
  }
}

WeekPlanContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
