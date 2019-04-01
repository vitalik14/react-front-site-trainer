import {
  fetch, create, update, remove,
} from '../httpClient';

export const fetchFriends = (
  page = 1, status = 'friends', order = 'friendshipDESC',
) => fetch('/fitbook/friends', { page, status, order });

export const searchFriends = term => create('/fitbook/friends/search', { term });

export const addFriend = id => create('/fitbook/friends', { user_id: id });

export const confirmFriendRequest = id => create('/fitbook/friends/accept', { user_id: id });

export const denyFriendRequest = id => remove(`/fitbook/friends/reject/${id}`);

export const deleteFriend = id => remove(`/fitbook/friends/${id}`);

export const confirmUsage = () => create('/fitbook/accept', { fitbook_usage: true });

export const fetchSidebarData = () => fetch('/fitbook/sidebar');

export const fetchPosts = (page = 1, content = 'all') => fetch('/fitbook/feed', { page, content });

export const createPost = (content, sharedWith, files = []) => create('/fitbook/post', { content, sharedWith, files });

export const updatePost = (id, content) => update('/fitbook/post', { id, content });

export const removePost = id => remove(`fitbook/post/${id}`);

export const pinPost = id => fetch(`/fitbook/pinpost/${id}`);

export const fetchProfileData = userId => fetch(`/fitbook/profile/${userId}`);

export const fetchStats = () => fetch('/fitbook/stats');

export const fetchChats = (type = 'active') => fetch('/fitbook/chat', { type });

export const fetchChat = (id, page = 1) => fetch(`/fitbook/chat/${id}`, { page });

export const addChatMessage = (id, message) => update('/fitbook/chat', { id, message });

export const updateChat = (id, name, users) => create('/fitbook/chat', { id, name, users });

export const createSingleChat = user => update('/fitbook/createchat', { type: 'single', user });

export const createGroupChat = (users, name) => update('/fitbook/createchat', { type: 'group', users, name });

export const archiveChat = id => remove(`/fitbook/chat/${id}`);

export const leaveGroupChat = id => remove(`/fitbook/chatgroup/${id}`);
