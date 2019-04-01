import {
  REQUEST_VIDEOS,
  RECEIVE_VIDEOS,
  REQUEST_VIDEO,
  RECEIVE_VIDEO
} from '../actions/actionsTypes';

const itemsInitialState = {
  isFetching: false,
  hasBeenFetchedAtLeastOnce: false,
  items: [],
  filteredItems: [],
  count: 0,
  countPerPage: 0,
  currentPage: 0,
  canPaginate: false
};

const initialState = {
  all: itemsInitialState,
  started: itemsInitialState,
  finished: itemsInitialState,
  isFetchingCurrentVideo: false,
  current: {}
};

export default (
  state = initialState,
  {
    type,
    items,
    count,
    countPerPage,
    currentPage,
    canPaginate,
    progressState,
    shouldReplace,
    video
  }
) => {
  switch (type) {
    case REQUEST_VIDEOS:
      return {
        ...state,
        [progressState]: {
          ...state[progressState],
          isFetching: true
        }
      };
    case RECEIVE_VIDEOS:
      return {
        ...state,
        [progressState]: {
          ...state[progressState],
          items: shouldReplace
            ? items
            : state[progressState].items.concat(items),
          count,
          countPerPage,
          currentPage,
          canPaginate,
          isFetching: false,
          hasBeenFetchedAtLeastOnce: true
        }
      };
    case REQUEST_VIDEO:
      return {
        ...state,
        isFetchingCurrentVideo: true
      };
    case RECEIVE_VIDEO:
      return {
        ...state,
        current: video,
        isFetchingCurrentVideo: false
      };
    default:
      return state;
  }
};
