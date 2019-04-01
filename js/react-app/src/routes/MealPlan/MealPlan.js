import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import CircularProgress from '@material-ui/core/CircularProgress';

import DatePickers from './DatePickers/DatePickers';
import SingleMealPlanContainer from './Single/SingleMealPlanContainer';
import GroceryListModal from './GroceryListModal/GroceryListModal';
import meal from '../../common/models/meal';
import styles from './MealPlan.scss';

const months = [
  'Januar',
  'Februar',
  'Marz',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

const getFormattedDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

const getFormattedTimeSpan = (from, to) => `${getFormattedDate(from.toDate())} – ${getFormattedDate(to.toDate())}`;

const renderPlan = (plan, date, isWithinSelectedDates, baseDomain) => {
  if (!isWithinSelectedDates(date)) return null;

  if (!(plan || plan.length) || moment(date) < moment().subtract(1, 'd')) {
    return (
      <div key={Math.random()} className={styles.block}>
        <h2 className={styles.date}>{getFormattedDate(date)}</h2>
        <h3 className={styles.noDataTitle}>
          Hier machen wir Dir keine Vorgaben&nbsp;
          <span role="img" aria-label="grinning">&#128512;</span>
        </h3>
      </div>
    );
  }

  return (
    <div key={Math.random()} className={styles.block}>
      <SingleMealPlanContainer baseDomain={baseDomain} meals={plan} date={getFormattedDate(date)} />
    </div>
  );
};

const MealPlan = ({
  baseDomain,
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
  isWithinSelectedDates,
  isGroceryListModalShown,
  onGroceryListModalOpen,
  onGroceryListModalClose,
  planDates,
  plans,
  groceryListItems,
  isFetchingGroceryList,
  groceryListDownloadURL,
  isFetchingGroceryListPDF,
  onDownloadButtonClick,
  wasFileGenerated,
}) => (
  <div>
    <h1 className={styles.title}>Deine Mahlzeiten</h1>
    <DatePickers
      startDate={startDate}
      endDate={endDate}
      disabledUntil={disabledUntil}
      disabledFrom={disabledFrom}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      onStartDatePickerFocus={onStartDatePickerFocus}
      onEndDatePickerFocus={onEndDatePickerFocus}
      onGroceryListModalOpen={onGroceryListModalOpen}
      isStartDatePickerFocused={isStartDatePickerFocused}
      isEndDatePickerFocused={isEndDatePickerFocused}
    />
    {!plans.length && (
      <div className={styles.loaderCont}>
        <CircularProgress />
      </div>
    )}
    {!!plans.length
      && plans.map(
        (plan, idx) => renderPlan(plan, planDates[idx], isWithinSelectedDates, baseDomain),
      )
    }
    <GroceryListModal
      isShown={isGroceryListModalShown}
      isFetchingGroceryList={isFetchingGroceryList}
      onClose={onGroceryListModalClose}
      timeSpan={getFormattedTimeSpan(startDate, endDate)}
      items={groceryListItems}
      onDownloadButtonClick={onDownloadButtonClick}
      isFetchingGroceryListPDF={isFetchingGroceryListPDF}
      groceryListDownloadURL={groceryListDownloadURL}
      wasFileGenerated={wasFileGenerated}
    />
  </div>
);

MealPlan.propTypes = {
  baseDomain: PropTypes.string.isRequired,
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
  isWithinSelectedDates: PropTypes.func.isRequired,
  isGroceryListModalShown: PropTypes.bool.isRequired,
  onGroceryListModalOpen: PropTypes.func.isRequired,
  onGroceryListModalClose: PropTypes.func.isRequired,
  planDates: PropTypes.arrayOf(
    PropTypes.instanceOf(Date),
  ).isRequired,
  plans: PropTypes.arrayOf(
    PropTypes.arrayOf(meal),
  ).isRequired,
  groceryListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      food: PropTypes.string,
      amount: PropTypes.number,
      unit: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  isFetchingGroceryList: PropTypes.bool.isRequired,
  onDownloadButtonClick: PropTypes.func.isRequired,
  isFetchingGroceryListPDF: PropTypes.bool.isRequired,
  groceryListDownloadURL: PropTypes.string.isRequired,
  wasFileGenerated: PropTypes.bool.isRequired,
};

MealPlan.defaultProps = {
  disabledUntil: null,
  disabledFrom: null,
};

export default MealPlan;
