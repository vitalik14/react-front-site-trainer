import {
  fetch, create, update, remove,
} from '../httpClient';

export const fetchCourses = (
  page = 1,
  name = '',
  tools = '',
  age,
  goal,
  order = 'likesDESC',
  category,
  autocomplete = 0,
) => fetch(
  '/courses',
  {
    page,
    name,
    tools,
    age,
    goal,
    category,
    order,
    autocomplete,
  },
);

export const fetchCourse = id => fetch(`/courses/${id}`);

export const fetchAllTrainers = () => fetch('/trainer/all');

export const fetchCourseFilters = () => fetch('./courses/short');

export const fetchCurrentCourses = () => fetch('/schedule/now');

export const fetchDaySchedule = day => fetch(`/schedule${day ? `/${day}` : ''}`);

export const fetchWeekSchedule = () => fetch('/schedule/week');

export const fetchPlans = (params = {}) => fetch('/trainingplans', params);

export const fetchGoals = () => fetch('/meta/goals');

export const pinTrainingPlan = id => create('/user/trainingplan/pin', { id });

export const unpinTrainingPlan = id => remove(`/user/trainingplan/unpin/${id}`);

export const stopTrainingPlan = () => remove('/user/trainingplan');

export const fetchCurrentTrainingPlan = () => fetch('/user/trainingplan');

export const fetchSingleTrainingPlan = id => fetch(`/trainingplans/${id}`);

export const setTrainingPlan = (
  id,
  withMealPlan,
  startDate,
) => update(
  '/user/trainingplan',
  {
    id,
    meal_plan: withMealPlan,
    start_date: startDate,
  },
);

export const fetchTools = () => fetch('/meta/tools');
