import React, { Fragment, Component } from 'react';
import { PropTypes } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import styles from './WeekPlanSchedule.scss';
import schedule from '../../../common/models/schedule';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import ScheduleListItem from '../../../common/components/ListItems/Schedule/ScheduleListItem';

import {
  StyledTabs,
  StyledTab
} from '../../../common/customizedMaterialComponents';

const todayIdx = new Date().getDay() - 1;

const days = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag'
];

const getDayTitle = idx => `
  ${idx === todayIdx ? 'Heute ' : ''}
  ${days[idx]}
`;

class WeekPlanSchedule extends Component {
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
  }

  state = {
    tabIdx: 0
  };

  mapDaysFromToday = () => {
    const {
      props: { items }
    } = this;

    const result = [];
    let i = todayIdx;
    let a = 0;
    do {
      if (!items[i] && result.length < items.length) {
        i = 0;
      }
      result[a] = items[i];

      i = 1 + i;
      a = 1 + a;
    } while (result.length !== items.length);
    return result;
  };

  changeTab(event, tabIdx) {
    this.setState({
      tabIdx
    });
  }

  render() {
    const {
      props: { baseDomain, selectedWeeks, isFetching, items },
      state: { tabIdx },
      changeTab,
      mapDaysFromToday
    } = this;

    if (isFetching) return <Loader />;
    if (!items.length) {
      return <p className="placeholder">Keine plan ¯\_(ツ)_/¯</p>;
    }

    return (
      <div className={styles.block}>
        <StyledTabs value={tabIdx} onChange={changeTab}>
          {mapDaysFromToday().map(
            ({ dayIdx }) =>
              selectedWeeks.indexOf(dayIdx) !== -1 && (
                <StyledTab key={dayIdx} label={getDayTitle(dayIdx)} />
              )
          )}
        </StyledTabs>
        {/* <SwipeableViews axis="x" index={tabIdx} onChangeIndex={onTabSwipe}> */}
        {mapDaysFromToday().map(
          ({ dayIdx, schedules }) =>
            selectedWeeks.indexOf(dayIdx) !== -1 && (
              <Fragment key={dayIdx}>
                {dayIdx === tabIdx ? (
                  <ul className={styles.dayScheduleList}>
                    {Object.keys(schedules).map(time => (
                      <ScheduleListItem
                        key={Math.random()}
                        baseDomain={baseDomain}
                        time={time}
                        rooms={schedules[time]}
                      />
                    ))}
                  </ul>
                ) : (
                  <div />
                )}
              </Fragment>
            )
        )}
        {/* </SwipeableViews> */}
      </div>
    );
  }
}

WeekPlanSchedule.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  selectedWeeks: PropTypes.arrayOf(PropTypes.number).isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      dayIdx: PropTypes.string,
      schedule: PropTypes.objectOf(
        PropTypes.shape({
          1: schedule,
          2: schedule
        })
      )
    })
  ).isRequired
};

export default WeekPlanSchedule;
