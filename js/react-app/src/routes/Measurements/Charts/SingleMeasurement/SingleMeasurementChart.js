import React from 'react';
import { PropTypes } from 'prop-types';
import { LineChart } from 'react-chartkick';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './SingleMeasurementChart.scss';

const SingleMeasurementChart = ({
  isFetching,
  data,
}) => {
  if (!isFetching && data) {
    return (
      <div>
        <LineChart data={data} legend={false} />
      </div>
    );
  }

  return (
    <div className={styles.loaderCont}>
      <CircularProgress />
    </div>
  );
};

SingleMeasurementChart.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.objectOf(
        PropTypes.number,
      ),
    }),
  ).isRequired,
};

export default SingleMeasurementChart;
