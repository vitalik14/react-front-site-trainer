import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_COMMENT_CREATION,
  HANDLE_COMMENT_CREATION,
  REQUEST_COMMENT_UPDATE,
  HANDLE_COMMENT_UPDATE,
  REQUEST_COMMENT_DELETION,
  HANDLE_COMMENT_DELETION,
} from '../actions/actionsTypes';

const initialState = {
  video: {},
  cmspost: {},
  post: {},
  comment: {},
  recipe: {},
};

export default (
  state = initialState,
  {
    type,
    items,
    itemsCount,
    itemsCountPerPage,
    itemsCurrentPage,
    canPaginateItems,
    replace = true,
    createdItem,
    itemIdBeingUpdated,
    itemIdBeingDeleted,
    updatedItem,
    deletedItemId,
    entityType,
    entityItemId,
  },
) => {
  switch (type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            isFetching: true,
          },
        },
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            items: replace
              ? items
              : state[entityType][entityItemId].items.concat(items),
            itemsCount,
            itemsCountPerPage,
            itemsCurrentPage,
            canPaginateItems,
            isFetching: false,
            hasFetchedAtLeastOnce: true,
          },
        },
      };
    case REQUEST_COMMENT_CREATION:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            isCreating: true,
          },
        },
      };
    case HANDLE_COMMENT_CREATION:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            items: [createdItem].concat(state[entityType][entityItemId].items),
            itemsCount: state[entityType][entityItemId].itemsCount + 1,
            isCreating: false,
          },
        },
      };
    case REQUEST_COMMENT_UPDATE:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            itemIdBeingUpdated,
          },
        },
      };
    case HANDLE_COMMENT_UPDATE:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            items: state[entityType][entityItemId].items.map(item => {
              if (item.id === updatedItem.id) {
                return updatedItem;
              }
              return item;
            }),
            itemIdBeingUpdated: null,
          },
        },
      };
    case REQUEST_COMMENT_DELETION:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            itemIdBeingDeleted,
          },
        },
      };
    case HANDLE_COMMENT_DELETION:
      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityItemId]: {
            ...state[entityType][entityItemId],
            itemIdBeingDeleted: null,
            items: state[entityType][entityItemId].items.filter(({ id }) => id !== deletedItemId),
            itemsCount: state[entityType][entityItemId].itemsCount - 1,
          },
        },
      };
    default:
      return state;
  }
};
