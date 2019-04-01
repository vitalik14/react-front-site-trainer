import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_COMMENT_CREATION,
  HANDLE_COMMENT_CREATION,
  REQUEST_COMMENT_UPDATE,
  HANDLE_COMMENT_UPDATE,
  REQUEST_COMMENT_DELETION,
  HANDLE_COMMENT_DELETION,
} from './actionsTypes';
import * as service from '../services/comments';
import { camalizeKeys } from '../helpers';
import handleError from '../errorHandler';

const requestComments = (entityType, entityItemId) => ({
  type: REQUEST_COMMENTS,
  entityType,
  entityItemId,
});

const receiveComments = ({
  data, total, perPage, currentPage, nextPageUrl,
}, entityType, entityItemId, replace) => ({
  type: RECEIVE_COMMENTS,
  entityType,
  entityItemId,
  items: data,
  itemsCount: total,
  itemsCountPerPage: +perPage,
  itemsCurrentPage: +currentPage,
  canPaginateItems: !!nextPageUrl,
  replace,
});

const requestCommentCreation = (entityType, entityItemId) => ({
  type: REQUEST_COMMENT_CREATION,
  entityType,
  entityItemId,
});

const handleCommentCreation = ({ commentData }, entityType, entityItemId) => ({
  type: HANDLE_COMMENT_CREATION,
  createdItem: commentData,
  entityType,
  entityItemId,
});

const requestCommentUpdate = (commentId, entityType, entityItemId) => ({
  type: REQUEST_COMMENT_UPDATE,
  itemIdBeingUpdated: commentId,
  entityType,
  entityItemId,
});

const handleCommentUpdate = ({ commentData }, entityType, entityItemId) => ({
  type: HANDLE_COMMENT_UPDATE,
  updatedItem: commentData,
  entityType,
  entityItemId,
});

const requestCommentDeletion = (id, entityType, entityItemId) => ({
  type: REQUEST_COMMENT_DELETION,
  itemIdBeingDeleted: id,
  entityType,
  entityItemId,
});

const handleCommentDeletion = (id, entityType, entityItemId) => ({
  type: HANDLE_COMMENT_DELETION,
  deletedItemId: id,
  entityType,
  entityItemId,
});

export const getComments = (entityType, itemId, replace, page) => dispatch => {
  if (itemId) {
    dispatch(requestComments(entityType, itemId));

    return service.fetchComments(entityType, itemId, page)
      .then(({ data }) => dispatch(
        receiveComments(camalizeKeys(data), entityType, itemId, replace),
      ))
      .catch(handleError);
  }
  return null;
};

export const createComment = (entityType, itemId, content) => dispatch => {
  dispatch(requestCommentCreation(entityType, itemId));

  return service.createComment(entityType, itemId, content)
    .then(({ data }) => dispatch(
      handleCommentCreation(camalizeKeys(data), entityType, itemId),
    ))
    .catch(handleError);
};

export const updateComment = (entityType, itemId, commentId, content) => dispatch => {
  dispatch(requestCommentUpdate(commentId, entityType, itemId));

  return service.updateComment(entityType, itemId, commentId, content)
    .then(({ data }) => dispatch(handleCommentUpdate(camalizeKeys(data), entityType, itemId)))
    .catch(handleError);
};

export const deleteComment = (id, entityType, itemId) => dispatch => {
  dispatch(requestCommentDeletion(id, entityType, itemId));

  return service.deleteComment(id)
    .then(() => dispatch(handleCommentDeletion(id, entityType, itemId)))
    .catch(handleError);
};
