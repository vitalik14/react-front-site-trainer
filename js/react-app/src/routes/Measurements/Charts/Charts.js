import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Head from '../Head/Head';
import RadioRangePicker from '../RangePickers/Radio/RadioRangePicker';
import DateRangePickerContainer from '../RangePickers/Date/DateRangePickerContainer';
import Heading from './Heading/Heading';
import MeasurementSwitchersContainer from './MeasurementSwitchers/MeasurementSwitchersContainer';
import MultipleMeasurementsChartContainer from './MultipleMeasurements/MultipleMeasurementsChartContainer';
import styles from './Charts.scss';

const Chart = ({
  isFetching,
  measurements,
  measurementsCount,
  measurementsPerPage,
  measurementsCurrentPage,
  canPaginateMeasurements,
  onLoadMoreMeasurements,
  visibleMeasurements,
  quickRange,
  startDate,
  endDate,
  onQuickRangeChange,
  onDateRangeChange,
  onToggleMeasure,
  openMeasurementAddingModal,
}) => (
  <div className={styles.cont}>
    <Head
      openMeasurementAddingModal={openMeasurementAddingModal}
      heading="Charts"
    />
    <Paper>
      <div className={styles.chartsCont}>
        <div className={styles.chartsInnerCont}>
          <div className={styles.chartsInnerTopCont}>
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
          <MeasurementSwitchersContainer
            visibleMeasurements={visibleMeasurements}
            onToggleMeasure={onToggleMeasure}
          />
        </div>
        <Heading
            title="Körpermaße"
            measure="(cm)"
          />
          <MultipleMeasurementsChartContainer
            isFetching={isFetching}
            measurements={measurements}
        visibleMeasurements={visibleMeasurements}
        keys={['arm', 'chest', 'hip', 'waist', 'leg']}
          />
      <div className={styles.chartsTwo}>
        <div className={styles.chartsRow}>
          <Heading
            title="Körperanteile"
            measure="(%)"
          />
          <MultipleMeasurementsChartContainer
            isFetching={isFetching}
            measurements={measurements}
            visibleMeasurements={visibleMeasurements}
            keys={['fat', 'water']}
          />
        </div>
        <div className={styles.chartsRow}>
          <Heading
          title="Körpermasse"
          measure="(kg)"
          />
          <MultipleMeasurementsChartContainer
            isFetching={isFetching}
            measurements={measurements}
            visibleMeasurements={visibleMeasurements}
            keys={['muscles', 'bones']}
          />
        </div>
      </div>
        <div className={styles.paginationCont}>
          <div>
            <p className={styles.paginationCount}>
              Zeige&nbsp;
              {Math.min(measurementsCount, measurementsPerPage * measurementsCurrentPage)}
              &nbsp;Messungen von&nbsp;
              {measurementsCount}
            </p>
            <Button variant="outlined" color="primary" onClick={onLoadMoreMeasurements} disabled={!canPaginateMeasurements || isFetching}>
              Laden Sie mehr Daten
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  </div>
);

Chart.propTypes = {
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
  visibleMeasurements: PropTypes.objectOf(
    PropTypes.bool,
  ).isRequired,
  onLoadMoreMeasurements: PropTypes.func.isRequired,
  quickRange: PropTypes.string.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  onQuickRangeChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  onToggleMeasure: PropTypes.func.isRequired,
  openMeasurementAddingModal: PropTypes.func.isRequired,
};

export default Chart;
