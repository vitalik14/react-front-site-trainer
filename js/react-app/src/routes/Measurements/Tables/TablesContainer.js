import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import Tables from './Tables';

export default class TablesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      isDeletionModalShown: false,
      measureToDeleteId: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleDeleteModalOpen = this.handleDeleteModalOpen.bind(this);
    this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
    this.handleDeleteMeasurement = this.handleDeleteMeasurement.bind(this);
  }

  handleChangePage(page) {
    // const { props: { measurementsCurrentPage, measurementsPerPage } } = this;
    // const { page: prevPage } = this.state;
    this.setState({ page });
    // dispatch load more measurements here
  }

  handleDeleteModalOpen(measureToDeleteId) {
    this.setState({
      isDeletionModalShown: true,
      measureToDeleteId,
    });
  }

  handleDeleteModalClose() {
    this.setState({
      isDeletionModalShown: false,
      measureToDeleteId: null,
    });
  }

  handleDeleteMeasurement() {
    const {
      state: { measureToDeleteId },
      props: { deleteMeasurement },
    } = this;
    this.handleDeleteModalClose();
    deleteMeasurement(measureToDeleteId);
  }

  render() {
    const {
      state: {
        page,
        rowsPerPage,
        isDeletionModalShown,
      },
      props: {
        isFetching,
        quickRange,
        startDate,
        endDate,
        onQuickRangeChange,
        onDateRangeChange,
        measurements,
        measurementsCount,
        measurementsCurrentPage,
        measurementsPerPage,
        measurementBeingRemovedId,
        openMeasurementAddingModal,
        deleteMeasurement,
      },
    } = this;
    return (
      <Tables
        isFetching={isFetching}
        page={page}
        rowsPerPage={rowsPerPage}
        quickRange={quickRange}
        startDate={startDate}
        endDate={endDate}
        onQuickRangeChange={onQuickRangeChange}
        onDateRangeChange={onDateRangeChange}
        measurements={measurements}
        measurementsCount={measurementsCount}
        measurementsCurrentPage={measurementsCurrentPage}
        measurementsPerPage={measurementsPerPage}
        measurementBeingRemovedId={measurementBeingRemovedId}
        openMeasurementAddingModal={openMeasurementAddingModal}
        deleteMeasurement={deleteMeasurement}
        onPageChange={this.handleChangePage}
        onModalDeletionOpen={this.handleDeleteModalOpen}
        onModalDeletionClose={this.handleDeleteModalClose}
        onMeasurementDeletion={this.handleDeleteMeasurement}
        isDeletionModalShown={isDeletionModalShown}
      />
    );
  }
}

TablesContainer.propTypes = {
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
  measurementBeingRemovedId: PropTypes.number,
  deleteMeasurement: PropTypes.func.isRequired,
  quickRange: PropTypes.string.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  onQuickRangeChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  openMeasurementAddingModal: PropTypes.func.isRequired,
};

TablesContainer.defaultProps = {
  measurementBeingRemovedId: null,
};
