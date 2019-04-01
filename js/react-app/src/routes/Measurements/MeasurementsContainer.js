import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import Measurements from './Measurements';
import { getMeasurements, deleteMeasurement } from '../../common/actions/user';
import { toDateString } from '../../common/helpers';

class MeasurementsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
      quickRange: localStorage.purlifeMeasurementsQuickRange || 'week',
      startDate: localStorage.purlifeMeasurementsStartDate
        ? moment(JSON.parse(localStorage.purlifeMeasurementsStartDate))
        : moment().subtract(7, 'd'),
      endDate: localStorage.purlifeMeasurementsEndDate
        ? moment(JSON.parse(localStorage.purlifeMeasurementsEndDate))
        : moment(),
      isAddMeasurementModalShown: false,
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabSwipe = this.handleTabSwipe.bind(this);
    this.handleQuickRangeChange = this.handleQuickRangeChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.reloadMeasurements = this.reloadMeasurements.bind(this);
    this.closeMeasurementAddingModal = this.closeMeasurementAddingModal.bind(this);
    this.openMeasurementAddingModal = this.openMeasurementAddingModal.bind(this);
  }

  handleTabClick(event, value) {
    this.setState({ tabIdx: value });
  }

  handleTabSwipe(tabIdx) {
    this.setState({ tabIdx });
  }

  handleQuickRangeChange(quickRange) {
    this.setState({ quickRange });
    let startDate = null;
    const endDate = moment();
    switch (quickRange) {
      case 'week':
        startDate = moment().subtract(7, 'd');
        this.setState({ startDate, endDate });
        break;
      case 'month':
        startDate = moment().subtract(30, 'd');
        this.setState({ startDate, endDate });
        break;
      case 'year':
        startDate = moment().subtract(365, 'd');
        this.setState({ startDate, endDate });
        break;
      default:
        break;
    }
    this.reloadMeasurements(1, startDate, endDate);
    localStorage.setItem('purlifeQuickRange', quickRange);
    localStorage.setItem('purlifeStartDate', JSON.stringify(startDate));
    localStorage.setItem('purlifeEndDate', JSON.stringify(endDate));
  }

  handleDateRangeChange(startDate, endDate) {
    this.setState({ startDate, endDate });
    this.reloadMeasurements(1, startDate, endDate);
    localStorage.setItem('purlifeStartDate', JSON.stringify(startDate));
    localStorage.setItem('purlifeEndDate', JSON.stringify(endDate));
  }

  reloadMeasurements(page, from, to, shouldReplace) {
    const { props: { loadMeasurements } } = this;

    loadMeasurements(
      page,
      toDateString(from.toDate()),
      toDateString(to.toDate()),
      shouldReplace,
    );
  }

  openMeasurementAddingModal() {
    this.setState({ isAddMeasurementModalShown: true });
  }

  closeMeasurementAddingModal() {
    this.setState({ isAddMeasurementModalShown: false });
  }

  render() {
    const {
      state: {
        tabIdx,
        quickRange,
        isAddMeasurementModalShown,
        startDate,
        endDate,
      },
      props: {
        isFetchingMeasurements,
        measurements,
        measurementsCount,
        measurementsCurrentPage,
        measurementsPerPage,
        canPaginateMeasurements,
        measurementBeingRemovedId,
        removeMeasurement,
      },
    } = this;
    return (
      <Measurements
        tabIdx={tabIdx}
        onTabClick={this.handleTabClick}
        onTabSwipe={this.handleTabSwipe}
        isFetching={isFetchingMeasurements}
        measurements={measurements}
        measurementsCount={measurementsCount}
        measurementsCurrentPage={measurementsCurrentPage}
        measurementsPerPage={measurementsPerPage}
        canPaginateMeasurements={canPaginateMeasurements}
        measurementBeingRemovedId={measurementBeingRemovedId}
        deleteMeasurement={removeMeasurement}
        quickRange={quickRange}
        startDate={startDate}
        endDate={endDate}
        onQuickRangeChange={this.handleQuickRangeChange}
        onDateRangeChange={this.handleDateRangeChange}
        openMeasurementAddingModal={this.openMeasurementAddingModal}
        closeMeasurementAddingModal={this.closeMeasurementAddingModal}
        isAddMeasurementModalShown={isAddMeasurementModalShown}
        reloadMeasurements={this.reloadMeasurements}
      />
    );
  }
}

MeasurementsContainer.propTypes = {
  isFetchingMeasurements: PropTypes.bool.isRequired,
  measurements: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  measurementsCount: PropTypes.number.isRequired,
  measurementsCurrentPage: PropTypes.number.isRequired,
  measurementsPerPage: PropTypes.number.isRequired,
  measurementBeingRemovedId: PropTypes.number,
  canPaginateMeasurements: PropTypes.bool.isRequired,
  loadMeasurements: PropTypes.func.isRequired,
  removeMeasurement: PropTypes.func.isRequired,
};

MeasurementsContainer.defaultProps = {
  measurementBeingRemovedId: null,
};

const mapStateToProps = ({
  user: {
    isFetchingMeasurements,
    measurements,
    measurementsCount,
    measurementsCurrentPage,
    measurementsPerPage,
    measurementBeingRemovedId,
    canPaginateMeasurements,
  },
}) => ({
  isFetchingMeasurements,
  measurements,
  measurementsCount,
  measurementsCurrentPage,
  measurementsPerPage,
  measurementBeingRemovedId,
  canPaginateMeasurements,
});

const mapDispatchToProps = dispatch => ({
  loadMeasurements: (page, from, to, shouldReplace) => dispatch(
    getMeasurements(page, from, to, shouldReplace),
  ),
  removeMeasurement: id => dispatch(deleteMeasurement(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsContainer);
