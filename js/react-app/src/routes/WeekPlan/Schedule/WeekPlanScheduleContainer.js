import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getWeekSchedule } from '../../../common/actions/training';
import WeekPlanSchedule from './WeekPlanSchedule';

const mapStateToProps = (
  { training: { isFetchingWeekSchedule: isFetching, weekSchedule: items } },
  { baseDomain, selectedWeeks },
) => ({
  baseDomain, selectedWeeks, isFetching, items,
});

export default connect(mapStateToProps)(onComponentDidMount(getWeekSchedule)(WeekPlanSchedule));
