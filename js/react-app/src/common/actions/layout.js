import { SET_SIDEBAR_EXPANSION_STATE, SET_SIDEBAR_PERSISTENT_EXPANSION_STATE } from './actionsTypes';

const setSidebarExpansionStateAction = state => ({
  type: SET_SIDEBAR_EXPANSION_STATE,
  isSidebarExpanded: state,
});

const setSidebarPermanentExpansionStateAction = state => ({
  type: SET_SIDEBAR_PERSISTENT_EXPANSION_STATE,
  isSidebarExpandedPersistently: state,
});

export const setSidebarExpansionState = state => dispatch => dispatch(
  setSidebarExpansionStateAction(state),
);

export const setSidebarPersistentExpansionState = state => dispatch => dispatch(
  setSidebarPermanentExpansionStateAction(state),
);
