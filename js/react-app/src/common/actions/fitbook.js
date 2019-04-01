import {
  REQUEST_FRIENDS,
  RECEIVE_FRIENDS,
  ADD_FRIEND_START,
  ADD_FRIEND_SUCCESS,
  RECEIVE_REQUESTED_FRIENDS,
  REQUEST_FRIENDS_SEARCH_RESULTS,
  RECEIVE_FRIENDS_SEARCH_RESULTS,
  REQUEST_FRIEND_REQUESTS,
  RECEIVE_FRIEND_REQUESTS,
  REQUEST_FRIEND_REMOVAL,
  HANDLE_FRIEND_REMOVAL,
  ACCEPT_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  REJECT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST_SUCCESS,
  REQUEST_FITBOOK_SIDEBAR_DATA,
  RECEIVE_FITBOOK_SIDEBAR_DATA,
  ACCEPT_FITBOOK_USAGE,
  ACCEPT_FITBOOK_USAGE_SUCCESS,
  REQUEST_FITBOOK_POST_LIKE,
  HANDLE_FITBOOK_POST_LIKE,
  REQUEST_FITBOOK_POST_UNLIKE,
  HANDLE_FITBOOK_POST_UNLIKE,
  REQUEST_PINNED_POST_LIKE,
  HANDLE_PINNED_POST_LIKE,
  REQUEST_PINNED_POST_UNLIKE,
  HANDLE_PINNED_POST_UNLIKE,
  REQUEST_POST_CREATION,
  HANDLE_POST_CREATION,
  REQUEST_POST_UPDATE,
  HANDLE_POST_UPDATE,
  REQUEST_POST_REMOVAL,
  HANDLE_POST_REMOVAL,
  REQUEST_POST_PIN,
  HANDLE_POST_PIN,
  REQUEST_POST_UNPIN,
  HANDLE_POST_UNPIN,
  REQUEST_PROFILE_DATA,
  RECEIVE_PROFILE_DATA,
  REQUEST_FITBOOK_STATS,
  RECEIVE_FITBOOK_STATS,
  REQUEST_FITBOOK_CHATS,
  RECEIVE_FITBOOK_CHATS,
  REQUEST_FITBOOK_CHAT,
  RECEIVE_FITBOOK_CHAT,
  ADD_CHAT_MESSAGE_START,
  UPDATE_CHAT_NAME_START,
  UPDATE_CHAT_NAME_SUCCESS,
  UPDATE_CHAT_USERS_START,
  UPDATE_CHAT_USERS_SUCCESS,
  CREATE_SINGLE_CHAT_START,
  CREATE_SINGLE_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_START,
} from './actionsTypes';
import {
  fetchFriends,
  searchFriends,
  addFriend,
  confirmFriendRequest,
  denyFriendRequest,
  deleteFriend,
  fetchSidebarData,
  confirmUsage,
  fetchPosts,
  createPost,
  updatePost,
  removePost,
  pinPost,
  fetchProfileData,
  fetchStats,
  fetchChats,
  fetchChat,
  addChatMessage,
  updateChat,
  createSingleChat,
  createGroupChat,
} from '../services/fitbook';
import { like, unlike } from '../services/user';
import { camalizeKeys } from '../helpers';
import handleError from '../errorHandler';
import { getCurrentPath } from '../../routes/Chat/Chat';

const requestFriends = { type: REQUEST_FRIENDS };

const receiveFriends = ({
  data, total, perPage, currentPage, nextPageUrl,
}, replaceFriends) => ({
  type: RECEIVE_FRIENDS,
  friends: data,
  friendsCount: total,
  friendsCountPerPage: perPage,
  friendsCurrentPage: +currentPage,
  canPaginateFriends: !!nextPageUrl,
  replaceFriends,
});

const addFriendStart = id => ({
  type: ADD_FRIEND_START,
  friendBeingAddedId: id,
});

const addFriendSuccess = id => ({
  type: ADD_FRIEND_SUCCESS,
  addedFriendId: id,
});

const receiveRequestedFriends = ({ data }) => ({
  type: RECEIVE_REQUESTED_FRIENDS,
  requestedFriends: data,
});

const requestFriendRequests = { type: REQUEST_FRIEND_REQUESTS };

const requestFriendsSearchResults = { type: REQUEST_FRIENDS_SEARCH_RESULTS };

const receiveFriendsSearchResults = ({ data }) => ({
  type: RECEIVE_FRIENDS_SEARCH_RESULTS,
  friendsSearchResults: data,
});

const receiveFriendRequests = ({
  data, total, perPage, currentPage, nextPageUrl,
}, replaceFriendRequests) => ({
  type: RECEIVE_FRIEND_REQUESTS,
  friendRequests: data,
  friendRequestsCount: total,
  friendRequestsCountPerPage: perPage,
  friendRequestsCurrentPage: +currentPage,
  canPaginateFriendRequests: !!nextPageUrl,
  replaceFriendRequests,
});

const requestFriendRemoval = (id, isCancelingFriendRequest) => ({
  type: REQUEST_FRIEND_REMOVAL,
  friendIdBeingRemoved: id,
  isCancelingFriendRequest,
});

const handleFriendRemoval = (id, isCancelingFriendRequest) => ({
  type: HANDLE_FRIEND_REMOVAL,
  removedFriendId: id,
  isCancelingFriendRequest,
});

const acceptFriendRequestStart = id => ({
  type: ACCEPT_FRIEND_REQUEST,
  friendIdBeingAccepted: id,
});

const acceptFriendRequestSuccess = user => ({
  type: ACCEPT_FRIEND_REQUEST_SUCCESS,
  acceptedFriend: user,
});

const rejectFriendRequestStart = id => ({
  type: REJECT_FRIEND_REQUEST,
  friendIdBeingRejected: id,
});

const rejectFriendRequestSuccess = id => ({
  type: REJECT_FRIEND_REQUEST_SUCCESS,
  rejectedFriendId: id,
});

const requestSidebarData = { type: REQUEST_FITBOOK_SIDEBAR_DATA };

const receiveSidebarData = ({ acceptedFitbookUsage, ...sidebarData }) => ({
  type: RECEIVE_FITBOOK_SIDEBAR_DATA,
  isUsageAccepted: acceptedFitbookUsage,
  sidebarData,
});

const acceptFitbookUsageStart = { type: ACCEPT_FITBOOK_USAGE };

const acceptFitbookUsageSuccess = { type: ACCEPT_FITBOOK_USAGE_SUCCESS };

const requestPinnedPostLike = { type: REQUEST_PINNED_POST_LIKE };

const handlePinnedPostLike = { type: HANDLE_PINNED_POST_LIKE };

const requestPinnedPostUnlike = { type: REQUEST_PINNED_POST_UNLIKE };

const handlePinnedPostUnlike = { type: HANDLE_PINNED_POST_UNLIKE };

const requestPostLike = id => ({
  type: REQUEST_FITBOOK_POST_LIKE,
  postIdUpdatingLike: id,
});

const handlePostLike = id => ({
  type: HANDLE_FITBOOK_POST_LIKE,
  postIdUpdatedLike: id,
});

const requestPostUnlike = id => ({
  type: REQUEST_FITBOOK_POST_UNLIKE,
  postIdUpdatingLike: id,
});

const handlePostUnlike = id => ({
  type: HANDLE_FITBOOK_POST_UNLIKE,
  postIdUpdatedLike: id,
});

const requestPosts = (type = 'all') => ({ type: `REQUEST_${type.toUpperCase()}_FITBOOK_POSTS` });

const receivePosts = (
  type = 'all',
  {
    data, total, perPage, currentPage, nextPageUrl,
  },
  replace = true,
) => ({
  type: `RECEIVE_${type.toUpperCase()}_FITBOOK_POSTS`,
  [`${type}Posts`]: {
    items: data,
    itemsCount: total,
    itemsCountPerPage: +perPage,
    itemsCurrentPage: +currentPage,
    canPaginateItems: !!nextPageUrl,
    replace,
  },
});

const requestPostCreation = { type: REQUEST_POST_CREATION };

const handlePostCreation = ({ postData }) => ({
  type: HANDLE_POST_CREATION,
  createdPost: postData,
});

const requestPostUpdate = id => ({
  type: REQUEST_POST_UPDATE,
  postIdBeingUpdated: id,
});

const handlePostUpdate = (id, content) => ({
  type: HANDLE_POST_UPDATE,
  updatedPostId: id,
  updatedPostContent: content,
});

const requestPostRemoval = id => ({
  type: REQUEST_POST_REMOVAL,
  postIdBeingRemoved: id,
});

const handlePostRemoval = id => ({
  type: HANDLE_POST_REMOVAL,
  removedPostId: id,
});

const requestPostPin = id => ({
  type: REQUEST_POST_PIN,
  postIdUpdatingPinnedState: id,
});

const handlePostPin = pinnedPost => ({
  type: HANDLE_POST_PIN,
  pinnedPost,
});

const requestPostUnpin = id => ({
  type: REQUEST_POST_UNPIN,
  postIdUpdatingPinnedState: id,
});

const handlePostUnpin = { type: HANDLE_POST_UNPIN };

const requestProfileData = { type: REQUEST_PROFILE_DATA };

const receiveProfileData = profileData => ({
  type: RECEIVE_PROFILE_DATA,
  profileData,
});

const requestStats = { type: REQUEST_FITBOOK_STATS };

const receiveStats = stats => ({
  type: RECEIVE_FITBOOK_STATS,
  stats,
});

const requestChats = { type: REQUEST_FITBOOK_CHATS };

const receiveChats = ({
  data, total, perPage, currentPage, nextPageUrl,
}, replaceChats) => ({
  type: RECEIVE_FITBOOK_CHATS,
  chats: data,
  chatsCount: total,
  chatsCountPerPage: perPage,
  chatsCurrentPage: +currentPage,
  canPaginateChats: !!nextPageUrl,
  replaceChats,
});

const requestChat = { type: REQUEST_FITBOOK_CHAT };

const receiveChat = ({
  data,
  total,
  perPage,
  currentPage,
  nextPageUrl,
  customData: {
    id,
    name,
    users,
    type,
    owner,
  },
}, replaceChatMessages) => ({
  type: RECEIVE_FITBOOK_CHAT,
  chatId: id,
  chatName: name,
  chatUsers: users,
  chatType: type,
  isChatOwner: !!owner,
  chatMessages: data,
  chatMessagesCount: total,
  chatMessagesCountPerPage: perPage,
  chatMessagesCurrentPage: +currentPage,
  canPaginateChatMessages: !!nextPageUrl,
  replaceChatMessages,
});

const addChatMessageStart = id => ({
  type: ADD_CHAT_MESSAGE_START,
  chatIdAddingMessage: id,
});

const updateChatNameStart = id => ({
  type: UPDATE_CHAT_NAME_START,
  chatIdUpdatingName: +id,
});

const updateChatNameSuccess = (id, name) => ({
  type: UPDATE_CHAT_NAME_SUCCESS,
  chatIdUpdatedName: +id,
  newChatName: name,
});

const updateChatUsersStart = id => ({
  type: UPDATE_CHAT_USERS_START,
  chatIdUpdatingUsers: +id,
});

const updateChatUsersSuccess = (id, users) => ({
  type: UPDATE_CHAT_USERS_SUCCESS,
  chatIdUpdatedUsers: +id,
  newChatUsers: users,
});

const createSingleChatStart = { type: CREATE_SINGLE_CHAT_START };

const createSingleChatSuccess = { type: CREATE_SINGLE_CHAT_SUCCESS };

const createGroupChatStart = () => ({ type: CREATE_GROUP_CHAT_START });

export const getFriends = (replace, page, order) => dispatch => {
  dispatch(requestFriends);

  return fetchFriends(page, 'friends', order)
    .then(({ data }) => dispatch(receiveFriends(camalizeKeys(data), replace)))
    .catch(handleError);
};

export const sendFriendRequest = userId => dispatch => {
  dispatch(addFriendStart(userId));

  return addFriend(userId)
    .then(() => dispatch(addFriendSuccess(userId)))
    .catch(handleError);
};

export const getRequestedFriends = () => dispatch => fetchFriends(1, 'requested')
  .then(({ data }) => dispatch(receiveRequestedFriends(camalizeKeys(data))))
  .catch(handleError);

export const getFriendsSearchResults = term => dispatch => {
  dispatch(requestFriendsSearchResults);

  return searchFriends(term)
    .then(({ data }) => dispatch(receiveFriendsSearchResults(camalizeKeys(data))))
    .catch(handleError);
};

export const getFriendRequests = (replace, page, order) => dispatch => {
  dispatch(requestFriendRequests);

  return fetchFriends(page, 'requests', order)
    .then(({ data }) => dispatch(receiveFriendRequests(camalizeKeys(data), replace)))
    .catch(handleError);
};

export const removeFriend = (id, isFriendRequest) => dispatch => {
  dispatch(requestFriendRemoval(id, isFriendRequest));

  return deleteFriend(id)
    .then(() => dispatch(handleFriendRemoval(id, isFriendRequest)))
    .catch(handleError);
};

export const acceptFriendRequest = id => dispatch => {
  dispatch(acceptFriendRequestStart(id));

  return confirmFriendRequest(id)
    .then(({ data: { user } }) => dispatch(acceptFriendRequestSuccess(camalizeKeys(user))))
    .catch(handleError);
};

export const rejectFriendRequest = id => dispatch => {
  dispatch(rejectFriendRequestStart(id));

  return denyFriendRequest(id)
    .then(() => dispatch(rejectFriendRequestSuccess(id)))
    .catch(handleError);
};

export const getSidebarData = () => dispatch => {
  dispatch(requestSidebarData);

  return fetchSidebarData()
    .then(({ data }) => dispatch(receiveSidebarData(camalizeKeys(data))))
    .catch(handleError);
};

export const acceptFitbookUsage = () => dispatch => {
  dispatch(acceptFitbookUsageStart);

  return confirmUsage()
    .then(() => dispatch(acceptFitbookUsageSuccess))
    .catch(handleError);
};

export const likePinnedPost = id => dispatch => {
  dispatch(requestPinnedPostLike);

  return like('post', id)
    .then(() => dispatch(handlePinnedPostLike))
    .catch(handleError);
};

export const unlikePinnedPost = id => dispatch => {
  dispatch(requestPinnedPostUnlike);

  return unlike('post', id)
    .then(() => dispatch(handlePinnedPostUnlike))
    .catch(handleError);
};

export const likePost = id => dispatch => {
  dispatch(requestPostLike(id));

  return like('post', id)
    .then(() => dispatch(handlePostLike(id)))
    .catch(handleError);
};

export const unlikePost = id => dispatch => {
  dispatch(requestPostUnlike(id));

  return unlike('post', id)
    .then(() => dispatch(handlePostUnlike(id)))
    .catch(handleError);
};

export const getPosts = (page, type, replace) => dispatch => {
  dispatch(requestPosts(type));

  return fetchPosts(page, type)
    .then(({ data }) => dispatch(receivePosts(type, camalizeKeys(data), replace)))
    .catch(handleError);
};

export const createFitbookPost = (content, sharedWith, files) => dispatch => {
  dispatch(requestPostCreation);

  return createPost(content, sharedWith, files)
    .then(({ data }) => dispatch(handlePostCreation(camalizeKeys(data))))
    .catch(handleError);
};

export const updateFitbookPost = (id, content) => dispatch => {
  dispatch(requestPostUpdate(id));

  return updatePost(id, content)
    .then(() => dispatch(handlePostUpdate(id, content)))
    .catch(handleError);
};

export const removeFitbookPost = id => dispatch => {
  dispatch(requestPostRemoval(id));

  return removePost(id)
    .then(() => dispatch(handlePostRemoval(id)))
    .catch(handleError);
};

export const pinFitbooPost = id => dispatch => {
  dispatch(requestPostPin(id));

  return pinPost(id)
    .then(({ data: { post } }) => dispatch(handlePostPin(camalizeKeys(post))))
    .catch(handleError);
};

export const unpinFitbooPost = id => dispatch => {
  dispatch(requestPostUnpin(id));

  return pinPost(0)
    .then(() => dispatch(handlePostUnpin))
    .catch(handleError);
};

export const getProfileData = userId => dispatch => {
  dispatch(requestProfileData);

  return fetchProfileData(userId)
    .then(({ data }) => dispatch(receiveProfileData(camalizeKeys(data))))
    .catch(handleError);
};

export const getFitbookStats = () => dispatch => {
  dispatch(requestStats);

  return fetchStats()
    .then(({ data }) => dispatch(receiveStats(camalizeKeys(data))))
    .catch(handleError);
};

export const getFitbookChats = (page, replace) => dispatch => {
  dispatch(requestChats);

  return fetchChats(page)
    .then(({ data }) => dispatch(receiveChats(camalizeKeys(data), replace)))
    .catch(handleError);
};

export const getFitbookChat = (id, page, replace) => dispatch => {
  dispatch(requestChat);

  return fetchChat(id, page)
    .then(({ data }) => dispatch(receiveChat(camalizeKeys(data), replace)))
    .catch(handleError);
};

export const sendChatMessage = (id, content) => dispatch => {
  dispatch(addChatMessageStart(id));

  return addChatMessage(id, content)
    .then(() => window.location.reload())
    .catch(handleError);
};

export const updateChatName = (id, name, users) => dispatch => {
  dispatch(updateChatNameStart(id));

  return updateChat(id, name, users)
    .then(() => dispatch(updateChatNameSuccess(id, name)))
    .catch(handleError);
};

export const updateChatUsers = (id, users) => dispatch => {
  dispatch(updateChatUsersStart(id));

  const userIds = users.map(({ id: userId }) => userId);

  return updateChat(id, null, userIds)
    .then(() => dispatch(updateChatUsersSuccess(id, users)))
    .catch(handleError);
};

export const addSingleChat = userId => dispatch => {
  dispatch(createSingleChatStart);

  return createSingleChat(userId)
    .then(() => dispatch(createSingleChatSuccess))
    .catch(handleError);
};

export const addGroupChat = (users, name) => dispatch => {
  dispatch(createGroupChatStart);

  return createGroupChat(users, name)
    .then(({ data: { id } }) => {
      window.location.href = `${getCurrentPath()}/${id}`;
    })
    .catch(handleError);
};
