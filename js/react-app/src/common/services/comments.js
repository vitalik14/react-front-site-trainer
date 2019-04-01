import { fetch, create, remove } from '../httpClient';

export const fetchComments = (entityType, itemId, page = 1) => fetch(`/comments/${entityType}/${itemId}`, { page });

export const createComment = (entityType, itemId, content) => create(`/comments/${entityType}/${itemId}`, { content });

export const updateComment = (entityType, itemId, commentId, content) => create(`/comments/${entityType}/${itemId}`, { comment_id: commentId, content });

export const deleteComment = id => remove(`/comments/${id}`);
