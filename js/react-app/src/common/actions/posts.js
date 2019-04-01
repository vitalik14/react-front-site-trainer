import {
  REQUEST_HEALTH_POSTS,
  RECEIVE_HEALTH_POSTS,
  REQUEST_PUR_LIFE_POSTS,
  RECEIVE_PUR_LIFE_POSTS,
} from './actionsTypes';
import {
  fetchHealthPosts,
  fetchPurLifePosts,
} from '../services/posts';
import { camalizeKeys } from '../helpers';
import handleError from '../errorHandler';

const requestHealthPosts = () => ({
  type: REQUEST_HEALTH_POSTS,
});

const receiveHealthPosts = ({ posts }) => ({
  type: RECEIVE_HEALTH_POSTS,
  posts,
});

const requestPurLifePosts = () => ({
  type: REQUEST_PUR_LIFE_POSTS,
});

const receivePurLifePosts = ({ posts }) => ({
  type: RECEIVE_PUR_LIFE_POSTS,
  posts,
});

export const getHealthPosts = () => dispatch => {
  dispatch(requestHealthPosts());

  return fetchHealthPosts()
    .then(({ data }) => dispatch(receiveHealthPosts(camalizeKeys(data))))
    .catch(handleError);
};

export const getPurLifePosts = () => dispatch => {
  dispatch(requestPurLifePosts());

  return fetchPurLifePosts()
    .then(({ data }) => dispatch(receivePurLifePosts(camalizeKeys(data))))
    .catch(handleError);
};
