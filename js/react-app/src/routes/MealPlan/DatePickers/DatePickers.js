import React from 'react';
import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/lib/constants';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { SecondaryButton } from '../customizedMaterialComponents';
import styles from './DatePickers.scss';

const sharedProps = {
  numberOfMonths: 1,
  customInputIcon: (
    <div style={{ fontSize: 16, color: '#EC407A' }}>
      <CalendarTodayIcon fontSize="inherit" color="inherit" />
    </div>
  ),
  inputIconPosition: ICON_AFTER_POSITION,
  noBorder: true,
  hideKeyboardShortcutsPanel: true,
};

const DatePickers = ({
  startDate,
  endDate,
  disabledFrom,
  disabledUntil,
  onStartDateChange,
  onEndDateChange,
  onStartDatePickerFocus,
  onEndDatePickerFocus,
  isStartDatePickerFocused,
  isEndDatePickerFocused,
  onGroceryListModalOpen,
}) => (
  <div className={styles.cont}>
    <h2 className={styles.title}>Mach ein Menü</h2>
    <div className={styles.pickersCont}>
      <div className={styles.pickerCont}>
        <button
          type="button"
          className={styles.labelBtn}
          onClick={() => onStartDatePickerFocus(true)}
        >
          Von
        </button>
        <SingleDatePicker
          date={startDate}
          onDateChange={onStartDateChange}
          focused={isStartDatePickerFocused}
          onFocusChange={({ focused }) => onStartDatePickerFocus(focused)}
          id="start-date-picker"
          isOutsideRange={date => (
            date.isBefore(disabledUntil, 'day')
            || date.isAfter(disabledFrom, 'day')
            || date.isAfter(endDate, 'day')
          )}
          {...sharedProps}
        />
      </div>
      <div className={styles.pickerCont}>
        <button
          type="button"
          className={styles.labelBtn}
          onClick={() => onEndDatePickerFocus(true)}
        >
          Bis
        </button>
        <SingleDatePicker
          date={endDate}
          onDateChange={onEndDateChange}
          focused={isEndDatePickerFocused}
          onFocusChange={({ focused }) => onEndDatePickerFocus(focused)}
          id="end-date-picker"
          isOutsideRange={date => (
            date.isBefore(disabledUntil, 'day')
            || date.isAfter(disabledFrom, 'day')
            || date.isBefore(startDate, 'day')
          )}
          {...sharedProps}
        />
      </div>
    </div>
    <SecondaryButton onClick={onGroceryListModalOpen}>
      EINKAUFSLISTE
    </SecondaryButton>
  </div>
);

DatePickers.propTypes = {
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  disabledUntil: PropTypes.instanceOf(Date),
  disabledFrom: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  onStartDatePickerFocus: PropTypes.func.isRequired,
  onEndDatePickerFocus: PropTypes.func.isRequired,
  isStartDatePickerFocused: PropTypes.bool.isRequired,
  isEndDatePickerFocused: PropTypes.bool.isRequired,
  onGroceryListModalOpen: PropTypes.func.isRequired,
};

DatePickers.defaultProps = {
  disabledUntil: null,
  disabledFrom: null,
};

export default DatePickers;
