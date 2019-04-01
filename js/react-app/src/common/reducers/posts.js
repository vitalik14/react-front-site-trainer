import {
  REQUEST_HEALTH_POSTS,
  RECEIVE_HEALTH_POSTS,
  REQUEST_PUR_LIFE_POSTS,
  RECEIVE_PUR_LIFE_POSTS,
} from '../actions/actionsTypes';

const initialState = {
  health: {
    isFetching: false,
    items: [],
  },
  purLife: {
    isFetching: false,
    items: [],
  },
};

export default (state = initialState, { type, posts }) => {
  switch (type) {
    case REQUEST_HEALTH_POSTS:
      return {
        ...state,
        health: {
          ...state.health,
          isFetching: true,
        },
      };
    case RECEIVE_HEALTH_POSTS:
      return {
        ...state,
        health: {
          isFetching: false,
          items: posts,
        },
      };
    case REQUEST_PUR_LIFE_POSTS:
      return {
        ...state,
        purLife: {
          ...state.purLife,
          isFetching: true,
        },
      };
    case RECEIVE_PUR_LIFE_POSTS:
      return {
        ...state,
        purLife: {
          isFetching: false,
          items: posts,
        },
      };
    default:
      return state;
  }
};
