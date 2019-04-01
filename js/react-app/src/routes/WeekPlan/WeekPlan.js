import React from 'react';
import { PropTypes } from 'prop-types';

import Schedule from './Schedule/WeekPlanScheduleContainer';

const WeekPlan = ({
  baseDomain,
  selectedWeeks,
}) => (
  <div>
    <Schedule baseDomain={baseDomain} selectedWeeks={selectedWeeks} />
  </div>
);

WeekPlan.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  selectedWeeks: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default WeekPlan;
