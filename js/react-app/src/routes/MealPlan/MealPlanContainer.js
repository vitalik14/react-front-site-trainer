import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import MealPlan from './MealPlan';
import meal from '../../common/models/meal';
import { getGroceryList, getGroceryListPDF } from '../../common/actions/meals';
import { toDateString } from '../../common/helpers';

class MealPlanContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: localStorage.purlifeMealPlanStartDate
        ? moment(JSON.parse(localStorage.purlifeMealPlanStartDate))
        : moment().startOf('isoWeek'),
      endDate: localStorage.purlifeMealPlanEndDate
        ? moment(JSON.parse(localStorage.purlifeMealPlanEndDate))
        : moment().endOf('isoWeek'),
      isStartDatePickerFocused: false,
      isEndDatePickerFocused: false,
      isGroceryListModalShown: false,
      wasFileGenerated: false,
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleStartDatePickerFocus = this.handleStartDatePickerFocus.bind(this);
    this.handleEndDatePickerFocus = this.handleEndDatePickerFocus.bind(this);
    this.handleGroceryListModalOpen = this.handleGroceryListModalOpen.bind(this);
    this.handleGroceryListModalClose = this.handleGroceryListModalClose.bind(this);
    this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);
    this.isWithinSelectedDates = this.isWithinSelectedDates.bind(this);
  }

  handleStartDateChange(startDate) {
    this.setState(({ startDate, wasFileGenerated: false }));
    localStorage.setItem('purlifeMealPlanStartDate', JSON.stringify(startDate));
  }

  handleEndDateChange(endDate) {
    this.setState(({ endDate, wasFileGenerated: false }));
    localStorage.setItem('purlifeMealPlanEndDate', JSON.stringify(endDate));
  }

  handleStartDatePickerFocus(isStartDatePickerFocused) {
    this.setState({
      isStartDatePickerFocused,
      isEndDatePickerFocused: false,
    });
  }

  handleEndDatePickerFocus(isEndDatePickerFocused) {
    this.setState({
      isStartDatePickerFocused: false,
      isEndDatePickerFocused,
    });
  }

  handleGroceryListModalOpen() {
    const {
      props: { loadGroceryList },
      state: { startDate, endDate },
    } = this;
    this.setState({
      isGroceryListModalShown: true,
    });
    loadGroceryList(
      toDateString(startDate.toDate()),
      toDateString(endDate.toDate()),
    );
  }

  handleGroceryListModalClose() {
    this.setState({
      isGroceryListModalShown: false,
    });
  }

  handleDownloadButtonClick() {
    const {
      state: { startDate, endDate, wasFileGenerated },
      props: { loadGroceryListPDF },
    } = this;
    if (!wasFileGenerated) {
      loadGroceryListPDF(
        toDateString(startDate.toDate()),
        toDateString(endDate.toDate()),
      );
      this.setState({ wasFileGenerated: true });
    }
  }

  isWithinSelectedDates(date) {
    const { state: { startDate, endDate } } = this;
    return date >= moment(startDate).subtract(1, 'd') && date <= endDate;
  }

  render() {
    const {
      state: {
        startDate,
        endDate,
        isStartDatePickerFocused,
        isEndDatePickerFocused,
        isGroceryListModalShown,
        wasFileGenerated,
      },
      props: {
        baseDomain,
        plan,
        loadGroceryList,
        groceryListItems,
        isFetchingGroceryList,
        groceryListDownloadURL,
        isFetchingGroceryListPDF,
      },
    } = this;

    const planDates = Object.keys(plan).map(dateStr => new Date(dateStr));
    const plans = Object.values(plan);
    const disabledUntil = planDates[0];
    const disabledFrom = planDates[planDates.length - 1];

    return (
      <MealPlan
        baseDomain={baseDomain}
        startDate={startDate}
        endDate={endDate}
        disabledUntil={disabledUntil}
        disabledFrom={disabledFrom}
        onStartDateChange={this.handleStartDateChange}
        onEndDateChange={this.handleEndDateChange}
        onStartDatePickerFocus={this.handleStartDatePickerFocus}
        onEndDatePickerFocus={this.handleEndDatePickerFocus}
        isStartDatePickerFocused={isStartDatePickerFocused}
        isEndDatePickerFocused={isEndDatePickerFocused}
        isWithinSelectedDates={this.isWithinSelectedDates}
        isGroceryListModalShown={isGroceryListModalShown}
        onGroceryListModalOpen={this.handleGroceryListModalOpen}
        onGroceryListModalClose={this.handleGroceryListModalClose}
        planDates={planDates}
        plans={plans}
        loadGroceryList={loadGroceryList}
        groceryListItems={groceryListItems}
        isFetchingGroceryList={isFetchingGroceryList}
        groceryListDownloadURL={groceryListDownloadURL}
        isFetchingGroceryListPDF={isFetchingGroceryListPDF}
        onDownloadButtonClick={this.handleDownloadButtonClick}
        wasFileGenerated={wasFileGenerated}
      />
    );
  }
}

MealPlanContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  plan: PropTypes.objectOf(
    PropTypes.arrayOf(meal),
  ).isRequired,
  loadGroceryList: PropTypes.func.isRequired,
  groceryListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      food: PropTypes.string,
      amount: PropTypes.number,
      unit: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  isFetchingGroceryList: PropTypes.bool.isRequired,
  groceryListDownloadURL: PropTypes.string.isRequired,
  isFetchingGroceryListPDF: PropTypes.bool.isRequired,
  loadGroceryListPDF: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  meals: {
    plan,
    groceryListItems,
    isFetchingGroceryList,
    isFetchingGroceryListPDF,
    groceryListDownloadURL,
  },
}) => ({
  plan,
  groceryListItems,
  isFetchingGroceryList,
  isFetchingGroceryListPDF,
  groceryListDownloadURL,
});

const mapDispatchToProps = dispatch => ({
  loadGroceryList: (from, to) => dispatch(getGroceryList(from, to)),
  loadGroceryListPDF: (from, to) => dispatch(getGroceryListPDF(from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealPlanContainer);
