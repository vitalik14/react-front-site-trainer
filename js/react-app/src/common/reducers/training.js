import { flatten } from 'lodash';

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
} from '../actions/actionsTypes';

const initialState = {
  isFetchingPlans: false,
  hasFetchedPlans: false,
  plans: [],
  plansCount: 0,
  plansCurrentPage: 1,
  canPaginatePlans: false,
  plansPerPage: 0,
  shouldReplacePlans: false,
  isFetchingPartialCourses: false,
  hasFetchedPartialCoursesAtLeastOnce: false,
  partialCourses: [],
  isFetchingFullCourses: false,
  fullCourses: [],
  isFetchingCurrentCourses: false,
  currentCourses: {},
  isFetchingDaySchedule: false,
  daySchedule: {},
  isFetchingWeekSchedule: false,
  weekSchedule: {},
  isFetchingTrainers: false,
  trainers: [],
  isFetchingCourseFilters: false,
  courseFilters: [],
  isFetchingGoals: false,
  goals: [],
};

export default (
  state = initialState,
  {
    type,
    plans,
    plansCount,
    plansCurrentPage,
    plansPerPage,
    shouldReplacePlans,
    canPaginatePlans,
    fullCourses,
    partialCourses,
    currentCourses,
    daySchedule,
    weekSchedule,
    trainers,
    courseFilters,
    goals,
  },
) => {
  switch (type) {
    case REQUEST_TRAINING_PLANS:
      return {
        ...state,
        isFetchingPlans: true,
      };
    case RECEIVE_TRAINING_PLANS:
      return {
        ...state,
        plans: shouldReplacePlans
          ? plans
          : state.plans.concat(plans),
        plansCount,
        plansCurrentPage,
        canPaginatePlans,
        plansPerPage,
        isFetchingPlans: false,
        hasFetchedPlans: true,
      };
    case REQUEST_PARTIAL_COURSES:
      return {
        ...state,
        isFetchingPartialCourses: true,
      };
    case RECEIVE_PARTIAL_COURSES:
      return {
        ...state,
        partialCourses,
        isFetchingPartialCourses: false,
        hasFetchedPartialCoursesAtLeastOnce: true,
      };
    case REQUEST_FULL_COURSES:
      return {
        ...state,
        isFetchingFullCourses: true,
      };
    case RECEIVE_FULL_COURSES:
      return {
        ...state,
        fullCourses,
        isFetchingFullCourses: false,
      };
    case REQUEST_CURRENT_COURSES:
      return {
        ...state,
        isFetchingCurrentCourses: true,
      };
    case RECEIVE_CURRENT_COURSES:
      return {
        ...state,
        currentCourses,
        isFetchingCurrentCourses: false,
      };
    case REQUEST_DAY_SCHEDULE:
      return {
        ...state,
        isFetchingDaySchedule: true,
      };
    case RECEIVE_DAY_SCHEDULE:
      return {
        ...state,
        daySchedule: flatten(
          Object.values(daySchedule)
            .map((room, idx) => room.map(entry => ({ ...entry, roomNumber: idx + 1 }))),
        )
          .reduce((acc, entry) => {
            const { startTime, roomNumber } = entry;
            acc[startTime] = acc[startTime] || {};
            Object.assign(acc[startTime], { [roomNumber]: entry });
            return acc;
          }, {}),
        isFetchingDaySchedule: false,
      };
    case REQUEST_WEEK_SCHEDULE:
      return {
        ...state,
        isFetchingWeekSchedule: true,
      };
    case RECEIVE_WEEK_SCHEDULE:
      return {
        ...state,
        weekSchedule: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(
          (day, dayIdx) => ({
            dayIdx,
            schedules: flatten(
              Object.values(weekSchedule[day])
                .map((room, idx) => room.map(entry => ({ ...entry, roomNumber: idx + 1 }))),
            )
              .reduce((acc, entry) => {
                const { startTime, roomNumber } = entry;
                acc[startTime] = acc[startTime] || {};
                Object.assign(acc[startTime], { [roomNumber]: entry });
                return acc;
              }, {}),
          }),
        ),
        isFetchingWeekSchedule: false,
      };
    case REQUEST_ALL_TRAINERS:
      return {
        ...state,
        isFetchingTrainers: true,
      };
    case RECEIVE_ALL_TRAINERS:
      return {
        ...state,
        trainers,
        isFetchingTrainers: false,
      };
    case REQUEST_COURSE_FILTERS:
      return {
        ...state,
        isFetchingCourseFilters: true,
      };
    case RECEIVE_COURSE_FILTERS:
      return {
        ...state,
        courseFilters,
        isFetchingCourseFilters: false,
      };
    case REQUEST_GOALS:
      return {
        ...state,
        isFetchingGoals: true,
      };
    case RECEIVE_GOALS:
      return {
        ...state,
        goals,
        isFetchingGoals: false,
      };
    default:
      return state;
  }
};
