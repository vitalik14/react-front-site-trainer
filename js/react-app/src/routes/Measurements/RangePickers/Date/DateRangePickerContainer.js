import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import DateRangePicker from './DateRangePicker';

export default class DateRangePickerContainer extends Component {
  constructor(props) {
    super(props);

    const { innerWidth: screenWidth } = window;

    this.state = {
      unsavedStartDate: null,
      unsavedEndDate: null,
      focusedInput: null,
      isMobile: screenWidth < 768,
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.cancel = this.cancel.bind(this);

    window.addEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize({ currentTarget: { innerWidth: screenWidth } }) {
    this.setState({
      isMobile: screenWidth < 768,
    });
  }

  handleDatesChange({ startDate, endDate }) {
    this.setState({
      unsavedStartDate: startDate,
      unsavedEndDate: endDate,
    });
  }

  handleFocusChange(focusedInput) {
    if (focusedInput) {
      this.setState({ focusedInput });
    }
  }

  applyChanges() {
    const {
      state: { unsavedStartDate: from, unsavedEndDate: to },
      props: { onDateRangeChange },
    } = this;
    this.setState({
      unsavedStartDate: null,
      unsavedEndDate: null,
      focusedInput: null,
    });
    onDateRangeChange(from, to);
  }

  cancel() {
    this.setState({
      focusedInput: null,
      unsavedStartDate: null,
      unsavedEndDate: null,
    });
  }

  render() {
    const {
      state: {
        focusedInput,
        unsavedStartDate,
        unsavedEndDate,
        isMobile,
      },
      props: {
        startDate,
        endDate,
      },
    } = this;
    return (
      <DateRangePicker
        startDate={unsavedStartDate || startDate}
        endDate={unsavedEndDate || endDate}
        focusedInput={focusedInput}
        onDatesChange={this.handleDatesChange}
        onFocusChange={this.handleFocusChange}
        applyChanges={this.applyChanges}
        cancel={this.cancel}
        isMobile={isMobile}
      />
    );
  }
}

DateRangePickerContainer.propTypes = {
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};
