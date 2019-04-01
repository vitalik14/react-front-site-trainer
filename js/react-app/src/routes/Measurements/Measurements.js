import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SwipeableViews from 'react-swipeable-views';

import { StyledTabs, StyledTab } from '../../common/customizedMaterialComponents';
import { StyledPaper } from './customizedMaterialComponents';
import ChartsContainer from './Charts/ChartsContainer';
import TablesContainer from './Tables/TablesContainer';
import AddMeasurementModalContainer from '../../common/components/Modals/AddMeasurement/AddMeasurementModalContainer';

const Measurements = ({
  tabIdx,
  onTabClick,
  onTabSwipe,
  isFetching,
  quickRange,
  startDate,
  endDate,
  onQuickRangeChange,
  onDateRangeChange,
  measurements,
  measurementsCount,
  measurementsPerPage,
  measurementsCurrentPage,
  canPaginateMeasurements,
  measurementBeingRemovedId,
  reloadMeasurements,
  deleteMeasurement,
  isAddMeasurementModalShown,
  openMeasurementAddingModal,
  closeMeasurementAddingModal,
}) => (
  <div>
    <StyledPaper square>
      <StyledTabs
        value={tabIdx}
        onChange={onTabClick}
        fullWidth
      >
        <StyledTab label="Diagramme" />
        <StyledTab label="Tabelle" />
      </StyledTabs>
    </StyledPaper>
    <SwipeableViews
      axis="x"
      index={tabIdx}
      onChangeIndex={onTabSwipe}
    >
      {(tabIdx === 0 && (
        <ChartsContainer
          isFetching={isFetching}
          quickRange={quickRange}
          startDate={startDate}
          endDate={endDate}
          onQuickRangeChange={onQuickRangeChange}
          onDateRangeChange={onDateRangeChange}
          measurements={measurements}
          measurementsPerPage={measurementsPerPage}
          measurementsCurrentPage={measurementsCurrentPage}
          measurementsCount={measurementsCount}
          canPaginateMeasurements={canPaginateMeasurements}
          reloadMeasurements={reloadMeasurements}
          openMeasurementAddingModal={openMeasurementAddingModal}
        />
      )) || <div />}
      {(tabIdx === 1 && (
        <TablesContainer
          isFetching={isFetching}
          quickRange={quickRange}
          startDate={startDate}
          endDate={endDate}
          onQuickRangeChange={onQuickRangeChange}
          onDateRangeChange={onDateRangeChange}
          measurements={measurements}
          measurementsCount={measurementsCount}
          measurementsPerPage={measurementsPerPage}
          measurementsCurrentPage={measurementsCurrentPage}
          measurementBeingRemovedId={measurementBeingRemovedId}
          openMeasurementAddingModal={openMeasurementAddingModal}
          deleteMeasurement={deleteMeasurement}
        />
      )) || <div />}
    </SwipeableViews>
    <AddMeasurementModalContainer
      isShown={isAddMeasurementModalShown}
      close={closeMeasurementAddingModal}
    />
  </div>
);

Measurements.propTypes = {
  tabIdx: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onTabSwipe: PropTypes.func.isRequired,
  quickRange: PropTypes.string.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  onQuickRangeChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
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
  measurementsCurrentPage: PropTypes.number.isRequired,
  measurementsPerPage: PropTypes.number.isRequired,
  canPaginateMeasurements: PropTypes.bool.isRequired,
  measurementBeingRemovedId: PropTypes.number,
  reloadMeasurements: PropTypes.func.isRequired,
  deleteMeasurement: PropTypes.func.isRequired,
  isAddMeasurementModalShown: PropTypes.bool.isRequired,
  openMeasurementAddingModal: PropTypes.func.isRequired,
  closeMeasurementAddingModal: PropTypes.func.isRequired,
};

Measurements.defaultProps = {
  measurementBeingRemovedId: null,
};

export default Measurements;
