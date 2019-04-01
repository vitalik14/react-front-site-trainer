import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import MultipleMeasurementsChart from './MultipleMeasurementsChart';

export default class MultipleMeasurementsChartContainer extends Component {
  static filterData(measurements, visibleMeasurements, keys) {
	  let measureKeys;

    if (keys) {
      measureKeys = keys;
    } else {
      measureKeys = [
        'arm',
        'chest',
        'hip',
        'waist',
        'leg',
        'fat',
        'water',
        'muscles',
        'bones',
      ];
    }

    const germanMeasureNames = {
      arm: 'Arm',
      bones: 'Knochen',
      chest: 'Brust',
      hip: 'Hüfe',
      waist: 'Taille',
      leg: 'Bein',
      weight: 'Gewicht',
      fat: 'Fett',
      muscles: 'Muskeln',
      water: 'Wasser',
    };

    return measureKeys.map(key => {
      if (visibleMeasurements[germanMeasureNames[key]]) {
        return {
          name: germanMeasureNames[key],
          data: measurements.reduce((acc, { measureDate, [key]: measurement }) => {
            if (measurement) {
              acc[measureDate.split(' ')[0]] = +measurement;
            }
            return acc;
          }, {}),
        };
      }
      return {};
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentWillReceiveProps({ measurements, visibleMeasurements }) {
    if (measurements instanceof Array) {
      const data = this.constructor.filterData(measurements, visibleMeasurements, this.props.keys);
      this.setState({ data });
    }
  }

  render() {
    const {
      props: { isFetching, measurements, visibleMeasurements, keys },
      state: { data },
    } = this;

    return (
      <MultipleMeasurementsChart
        isFetching={isFetching}
        data={data || this.constructor.filterData(measurements, visibleMeasurements, keys)}
      />
    );
  }
}

MultipleMeasurementsChartContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  measurements: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    ),
  ).isRequired,
  visibleMeasurements: PropTypes.objectOf(
    PropTypes.bool,
  ).isRequired,
  keys: PropTypes.arrayOf(
    PropTypes.string
  )
};
