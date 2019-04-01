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
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  REJECT_FRIEND_REQUEST_SUCCESS,
} from '../actions/actionsTypes';

const favoritesState = {
  video: {
    isFetching: false,
    items: [],
    count: 0,
    currentPage: 1,
    countPerPage: 0,
    canPaginate: false,
    hasBeenFetchedAtLeastOnce: false,
  },
  post: {
    isFetching: false,
    items: [],
    count: 0,
    currentPage: 1,
    countPerPage: 0,
    canPaginate: false,
    hasBeenFetchedAtLeastOnce: false,
  },
  recipe: {
    isFetching: false,
    items: [],
    count: 0,
    currentPage: 1,
    countPerPage: 0,
    canPaginate: false,
    hasBeenFetchedAtLeastOnce: false,
  },
};

const initialState = {
  currentUser: {},
  isFetchingCurrentUser: false,
  commonData: {},
  isFetchingCommonData: false,
  isFetchingNotifications: false,
  hasFetchedNotifications: false,
  notifications: {},
  notificationsCount: 0,
  notificationsCurrentPage: 1,
  canPaginateNotifications: false,
  isMarkingAllNotificationsAsRead: false,
  isFetchingDashboardData: false,
  dashboardData: {},
  isFetchingMeasurements: false,
  measurements: [],
  measurementsCount: 0,
  measurementsCurrentPage: 0,
  measurementsPerPage: 0,
  canPaginateMeasurements: false,
  addedMeasurement: {},
  isMeasurementBeingCreated: false,
  measurementBeingRemovedId: null,
  removedMeasurementId: null,
  isFetchingUnlockedAchievements: false,
  unlockedAchievements: {},
  isFetchingFavoriteVideos: false,
  favorites: favoritesState,
  isFetchingPreferences: false,
  isUpdatingPreferences: false,
  preferences: {},
};

export default (
  state = initialState,
  {
    type,
    currentUser,
    commonData,
    notifications,
    notificationsCount,
    notificationsCurrentPage,
    canPaginateNotifications,
    readNotificationId,
    dashboardData,
    measurements,
    measurementsCount,
    measurementsCurrentPage,
    measurementsPerPage,
    canPaginateMeasurements,
    shouldReplaceMeasurements = true,
    addedMeasurement,
    measurementBeingRemovedId,
    removedMeasurementId,
    unlockedAchievements,
    favoriteItemsType,
    favorites,
    preferences,
  },
) => {
  switch (type) {
    case REQUEST_CURRENT_USER:
      return {
        ...state,
        isFetchingCurrentUser: true,
      };
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        currentUser,
        isFetchingCurrentUser: false,
      };
    case REQUEST_COMMON_DATA:
      return {
        ...state,
        isFetchingCommonData: true,
      };
    case RECEIVE_COMMON_DATA:
      return {
        ...state,
        commonData,
        isFetchingCommonData: false,
      };
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        isFetchingNotifications: true,
      };
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        isFetchingNotifications: false,
        hasFetchedNotifications: true,
        notificationsCount,
        notificationsCurrentPage,
        canPaginateNotifications,
        notifications: {
          ...state.notifications,
          ...notifications.reduce((acc, notification) => {
            acc[notification.id] = notification;
            return acc;
          }, {}),
        },
      };
    case MARK_NOTIFICATION_AS_READ:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [readNotificationId]: {
            ...state.notifications[readNotificationId],
            read: 1,
          },
        },
      };
    case MARK_ALL_NOTIFICATIONS_AS_READ_START:
      return {
        ...state,
        isMarkingAllNotificationsAsRead: true,
      };
    case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return {
        ...state,
        commonData: {
          ...state.commonData,
          unreadNotifications: 0,
        },
        isMarkingAllNotificationsAsRead: false,
      };
    case REQUEST_DASHBOARD_DATA:
      return {
        ...state,
        isFetchingDashboardData: true,
      };
    case RECEIVE_DASHBOARD_DATA:
      return {
        ...state,
        isFetchingDashboardData: false,
        dashboardData,
      };
    case REQUEST_MEASUREMENTS:
      return {
        ...state,
        isFetchingMeasurements: true,
      };
    case RECEIVE_MEASUREMENTS:
      return {
        ...state,
        measurements: shouldReplaceMeasurements
          ? measurements
          : state.measurements.concat(measurements),
        measurementsCount,
        measurementsCurrentPage,
        measurementsPerPage,
        canPaginateMeasurements,
        isFetchingMeasurements: false,
      };
    case REQUEST_MEASUREMENT_ADDING:
      return {
        ...state,
        isMeasurementBeingCreated: true,
      };
    case HANDLE_MEASUREMENT_ADDING:
      return {
        ...state,
        measurements: state.measurements.concat(addedMeasurement),
        measurementsCount: state.measurementsCount + 1,
      };
    case REQUEST_MEASUREMENT_REMOVAL:
      return {
        ...state,
        measurementBeingRemovedId,
      };
    case REMOVE_MEASUREMENT:
      return {
        ...state,
        measurementBeingRemovedId: null,
        measurements: state.measurements.filter(({ id }) => id !== removedMeasurementId),
        measurementsCount: state.measurementsCount - 1,
      };
    case REQUEST_UNLOCKED_ACHIEVEMENTS:
      return {
        ...state,
        isFetchingUnlockedAchievements: true,
      };
    case RECEIVE_UNLOCKED_ACHIEVEMENTS:
      return {
        ...state,
        unlockedAchievements,
        isFetchingUnlockedAchievements: false,
      };
    case REQUEST_FAVORITE_ITEMS:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [favoriteItemsType]: {
            ...state.favorites[favoriteItemsType],
            isFetching: true,
          },
        },
      };
    case RECEIVE_FAVORITE_ITEMS:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [favoriteItemsType]: {
            ...state.favorites[favoriteItemsType],
            ...favorites[favoriteItemsType],
            isFetching: false,
            hasBeenFetchedAtLeastOnce: true,
          },
        },
      };
    case REQUEST_PREFERENCES:
      return {
        ...state,
        isFetchingPreferences: true,
      };
    case RECEIVE_PREFERENCES:
      return {
        ...state,
        preferences,
        isFetchingPreferences: false,
      };
    case REQUEST_PREFERENCES_UPDATE:
      return {
        ...state,
        isUpdatingPreferences: true,
      };
    case HANDLE_PREFERENCES_UPDATE:
      return {
        ...state,
        preferences,
        isUpdatingPreferences: false,
      };
    case ACCEPT_FRIEND_REQUEST_SUCCESS:
    case REJECT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        commonData: {
          ...state.commonData,
          friendshipRequests: state.commonData.friendshipRequests - 1,
        },
      };
    default:
      return state;
  }
};
