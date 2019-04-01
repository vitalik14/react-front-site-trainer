import { SET_SIDEBAR_EXPANSION_STATE, SET_SIDEBAR_PERSISTENT_EXPANSION_STATE } from '../actions/actionsTypes';

const initialState = {
  isSidebarExpanded: null,
  isSidebarExpandedPersistently: null,
};

export default (
  state = initialState,
  {
    type,
    isSidebarExpanded,
    isSidebarExpandedPersistently,
  },
) => {
  switch (type) {
    case SET_SIDEBAR_EXPANSION_STATE:
      return {
        ...state,
        isSidebarExpanded,
      };
    case SET_SIDEBAR_PERSISTENT_EXPANSION_STATE:
      return {
        ...state,
        isSidebarExpandedPersistently,
      };
    default:
      return state;
  }
};
