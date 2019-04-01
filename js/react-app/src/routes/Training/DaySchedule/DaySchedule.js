import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgres from '@material-ui/core/CircularProgress';
import { PrimaryButton } from '../../../common/customizedMaterialComponents';
import ScheduleListItem from '../../../common/components/ListItems/Schedule/ScheduleListItem';
import schedule from '../../../common/models/schedule';
import routeStyles from '../Training.scss';
import componentStyles from './DaySchedule.scss';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function showHideCourses(el) {
  if (el.currentTarget.classList && !el.currentTarget.classList.contains('onlyLive')) {
    Array.prototype.map.call(document.querySelectorAll('#trainers li a[data-live]'), (elem) => {
      if (elem.getAttribute('data-live') === 'false') {
        elem.parentNode.parentNode.classList.add(componentStyles.hideCourse);
        elem.style.display = 'none';
      }
    });
    el.currentTarget.classList.add('onlyLive');
  } else {
    document.querySelector(`.${componentStyles.buttonLiveCourses}`).classList.remove('onlyLive');
  }

  Array.prototype.map.call(document.querySelectorAll('#trainers li a[data-live]'), (elem) => {
    if (elem.getAttribute('data-live') === 'true') {
      elem.style.display = 'block';
      elem.parentNode.parentNode.classList.remove(componentStyles.hideCourse);
    }
  });
}

const DaySchedule = ({
  baseDomain,
  isFetching,
  data,
}) => (
  <div>
    {isFetching && (
      <div className={routeStyles.loaderCont}>
        <CircularProgres />
      </div>
    )}
    {
      !isFetching && (
        <div className={componentStyles.block}>
          <h3 className={componentStyles.title}>Tages & Liveplan
          <ClickAwayListener onClickAway={showHideCourses}>
            <PrimaryButton onClick={showHideCourses} className={componentStyles.buttonLiveCourses}>
              Heute live aus unserem Studio
            </PrimaryButton>
          </ClickAwayListener>
          </h3>
          <ul className={componentStyles.list}  id="trainers">
            {
              Object.keys(data).map(time => (
                <ScheduleListItem
                  key={Math.random()}
                  baseDomain={baseDomain}
                  flexDirection="row"
                  time={time}
                  rooms={data[time]}
                />
              ))
            }
          </ul>
        </div>
      )
    }
  </div>
);

DaySchedule.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    1: schedule,
    2: schedule,
  }).isRequired,
};

export default DaySchedule;
