import {
  REQUEST_CURRENT_USER,
  RECEIVE_CURRENT_USER,
  REQUEST_COMMON_DATA,
  RECEIVE_COMMON_DATA,
  REQUEST_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ_START,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  REQUEST_DASHBOARD_DATA,
  RECEIVE_DASHBOARD_DATA,
  REQUEST_MEASUREMENTS,
  RECEIVE_MEASUREMENTS,
  REQUEST_MEASUREMENT_ADDING,
  HANDLE_MEASUREMENT_ADDING,
  REQUEST_MEASUREMENT_REMOVAL,
  REMOVE_MEASUREMENT,
  REQUEST_UNLOCKED_ACHIEVEMENTS,
  RECEIVE_UNLOCKED_ACHIEVEMENTS,
  REQUEST_FAVORITE_ITEMS,
  RECEIVE_FAVORITE_ITEMS,
  REQUEST_PREFERENCES,
  RECEIVE_PREFERENCES,
  REQUEST_PREFERENCES_UPDATE,
  HANDLE_PREFERENCES_UPDATE,
} from './actionsTypes';
import {
  fetchCurrentUser,
  fetchNotifications,
  fetchCommonData,
  sendNotificationRead,
  sendAllNotificationsRead,
  fetchDashboardData,
  fetchMeasurements,
  createMeasurement,
  destroyMeasurement,
  fetchUnlockedAchievements,
  fetchFavoriteItems,
  fetchPreferences,
  updatePreferences,
} from '../services/user';
import handleError from '../errorHandler';
import { camalizeKeys } from '../helpers';

const requestCurrentUser = () => ({
  type: REQUEST_CURRENT_USER,
});

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const requestCommonData = { type: REQUEST_COMMON_DATA };

const receiveCommonData = data => ({
  type: RECEIVE_COMMON_DATA,
  commonData: data,
});

const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS,
});

const receiveNotifications = ({
  data, total, currentPage, nextPageUrl,
}) => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications: data,
  notificationsCount: total,
  notificationsCurrentPage: +currentPage,
  canPaginateNotifications: !!nextPageUrl,
});

const markNotificationAsRead = id => ({
  type: MARK_NOTIFICATION_AS_READ,
  readNotificationId: id,
});

const markAllNotificationsAsReadStart = { type: MARK_ALL_NOTIFICATIONS_AS_READ_START };

const markAllNotificationsAsReadSuccess = { type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS };

const requestDashboardData = () => ({
  type: REQUEST_DASHBOARD_DATA,
});

const receiveDashboardData = dashboardData => ({
  type: RECEIVE_DASHBOARD_DATA,
  dashboardData,
});

const requestMeasurements = () => ({
  type: REQUEST_MEASUREMENTS,
});

const receiveMeasurements = ({
  data, total, currentPage, perPage, nextPageUrl,
}, shouldReplace) => ({
  type: RECEIVE_MEASUREMENTS,
  measurements: data,
  measurementsCount: total,
  measurementsCurrentPage: +currentPage,
  measurementsPerPage: perPage,
  canPaginateMeasurements: !!nextPageUrl,
  shouldReplaceMeasurements: shouldReplace,
});

const requestMeasurementAdding = () => ({
  type: REQUEST_MEASUREMENT_ADDING,
});

const handleMeasurementAdding = ({ data }) => ({
  type: HANDLE_MEASUREMENT_ADDING,
  addedMeasurement: camalizeKeys(JSON.parse(data)),
});

const requestMeasurementRemoval = id => ({
  type: REQUEST_MEASUREMENT_REMOVAL,
  measurementBeingRemovedId: id,
});

const removeMeasurement = id => ({
  type: REMOVE_MEASUREMENT,
  removedMeasurementId: id,
});

const requestUnlockedAchievements = () => ({
  type: REQUEST_UNLOCKED_ACHIEVEMENTS,
});

const receiveUnlockedAchievements = unlockedAchievements => ({
  type: RECEIVE_UNLOCKED_ACHIEVEMENTS,
  unlockedAchievements,
});

const requestFavoriteItems = type => ({
  type: REQUEST_FAVORITE_ITEMS,
  favoriteItemsType: type,
});

const receiveFavoriteItems = ({
  data, total, currentPage, perPage, nextPageUrl,
}, type) => ({
  type: RECEIVE_FAVORITE_ITEMS,
  favoriteItemsType: type,
  favorites: {
    [type]: {
      items: data,
      count: total,
      currentPage,
      countPerPage: perPage,
      canPaginate: !!nextPageUrl,
    },
  },
});

const requestPreferences = {
  type: REQUEST_PREFERENCES,
};

const receivePreferences = preferences => ({
  type: RECEIVE_PREFERENCES,
  preferences,
});

const requestPreferencesUpdate = {
  type: REQUEST_PREFERENCES_UPDATE,
};

const handlePreferencesUpdate = preferences => ({
  type: HANDLE_PREFERENCES_UPDATE,
  preferences,
});

export const getCurrentUser = () => dispatch => {
  dispatch(requestCurrentUser());

  return fetchCurrentUser()
    .then(({ data: { user } }) => dispatch(receiveCurrentUser(camalizeKeys(user))))
    .catch(handleError);
};

export const getCommonData = () => dispatch => {
  dispatch(requestCommonData);

  return fetchCommonData()
    .then(({ data: { common } }) => dispatch(receiveCommonData(camalizeKeys(common))))
    .catch(handleError);
};

export const getNotifications = page => dispatch => {
  dispatch(requestNotifications());

  return fetchNotifications(page)
    .then(({ data }) => dispatch(receiveNotifications(camalizeKeys(data))))
    .catch(handleError);
};

export const readNotification = (id, url) => dispatch => sendNotificationRead(id)
  .then(() => {
    dispatch(markNotificationAsRead(id));
    window.location.href = url;
  })
  .catch(handleError);

export const readAllNotifications = () => dispatch => {
  dispatch(markAllNotificationsAsReadStart);

  return sendAllNotificationsRead()
    .then(() => dispatch(markAllNotificationsAsReadSuccess))
    .catch(handleError);
};

export const getDashboardData = () => dispatch => {
  dispatch(requestDashboardData());

  return fetchDashboardData()
    .then(({ data }) => dispatch(receiveDashboardData(camalizeKeys(data))))
    .catch(handleError);
};

export const getMeasurements = (page, from, to, shouldReplace) => dispatch => {
  dispatch(requestMeasurements());

  return fetchMeasurements(page, from, to)
    .then(({ data }) => dispatch(receiveMeasurements(camalizeKeys(data), shouldReplace)))
    .catch(handleError);
};

export const addMeasurement = measurement => dispatch => {
  dispatch(requestMeasurementAdding());

  return createMeasurement(measurement)
    .then(({ data }) => dispatch(handleMeasurementAdding(data)))
    .catch(handleError);
};

export const deleteMeasurement = id => dispatch => {
  dispatch(requestMeasurementRemoval(id));

  return destroyMeasurement(id)
    .then(() => dispatch(removeMeasurement(id)))
    .catch(handleError);
};

export const getUnlockedAchievements = () => dispatch => {
  dispatch(requestUnlockedAchievements());

  return fetchUnlockedAchievements()
    .then(({ data: { achievements } }) => dispatch(receiveUnlockedAchievements(achievements)))
    .catch(handleError);
};

export const getFavoriteItems = type => dispatch => {
  dispatch(requestFavoriteItems(type));

  return fetchFavoriteItems(type)
    .then(({ data }) => dispatch(receiveFavoriteItems(camalizeKeys(data), type)))
    .catch(handleError);
};

export const getPreferences = () => dispatch => {
  dispatch(requestPreferences);

  return fetchPreferences()
    .then(({ data }) => dispatch(receivePreferences(camalizeKeys(data))))
    .catch(handleError);
};

export const setPreferences = data => dispatch => {
  dispatch(requestPreferencesUpdate);

  return updatePreferences(data)
    .then(() => dispatch(handlePreferencesUpdate(data)))
    .catch(handleError);
};
