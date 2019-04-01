import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import MeasurementsSwitchers from './MeasurementSwitchers';

export default class MeasurementSwitchersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverAnchorEl: null,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handlePopoverBtnClick = this.handlePopoverBtnClick.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  handleToggle(key) {
    const { props: { onToggleMeasure } } = this;
    onToggleMeasure(key);
  }

  handlePopoverBtnClick({ currentTarget }) {
    this.setState({
      popoverAnchorEl: currentTarget,
    });
  }

  handlePopoverClose() {
    this.setState({
      popoverAnchorEl: null,
    });
  }

  render() {
    const {
      state: { popoverAnchorEl },
      props: { visibleMeasurements },
    } = this;
    const isPopoverOpen = Boolean(popoverAnchorEl);

    return (
      <MeasurementsSwitchers
        visibleMeasurements={visibleMeasurements}
        isPopoverOpen={isPopoverOpen}
        popoverAnchorEl={popoverAnchorEl}
        onToggle={this.handleToggle}
        onPopoverBtnClick={this.handlePopoverBtnClick}
        onPopoverClose={this.handlePopoverClose}
      />
    );
  }
}

MeasurementSwitchersContainer.propTypes = {
  visibleMeasurements: PropTypes.objectOf(PropTypes.bool).isRequired,
  onToggleMeasure: PropTypes.func.isRequired,
};
