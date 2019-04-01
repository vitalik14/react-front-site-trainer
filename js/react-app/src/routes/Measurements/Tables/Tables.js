import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import Head from '../Head/Head';
import RadioRangePicker from '../RangePickers/Radio/RadioRangePicker';
import DateRangePickerContainer from '../RangePickers/Date/DateRangePickerContainer';
import MeasurementsTopTable from './Top/MeasurementsTopTable';
import MeasurementsBottomTable from './Bottom/MeasurementsBottomTable';
import { StyledTablePagination as MeasurementTablesPagination } from '../customizedMaterialComponents';
import MeasurementTablesPaginationContainer from './Pagination/MeasurementTablesPaginationContainer';
import MeasurementDeletionModal from './DeletionModal/MeasurementDeletionModal';
import { StyledButton } from '../customizedMaterialComponents';
import styles from './Tables.scss';

const renderPlaceholder = (openMeasurementAddingModal) => (
  <div className={styles.placeholderCont}>
    <StyledButton onClick={openMeasurementAddingModal}>
	  Neue Messung
    </StyledButton>
  </div>
);

const renderLoaders = () => (
  <div>
    {Array(10).map(() => (
      <div key={Math.random()}>
        <LinearProgress />
      </div>
    ))}
  </div>
);

const renderTables = (
  page,
  rowsPerPage,
  measurements,
  measurementsCount,
  measurementsCurrentPage,
  measurementsPerPage,
  measurementBeingRemovedId,
  openMeasurementAddingModal,
  onPageChange,
  onModalDeletionOpen,
  onModalDeletionClose,
  onMeasurementDeletion,
  isDeletionModalShown,
) => (
  <div>
    <MeasurementsTopTable
      page={page}
      rowsPerPage={rowsPerPage}
      measurements={measurements}
      measurementsCount={measurementsCount}
      measurementsCurrentPage={measurementsCurrentPage}
      measurementsPerPage={measurementsPerPage}
      measurementBeingRemovedId={measurementBeingRemovedId}
      onPageChange={onPageChange}
      onModalDeletionOpen={onModalDeletionOpen}
    />
    <MeasurementsBottomTable
      page={page}
      rowsPerPage={rowsPerPage}
      measurements={measurements}
      measurementsCount={measurementsCount}
      measurementsCurrentPage={measurementsCurrentPage}
      measurementsPerPage={measurementsPerPage}
      measurementBeingRemovedId={measurementBeingRemovedId}
      onPageChange={onPageChange}
      onModalDeletionOpen={onModalDeletionOpen}
    />
    <MeasurementTablesPagination
      component="div"
      colSpan={11}
      count={measurementsCount}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[]}
      page={page}
      onChangePage={onPageChange}
      ActionsComponent={MeasurementTablesPaginationContainer}
    />
    <MeasurementDeletionModal
      isShown={isDeletionModalShown}
      onClose={onModalDeletionClose}
      onConfirm={onMeasurementDeletion}
    />
  </div>
);

const Tables = ({
  isFetching,
  page,
  rowsPerPage,
  measurements,
  measurementsCount,
  measurementsCurrentPage,
  measurementsPerPage,
  quickRange,
  startDate,
  endDate,
  onQuickRangeChange,
  onDateRangeChange,
  measurementBeingRemovedId,
  openMeasurementAddingModal,
  onPageChange,
  onModalDeletionOpen,
  onModalDeletionClose,
  onMeasurementDeletion,
  isDeletionModalShown,
}) => (
  <div className={styles.tabCont}>
    <Head
      heading="Tables"
      openMeasurementAddingModal={openMeasurementAddingModal}
    />
    <Paper className={styles.paperCont}>
      <div className={styles.topCont}>
        <RadioRangePicker
          value={quickRange}
          onQuickRangeChange={onQuickRangeChange}
        />
        <DateRangePickerContainer
          quickRange={quickRange}
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
      {isFetching && renderLoaders()}
      {!measurements.length && renderPlaceholder(openMeasurementAddingModal)}
      {!!measurements.length && renderTables(
        page,
        rowsPerPage,
        measurements,
        measurementsCount,
        measurementsCurrentPage,
        measurementsPerPage,
        measurementBeingRemovedId,
        openMeasurementAddingModal,
        onPageChange,
        onModalDeletionOpen,
        onModalDeletionClose,
        onMeasurementDeletion,
        isDeletionModalShown,
      )}
    </Paper>
  </div>
);

Tables.propTypes = {
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
  quickRange: PropTypes.string.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  onQuickRangeChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  openMeasurementAddingModal: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onModalDeletionOpen: PropTypes.func.isRequired,
  onModalDeletionClose: PropTypes.func.isRequired,
  onMeasurementDeletion: PropTypes.func.isRequired,
  isDeletionModalShown: PropTypes.bool.isRequired,
};

Tables.defaultProps = {
  measurementBeingRemovedId: null,
};

export default Tables;
