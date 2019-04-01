import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import MealCategorySearch from './MealCategorySearch';

export default class MealCategorySearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ value });
  }

  handleKeyUp({ key, target: { value } }) {
    if (key === 'Enter' && value) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { state: { value }, props: { baseDomain } } = this;
    window.location.href = `${baseDomain}/meals/search?q=${value}`;
  }

  render() {
    const { state: { value } } = this;
    return (
      <MealCategorySearch
        value={value}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

MealCategorySearchContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};
