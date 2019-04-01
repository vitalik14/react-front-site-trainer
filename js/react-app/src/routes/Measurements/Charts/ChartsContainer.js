import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import Charts from './Charts';

export default class ChartsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleMeasurements: {
        Arm: true,
        Bein: true,
        Brust: true,
        Fett: true,
        Gewicht: true,
        Hüfe: true,
        Knochen: true,
        Taille: true,
        Muskeln: true,
        Wasser: true,
      },
    };

    this.toggleMeasure = this.toggleMeasure.bind(this);
    this.loadMoreMeasurements = this.loadMoreMeasurements.bind(this);
  }

  toggleMeasure(key) {
    this.setState(({ visibleMeasurements }) => ({
      visibleMeasurements: {
        ...visibleMeasurements,
        [key]: !visibleMeasurements[key],
      },
    }));
  }

  loadMoreMeasurements() {
    const {
      props: {
        reloadMeasurements,
        measurementsCurrentPage,
        startDate,
        endDate,
      },
    } = this;
    reloadMeasurements(measurementsCurrentPage + 1, startDate, endDate, false);
  }

  render() {
    const {
      state: { visibleMeasurements },
      props: {
        isFetching,
        measurements,
        measurementsCount,
        measurementsPerPage,
        measurementsCurrentPage,
        canPaginateMeasurements,
        quickRange,
        startDate,
        endDate,
        onQuickRangeChange,
        onDateRangeChange,
        openMeasurementAddingModal,
      },
    } = this;

    return (
      <Charts
        quickRange={quickRange}
        startDate={startDate}
        endDate={endDate}
        onQuickRangeChange={onQuickRangeChange}
        onDateRangeChange={onDateRangeChange}
        isFetching={isFetching}
        measurements={measurements}
        measurementsCount={measurementsCount}
        measurementsPerPage={measurementsPerPage}
        measurementsCurrentPage={measurementsCurrentPage}
        canPaginateMeasurements={canPaginateMeasurements}
        onLoadMoreMeasurements={this.loadMoreMeasurements}
        visibleMeasurements={visibleMeasurements}
        onToggleMeasure={this.toggleMeasure}
        openMeasurementAddingModal={openMeasurementAddingModal}
      />
    );
  }
}

ChartsContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  measurements: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  measurementsCount: PropTypes.number.isRequired,
  measurementsPerPage: PropTypes.number.isRequired,
  measurementsCurrentPage: PropTypes.number.isRequired,
  canPaginateMeasurements: PropTypes.bool.isRequired,
  reloadMeasurements: PropTypes.func.isRequired,
  quickRange: PropTypes.string.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  onQuickRangeChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  openMeasurementAddingModal: PropTypes.func.isRequired,
};
