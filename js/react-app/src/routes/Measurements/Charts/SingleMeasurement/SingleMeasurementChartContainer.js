import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import SingleMeasurementChart from './SingleMeasurementChart';

export default class SingleMeasurementChartContainer extends Component {
  static filterData(measurements, key, name) {
    return [{
      name,
      data: measurements.reduce((acc, { measureDate, [key]: measurement }) => {
        if (measurement) {
          acc[measureDate.split(' ')[0]] = +measurement;
        }
        return acc;
      }, {}),
    }];
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillReceiveProps({ measurements }) {
    if (measurements instanceof Array) {
      const { props: { measurementKey, measurementName } } = this;
      this.setState({
        data: this.constructor.filterData(measurements, measurementKey, measurementName),
      });
    }
  }

  render() {
    const {
      props: { isFetching, measurements },
      state: { data },
    } = this;

    return (
      <SingleMeasurementChart
        isFetching={isFetching}
        data={data || this.constructor.filterData(measurements)}
      />
    );
  }
}


SingleMeasurementChartContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  measurements: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  measurementKey: PropTypes.string.isRequired,
  measurementName: PropTypes.string.isRequired,
};
