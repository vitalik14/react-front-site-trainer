import {
  REQUEST_TRAINING_PLANS,
  RECEIVE_TRAINING_PLANS,
  REQUEST_PARTIAL_COURSES,
  RECEIVE_PARTIAL_COURSES,
  REQUEST_FULL_COURSES,
  RECEIVE_FULL_COURSES,
  REQUEST_CURRENT_COURSES,
  RECEIVE_CURRENT_COURSES,
  REQUEST_DAY_SCHEDULE,
  RECEIVE_DAY_SCHEDULE,
  REQUEST_WEEK_SCHEDULE,
  RECEIVE_WEEK_SCHEDULE,
  REQUEST_ALL_TRAINERS,
  RECEIVE_ALL_TRAINERS,
  REQUEST_COURSE_FILTERS,
  RECEIVE_COURSE_FILTERS,
  REQUEST_GOALS,
  RECEIVE_GOALS,
} from './actionsTypes';
import {
  fetchPlans,
  fetchCourses,
  fetchCurrentCourses,
  fetchDaySchedule,
  fetchWeekSchedule,
  fetchAllTrainers,
  fetchCourseFilters,
  fetchGoals,
} from '../services/training';
import { camalizeKeys } from '../helpers';
import handleError from '../errorHandler';

const requestPlans = {
  type: REQUEST_TRAINING_PLANS,
};

const receivePlans = ({
  data, total, currentPage, nextPageUrl, perPage,
}, shouldReplace) => ({
  type: RECEIVE_TRAINING_PLANS,
  plans: data,
  plansCount: total,
  plansCurrentPage: +currentPage,
  canPaginatePlans: !!nextPageUrl,
  plansPerPage: perPage,
  shouldReplacePlans: shouldReplace,
});

const requestPartialCourses = () => ({
  type: REQUEST_PARTIAL_COURSES,
});

const receivePartialCourses = partialCourses => ({
  type: RECEIVE_PARTIAL_COURSES,
  partialCourses,
});

const requestFullCourses = () => ({
  type: REQUEST_FULL_COURSES,
});

const receiveFullCourses = fullCourses => ({
  type: RECEIVE_FULL_COURSES,
  fullCourses,
});

const requestCurrentCourses = () => ({
  type: REQUEST_CURRENT_COURSES,
});

const receiveCurrentCourses = currentCourses => ({
  type: RECEIVE_CURRENT_COURSES,
  currentCourses,
});

const requestDaySchedule = () => ({
  type: REQUEST_DAY_SCHEDULE,
});

const receiveDaySchedule = daySchedule => ({
  type: RECEIVE_DAY_SCHEDULE,
  daySchedule,
});

const requestWeekSchedule = () => ({
  type: REQUEST_WEEK_SCHEDULE,
});

const receiveWeekSchedule = weekSchedule => ({
  type: RECEIVE_WEEK_SCHEDULE,
  weekSchedule,
});

const requestAllTrainers = () => ({
  type: REQUEST_ALL_TRAINERS,
});

const receiveAllTrainers = trainers => ({
  type: RECEIVE_ALL_TRAINERS,
  trainers,
});

const requestCourseFilters = () => ({
  type: REQUEST_COURSE_FILTERS,
});

const receiveCourseFilters = courseFilters => ({
  type: RECEIVE_COURSE_FILTERS,
  courseFilters,
});

const requestGoals = { type: REQUEST_GOALS };

const receiveGoals = ({ goals }) => ({
  type: RECEIVE_GOALS,
  goals,
});

export const getPlans = (params, shouldReplace = true) => dispatch => {
  dispatch(requestPlans);

  return fetchPlans(params)
    .then(({ data }) => dispatch(receivePlans(camalizeKeys(data), shouldReplace)))
    .catch(handleError);
};

export const getPartialCourses = name => dispatch => {
  dispatch(requestPartialCourses());

  return fetchCourses(undefined, name)
    .then(({ data: { data } }) => dispatch(receivePartialCourses(camalizeKeys(data))))
    .catch(handleError);
};

export const getFullCourses = () => dispatch => {
  dispatch(requestFullCourses());

  return fetchCourses()
    .then(({ data: { data } }) => dispatch(receiveFullCourses(camalizeKeys(data))))
    .catch(handleError);
};

export const getCurrentCourses = () => dispatch => {
  dispatch(requestCurrentCourses());

  return fetchCurrentCourses()
    .then(({ data }) => dispatch(receiveCurrentCourses(camalizeKeys(data))))
    .catch(handleError);
};

export const getDaySchedule = day => dispatch => {
  dispatch(requestDaySchedule());

  return fetchDaySchedule(day)
    .then(({ data: { schedule } }) => dispatch(receiveDaySchedule(camalizeKeys(schedule))))
    .catch(handleError);
};

export const getWeekSchedule = () => dispatch => {
  dispatch(requestWeekSchedule());

  return fetchWeekSchedule()
    .then(({ data: { schedule } }) => dispatch(receiveWeekSchedule(camalizeKeys(schedule))))
    .catch(handleError);
};

export const getAllTrainers = () => dispatch => {
  dispatch(requestAllTrainers());

  return fetchAllTrainers()
    .then(({ data: { trainer } }) => dispatch(camalizeKeys(receiveAllTrainers(trainer))))
    .catch(handleError);
};

export const getCourseFilters = () => dispatch => {
  dispatch(requestCourseFilters());

  return fetchCourseFilters()
    .then(({ data }) => dispatch(receiveCourseFilters(data)))
    .catch(handleError);
};

export const getGoals = () => dispatch => {
  dispatch(requestGoals);

  return fetchGoals()
    .then(({ data }) => dispatch(receiveGoals(data)))
    .catch(handleError);
};
