import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { PropTypes } from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker as ReactDates } from 'react-dates'; // eslint-disable-line import/no-named-defaults
import {
  START_DATE,
  END_DATE,
  ICON_AFTER_POSITION,
  VERTICAL_ORIENTATION,
  HORIZONTAL_ORIENTATION,
} from 'react-dates/constants';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import styles from './DateRangePicker.scss';

const DateRangePicker = ({
  startDate,
  endDate,
  focusedInput,
  onDatesChange,
  onFocusChange,
  applyChanges,
  cancel,
  isMobile,
}) => (
  <div className={styles.cont} data-device={isMobile ? 'mobile' : 'desktop'}>
    <ReactDates
      startDate={startDate}
      endDate={endDate}
      startDateId="START_DATE"
      endDateId="END_DATE"
      firstDayOfWeek={1}
      focusedInput={focusedInput}
      onDatesChange={onDatesChange}
      onFocusChange={onFocusChange}
      isOutsideRange={() => false}
      renderCalendarInfo={() => (
        <div className={styles.buttonsCont}>
          <Button variant="outlined" color="primary" onClick={applyChanges}>Apply</Button>
          <Button variant="outlined" color="secondary" onClick={cancel}>Cancel</Button>
        </div>
      )}
      customInputIcon={(
        <div style={{ fontSize: 16, color: '#EC407A' }}>
          <CalendarTodayIcon fontSize="inherit" color="inherit" />
        </div>
      )}
      customArrowIcon={(<span className="dash">-</span>)}
      inputIconPosition={ICON_AFTER_POSITION}
      noBorder
      hideKeyboardShortcutsPanel
      orientation={isMobile ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
    />
  </div>
);

DateRangePicker.propTypes = {
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  focusedInput: PropTypes.oneOf([START_DATE, END_DATE]),
  onDatesChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func.isRequired,
  applyChanges: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

DateRangePicker.defaultProps = {
  focusedInput: null,
};

export default DateRangePicker;
