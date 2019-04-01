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
  REQUEST_PINNED_POST_LIKE,
  HANDLE_PINNED_POST_LIKE,
  REQUEST_PINNED_POST_UNLIKE,
  HANDLE_PINNED_POST_UNLIKE,
  REQUEST_FITBOOK_POST_LIKE,
  HANDLE_FITBOOK_POST_LIKE,
  REQUEST_FITBOOK_POST_UNLIKE,
  HANDLE_FITBOOK_POST_UNLIKE,
  REQUEST_ALL_FITBOOK_POSTS,
  RECEIVE_ALL_FITBOOK_POSTS,
  REQUEST_VIDCOMMENTS_FITBOOK_POSTS,
  RECEIVE_VIDCOMMENTS_FITBOOK_POSTS,
  REQUEST_FRIENDS_FITBOOK_POSTS,
  RECEIVE_FRIENDS_FITBOOK_POSTS,
  REQUEST_TRAINER_FITBOOK_POSTS,
  RECEIVE_TRAINER_FITBOOK_POSTS,
  HANDLE_COMMENT_CREATION,
  HANDLE_COMMENT_DELETION,
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
} from '../actions/actionsTypes';

const initialSubState = {
  isFetching: false,
  hasFetchedAtLeastOnce: false,
  items: [],
  itemsCount: 0,
  itemsCountPerPage: 0,
  itemsCurrentPage: 0,
  canPaginateItems: false,
};

const friendsInitialState = {
  ...initialSubState,
  itemIdBeingRemoved: null,
  friendIdRequestBeingCancelled: null,
};

const initialState = {
  friends: friendsInitialState,
  friendsSearchResults: null,
  isFetchingFriendsSearchResults: false,
  friendBeingAddedId: null,
  requestedFriendIds: [],
  friendRequests: {
    ...friendsInitialState,
    friendIdBeingAccepted: null,
    friendIdBeingRejected: null,
  },
  isFetchingSidebarData: false,
  sidebarData: {},
  isPinnedPostUpdatingLike: false,
  isUsageBeingAccepted: false,
  isUsageAccepted: true,
  postIdsUpdatingLike: [],
  posts: {
    all: initialSubState,
    vidcomments: initialSubState,
    friends: initialSubState,
    trainer: initialSubState,
  },
  isCreatingPost: false,
  postIdsBeingUpdated: [],
  postIdsBeingRemoved: [],
  postIdUpdatingPinnedState: null,
  isFetchingProfileData: false,
  profileData: {},
  isFetchingStats: false,
  stats: {},
  chats: initialSubState,
  chatsData: {},
  isFetchingChatData: false,
  chatIdUpdatingName: null,
  chatIdUpdatingUsers: null,
  isCreatingGroupChat: false,
};

export default (
  state = initialState,
  {
    type,
    friends,
    friendsCount,
    friendsCountPerPage,
    friendsCurrentPage,
    canPaginateFriends = true,
    replaceFriends,
    friendsSearchResults,
    requestedFriends,
    friendBeingAddedId,
    addedFriendId,
    friendRequests,
    friendRequestsCount,
    friendRequestsCountPerPage,
    friendRequestsCurrentPage,
    canPaginateFriendRequests,
    replaceFriendRequests = true,
    friendIdBeingRemoved,
    removedFriendId,
    friendIdBeingAccepted,
    acceptedFriend,
    friendIdBeingRejected,
    rejectedFriendId,
    isCancelingFriendRequest,
    sidebarData,
    isUsageAccepted,
    allPosts,
    vidcommentsPosts,
    friendsPosts,
    trainerPosts,
    entityType,
    entityItemId,
    postIdUpdatingLike,
    postIdUpdatedLike,
    createdPost,
    postIdBeingUpdated,
    postIdBeingRemoved,
    updatedPostId,
    updatedPostContent,
    removedPostId,
    postIdUpdatingPinnedState,
    pinnedPost,
    profileData,
    stats,
    chats,
    chatsCount,
    chatsCountPerPage,
    chatsCurrentPage,
    canPaginateChats,
    replaceChats = true,
    chatMessages,
    chatMessagesCount,
    chatMessagesCountPerPage,
    chatMessagesCurrentPage,
    canPaginateChatMessages,
    chatId,
    chatName,
    chatUsers,
    chatType,
    isChatOwner,
    replaceChatMessages = true,
    chatIdAddingMessage,
    chatIdUpdatingName,
    chatIdUpdatedName,
    newChatName,
    chatIdUpdatingUsers,
    chatIdUpdatedUsers,
    newChatUsers,
  },
) => {
  switch (type) {
    case REQUEST_FRIENDS:
      return {
        ...state,
        friends: {
          ...state.friends,
          isFetching: true,
        },
      };
    case RECEIVE_FRIENDS:
      return {
        ...state,
        friends: {
          items: replaceFriends
            ? friends
            : state.friends.items.concat(friends),
          itemsCount: friendsCount,
          itemsCountPerPage: friendsCountPerPage,
          itemsCurrentPage: friendsCurrentPage,
          canPaginateItems: canPaginateFriends,
          isFetching: false,
          hasFetchedAtLeastOnce: true,
        },
      };
    case REQUEST_FRIENDS_SEARCH_RESULTS:
      return {
        ...state,
        isFetchingFriendsSearchResults: true,
      };
    case RECEIVE_FRIENDS_SEARCH_RESULTS:
      return {
        ...state,
        friendsSearchResults,
        isFetchingFriendsSearchResults: false,
      };
    case RECEIVE_REQUESTED_FRIENDS:
      return {
        ...state,
        requestedFriendIds: requestedFriends.map(({ user: { id } }) => id),
      };
    case ADD_FRIEND_START:
      return {
        ...state,
        friendBeingAddedId,
      };
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        requestedFriendIds: state.requestedFriendIds.concat(addedFriendId),
        friendBeingAddedId: null,
        profileData: Object.keys(state.profileData).length
          ? {
            ...state.profileData,
            friendship: {
              ...state.profileData.friendship,
              type: 'requested',
            },
          }
          : {},
        friendsSearchResults: state.friendsSearchResults.length
          ? state.friendsSearchResults.map(friend => {
            if (friend.id === addedFriendId) {
              return { ...friend, friendship: 'requested' };
            }
            return friend;
          })
          : [],
      };
    case REQUEST_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          isFetching: true,
        },
      };
    case RECEIVE_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: {
          items: replaceFriendRequests
            ? friendRequests
            : state.friendRequests.items.concat(friendRequests),
          itemsCount: friendRequestsCount,
          itemsCountPerPage: friendRequestsCountPerPage,
          itemsCurrentPage: friendRequestsCurrentPage,
          canPaginateItems: canPaginateFriendRequests,
          isFetching: false,
          hasFetchedAtLeastOnce: true,
        },
      };
    case REQUEST_FRIEND_REMOVAL:
      return {
        ...state,
        friends: isCancelingFriendRequest
          ? {
            ...state.friends,
            friendIdRequestBeingCancelled: friendIdBeingRemoved,
          }
          : {
            ...state.friends,
            itemIdBeingRemoved: friendIdBeingRemoved,
          },
      };
    case HANDLE_FRIEND_REMOVAL:
      return {
        ...state,
        friends: isCancelingFriendRequest
          ? {
            ...state.friends,
            friendIdRequestBeingCancelled: null,
          }
          : {
            ...state.friends,
            items: state.friends.items.filter(({ user: { id } }) => id !== removedFriendId),
            itemsCount: state.friends.itemsCount - 1,
            itemIdBeingRemoved: null,
          },
        requestedFriendIds: isCancelingFriendRequest
          ? state.requestedFriendIds.filter(id => id !== removedFriendId)
          : state.requestedFriendIds,
        profileData: Object.keys(state.profileData).length
          ? {
            ...state.profileData,
            friendship: {
              ...state.profileData.friendship,
              type: false,
            },
          }
          : {},
        friendsSearchResults: state.friendsSearchResults.length
          ? state.friendsSearchResults.map(friend => {
            if (friend.id === removedFriendId) {
              return { ...friend, friendship: false };
            }
            return friend;
          })
          : [],
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          friendIdBeingAccepted,
        },
      };
    case ACCEPT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          items: state.friendRequests.items
            .filter(({ user: { id } }) => id !== acceptedFriend.id),
          itemsCount: state.friendRequests.itemsCount - 1,
          friendIdBeingAccepted: null,
        },
        friends: {
          ...state.friends,
          items: [{ user: acceptedFriend, friendsSince: new Date() }].concat(state.friends.items),
          itemsCount: state.friends.itemsCount + 1,
        },
        profileData: Object.keys(state.profileData).length
          ? {
            ...state.profileData,
            friendship: {
              ...state.profileData.friendship,
              type: true,
            },
          }
          : {},
        friendsSearchResults: state.friendsSearchResults.length
          ? state.friendsSearchResults.map(friend => {
            if (friend.id === acceptedFriend.id) {
              return { ...friend, friendship: true };
            }
            return friend;
          })
          : [],
      };
    case REJECT_FRIEND_REQUEST:
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          friendIdBeingRejected,
        },
      };
    case REJECT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          items: state.friendRequests.items.filter(({ user: { id } }) => id !== rejectedFriendId),
          itemsCount: state.friendRequests.itemsCount - 1,
          friendIdBeingRejected: null,
        },
        profileData: Object.keys(state.profileData).length
          ? {
            ...state.profileData,
            friendship: {
              ...state.profileData.friendship,
              type: false,
            },
          }
          : {},
        friendsSearchResults: state.friendsSearchResults.length
          ? state.friendsSearchResults.map(friend => {
            if (friend.id === rejectedFriendId) {
              return { ...friend, friendship: false };
            }
            return friend;
          })
          : [],
      };
    case REQUEST_FITBOOK_SIDEBAR_DATA:
      return {
        ...state,
        isFetchingSidebarData: true,
      };
    case RECEIVE_FITBOOK_SIDEBAR_DATA:
      return {
        ...state,
        sidebarData,
        isUsageAccepted,
        isFetchingSidebarData: false,
      };
    case ACCEPT_FITBOOK_USAGE:
      return {
        ...state,
        isUsageBeingAccepted: true,
      };
    case ACCEPT_FITBOOK_USAGE_SUCCESS:
      return {
        ...state,
        isUsageAccepted: true,
        isUsageBeingAccepted: false,
      };
    case REQUEST_PINNED_POST_LIKE:
      return {
        ...state,
        isPinnedPostUpdatingLike: true,
      };
    case HANDLE_PINNED_POST_LIKE:
      return {
        ...state,
        isPinnedPostUpdatingLike: false,
        sidebarData: {
          ...state.sidebarData,
          pinnedPost: {
            ...state.sidebarData.pinnedPost,
            meta: {
              ...state.sidebarData.pinnedPost.meta,
              isLiked: true,
              likes: state.sidebarData.pinnedPost.meta.likes + 1,
            },
          },
        },
      };
    case REQUEST_PINNED_POST_UNLIKE:
      return {
        ...state,
        isPinnedPostUpdatingLike: true,
      };
    case HANDLE_PINNED_POST_UNLIKE:
      return {
        ...state,
        isPinnedPostUpdatingLike: false,
        sidebarData: {
          ...state.sidebarData,
          pinnedPost: {
            ...state.sidebarData.pinnedPost,
            meta: {
              ...state.sidebarData.pinnedPost.meta,
              isLiked: false,
              likes: state.sidebarData.pinnedPost.meta.likes - 1,
            },
          },
        },
      };
    case REQUEST_ALL_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            isFetching: true,
          },
        },
      };
    case RECEIVE_ALL_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            ...allPosts,
            items: allPosts.replace
              ? allPosts.items
              : state.posts.all.items.concat(allPosts.items),
            isFetching: false,
            hasFetchedAtLeastOnce: true,
          },
        },
      };
    case REQUEST_VIDCOMMENTS_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          vidcomments: {
            ...state.posts.vidcomments,
            isFetching: true,
          },
        },
      };
    case RECEIVE_VIDCOMMENTS_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          vidcomments: {
            ...state.posts.vidcomments,
            ...vidcommentsPosts,
            items: vidcommentsPosts.replace
              ? vidcommentsPosts.items
              : state.posts.vidcomments.items.concat(vidcommentsPosts.items),
            isFetching: false,
            hasFetchedAtLeastOnce: true,
          },
        },
      };
    case REQUEST_FRIENDS_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          friends: {
            ...state.posts.friends,
            isFetching: true,
          },
        },
      };
    case RECEIVE_FRIENDS_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          friends: {
            ...state.posts.friends,
            ...friendsPosts,
            items: friendsPosts.replace
              ? friendsPosts.items
              : state.posts.friends.items.concat(friendsPosts.items),
            isFetching: false,
            hasFetchedAtLeastOnce: true,
          },
        },
      };
    case REQUEST_TRAINER_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          trainer: {
            ...state.posts.trainer,
            isFetching: true,
          },
        },
      };
    case RECEIVE_TRAINER_FITBOOK_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          trainer: {
            ...state.posts.trainer,
            ...trainerPosts,
            items: trainerPosts.replace
              ? trainerPosts.items
              : state.posts.trainer.items.concat(trainerPosts.items),
            isFetching: false,
            hasFetchedAtLeastOnce: true,
          },
        },
      };
    case HANDLE_COMMENT_CREATION:
      if (entityType === 'post') {
        return {
          ...state,
          posts: {
            ...state.posts,
            all: {
              ...state.posts.all,
              items: state.posts.all.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments + 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
            vidcomments: {
              ...state.posts.vidcomments,
              items: state.posts.vidcomments.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments + 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
            friends: {
              ...state.posts.friends,
              items: state.posts.friends.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments + 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
            trainer: {
              ...state.posts.trainer,
              items: state.posts.trainer.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments + 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
          },
        };
      }
      return state;
    case HANDLE_COMMENT_DELETION:
      if (entityType === 'post') {
        return {
          ...state,
          posts: {
            ...state.posts,
            all: {
              ...state.posts.all,
              items: state.posts.all.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments - 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
            vidcomments: {
              ...state.posts.vidcomments,
              items: state.posts.vidcomments.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments - 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
            friends: {
              ...state.posts.friends,
              items: state.posts.friends.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments - 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
            trainer: {
              ...state.posts.trainer,
              items: state.posts.trainer.items
                .map(({ id, meta, ...rest }) => {
                  if (id === entityItemId) {
                    return {
                      ...rest,
                      id,
                      meta: {
                        ...meta,
                        comments: meta.comments - 1,
                      },
                    };
                  }
                  return { id, meta, ...rest };
                }),
            },
          },
        };
      }
      return state;
    case REQUEST_FITBOOK_POST_LIKE:
      return {
        ...state,
        postIdsUpdatingLike: state.postIdsUpdatingLike.concat(postIdUpdatingLike),
      };
    case HANDLE_FITBOOK_POST_LIKE:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            items: state.posts.all.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: true,
                    likes: meta.likes + 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
          vidcomments: {
            ...state.posts.vidcomments,
            items: state.posts.vidcomments.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: true,
                    likes: meta.likes + 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
          friends: {
            ...state.posts.friends,
            items: state.posts.friends.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: true,
                    likes: meta.likes + 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
          trainer: {
            ...state.posts.trainer,
            items: state.posts.trainer.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: true,
                    likes: meta.likes + 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
        },
        postIdsUpdatingLike: state.postIdsUpdatingLike.filter(id => id !== postIdUpdatedLike),
      };
    case REQUEST_FITBOOK_POST_UNLIKE:
      return {
        ...state,
        postIdsUpdatingLike: state.postIdsUpdatingLike.concat(postIdUpdatingLike),
      };
    case HANDLE_FITBOOK_POST_UNLIKE:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            items: state.posts.all.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: false,
                    likes: meta.likes - 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
          vidcomments: {
            ...state.posts.vidcomments,
            items: state.posts.vidcomments.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: false,
                    likes: meta.likes - 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
          friends: {
            ...state.posts.friends,
            items: state.posts.friends.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: false,
                    likes: meta.likes - 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
          trainer: {
            ...state.posts.trainer,
            items: state.posts.trainer.items.map(({ id, meta, ...rest }) => {
              if (id === postIdUpdatedLike) {
                return {
                  ...rest,
                  id,
                  meta: {
                    ...meta,
                    isLiked: false,
                    likes: meta.likes - 1,
                  },
                };
              }
              return { id, meta, ...rest };
            }),
          },
        },
        postIdsUpdatingLike: state.postIdsUpdatingLike.filter(id => id !== postIdUpdatedLike),
      };
    case REQUEST_POST_CREATION:
      return {
        ...state,
        isCreatingPost: true,
      };
    case HANDLE_POST_CREATION:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            items: [createdPost].concat(state.posts.all.items),
            itemsCount: state.posts.all.itemsCount + 1,
          },
        },
        isCreatingPost: false,
      };
    case REQUEST_POST_UPDATE:
      return {
        ...state,
        postIdsBeingUpdated: state.postIdsBeingUpdated.concat(postIdBeingUpdated),
      };
    case HANDLE_POST_UPDATE:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            items: state.posts.all.items.map(({ id, content, ...rest }) => {
              if (id === updatedPostId) {
                return {
                  id,
                  content: updatedPostContent,
                  ...rest,
                };
              }
              return { id, content, ...rest };
            }),
          },
        },
        postIdsBeingUpdated: state.postIdsBeingUpdated.filter(id => id !== updatedPostId),
      };
    case REQUEST_POST_REMOVAL:
      return {
        ...state,
        postIdsBeingRemoved: state.postIdsBeingRemoved.concat(postIdBeingRemoved),
      };
    case HANDLE_POST_REMOVAL:
      return {
        ...state,
        posts: {
          ...state.posts,
          all: {
            ...state.posts.all,
            items: state.posts.all.items.filter(({ id }) => id !== removedPostId),
          },
        },
        postIdsBeingRemoved: state.postIdsBeingRemoved.filter(id => id !== removedPostId),
      };
    case REQUEST_POST_PIN:
    case REQUEST_POST_UNPIN:
      return {
        ...state,
        postIdUpdatingPinnedState,
      };
    case HANDLE_POST_PIN:
      return {
        ...state,
        postIdUpdatingPinnedState: null,
        sidebarData: {
          ...state.sidebarData,
          pinnedPost,
        },
      };
    case HANDLE_POST_UNPIN:
      return {
        ...state,
        postIdUpdatingPinnedState: null,
        sidebarData: {
          ...state.sidebarData,
          pinnedPost: null,
        },
      };
    case REQUEST_PROFILE_DATA:
      return {
        ...state,
        isFetchingProfileData: true,
      };
    case RECEIVE_PROFILE_DATA:
      return {
        ...state,
        profileData,
        isFetchingProfileData: false,
      };
    case REQUEST_FITBOOK_STATS:
      return {
        ...state,
        isFetchingStats: true,
      };
    case RECEIVE_FITBOOK_STATS:
      return {
        ...state,
        stats,
        isFetchingStats: false,
      };
    case REQUEST_FITBOOK_CHATS:
      return {
        ...state,
        chats: {
          ...state.chats,
          isFetching: true,
        },
      };
    case RECEIVE_FITBOOK_CHATS:
      return {
        ...state,
        chats: {
          items: replaceChats
            ? chats
            : state.chats.items.concat(chats),
          itemsCount: chatsCount,
          itemsCountPerPage: chatsCountPerPage,
          itemsCurrentPage: chatsCurrentPage,
          canPaginateItems: canPaginateChats,
          isFetching: false,
          hasFetchedAtLeastOnce: true,
        },
      };
    case REQUEST_FITBOOK_CHAT:
      return {
        ...state,
        chatsData: chatId
          ? {
            ...state.chatsData,
            [chatId]: {
              ...state.chatsData[chatId],
              isFetching: true,
            },
          }
          : state.chatsData,
        isFetchingChatData: true,
      };
    case RECEIVE_FITBOOK_CHAT:
      return {
        ...state,
        chatsData: {
          ...state.chatsData,
          [chatId]: {
            ...state.chatsData[chatId],
            id: chatId,
            name: chatName,
            users: chatUsers,
            type: chatType,
            isChatOwner,
            messages: replaceChatMessages
              ? chatMessages.reverse()
              : chatMessages.reverse().concat(state.chatsData[chatId].messages),
            messagesCount: chatMessagesCount,
            messagesCountPerPage: chatMessagesCountPerPage,
            messagesCurrentPage: chatMessagesCurrentPage,
            canPaginateMessages: canPaginateChatMessages,
            isFetching: false,
            hasFetchedAtLeastOnce: true,
          },
        },
        isFetchingChatData: false,
      };
    case ADD_CHAT_MESSAGE_START:
      return {
        ...state,
        chatsData: {
          ...state.chatsData,
          [chatIdAddingMessage]: {
            ...state.chatsData[chatIdAddingMessage],
            isAddingMessage: true,
          },
        },
      };
    case UPDATE_CHAT_NAME_START:
      return {
        ...state,
        chatIdUpdatingName,
      };
    case UPDATE_CHAT_NAME_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          items: state.chats.items.map(item => {
            if (item.id === chatIdUpdatedName) {
              return { ...item, name: newChatName };
            }
            return item;
          }),
        },
        chatsData: {
          ...state.chatsData,
          [chatIdUpdatedName]: {
            ...state.chatsData[chatIdUpdatedName],
            name: newChatName,
          },
        },
        chatIdUpdatingName: null,
      };
    case UPDATE_CHAT_USERS_START:
      return {
        ...state,
        chatIdUpdatingUsers,
      };
    case UPDATE_CHAT_USERS_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          items: state.chats.items.map(item => {
            if (item.id === chatIdUpdatedUsers) {
              return { ...item, users: newChatUsers };
            }
            return item;
          }),
        },
        chatsData: {
          ...state.chatsData,
          [chatIdUpdatedUsers]: {
            ...state.chatsData[chatIdUpdatedUsers],
            users: newChatUsers,
          },
        },
        chatIdUpdatingUsers: null,
      };
    case CREATE_SINGLE_CHAT_START: {
      return {
        ...state,
        isCreatingSingleChat: true,
      };
    }
    case CREATE_SINGLE_CHAT_SUCCESS: {
      return {
        ...state,
        isCreatingSingleChat: false,
      };
    }
    case CREATE_GROUP_CHAT_START: {
      return {
        ...state,
        isCreatingGroupChat: true,
      };
    }
    default:
      return state;
  }
};
