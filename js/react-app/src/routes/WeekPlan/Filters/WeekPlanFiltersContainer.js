import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filters from './WeekPlanFilters';

export default class WeekPlanFiltersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [
        { id: 0, label: 'Montag', checked: true },
        { id: 1, label: 'Dienstag', checked: true },
        { id: 2, label: 'Mittwoch', checked: true },
        { id: 3, label: 'Donnerstag', checked: true },
        { id: 4, label: 'Freitag', checked: true },
        { id: 5, label: 'Samstag', checked: true },
        { id: 6, label: 'Sonntag', checked: true },
      ],
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleToggle(filterId) {
    this.setState(({ filters }) => ({
      filters: filters.map(({ id, label, checked }) => ({
        id,
        label,
        checked: id === filterId ? !checked : checked,
      })),
    }));
  }

  handleApply() {
    const { state: { filters }, props: { onApply } } = this;
    const selectedWeeks = filters.filter(({ checked }) => !!checked).map(({ id }) => id);
    onApply(selectedWeeks);
  }

  handleClear() {
    this.setState(({ filters }) => ({
      filters: filters.map(({ id, label }) => ({
        id,
        label,
        checked: true,
      })),
    }));
    const { props: { onApply } } = this;
    onApply([0, 1, 3, 4, 5, 6, 7]);
  }

  render() {
    const { state: { filters } } = this;
    return (
      <Filters
        filters={filters}
        onToggle={this.handleToggle}
        onApply={this.handleApply}
        onClear={this.handleClear}
      />
    );
  }
}

WeekPlanFiltersContainer.propTypes = {
  onApply: PropTypes.func.isRequired,
};
