import { fetch } from '../httpClient';

export const fetchHealthPosts = () => fetch('/cms/news');

export const fetchPurLifePosts = () => fetch('/cms/purlifenews');

export const fetchPost = id => fetch(`/cms/post/${id}`);
