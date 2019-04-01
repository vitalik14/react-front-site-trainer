import { connect } from 'react-redux';

import {
  getFriendsSearchResults,
  sendFriendRequest,
  removeFriend,
  acceptFriendRequest,
  rejectFriendRequest,
} from '../../../common/actions/fitbook';
import FriendsSearch from './FriendsSearch';

const mapStateToProps = ({
  fitbook: {
    isFetchingFriendsSearchResults,
    friendsSearchResults,
    friendBeingAddedId,
    friends: {
      itemIdBeingRemoved: friendIdBeingRemoved,
      friendIdRequestBeingCancelled,
    },
    friendRequests: {
      friendIdBeingAccepted,
      friendIdBeingRejected,
    },
  },
}) => ({
  isFetchingFriendsSearchResults,
  friendsSearchResults,
  friendBeingAddedId,
  friendIdBeingRemoved,
  friendIdRequestBeingCancelled,
  friendIdBeingAccepted,
  friendIdBeingRejected,
});

const mapDispatchToProps = dispatch => ({
  loadSearchResults: term => dispatch(getFriendsSearchResults(term)),
  sendFriendRequest: userId => dispatch(sendFriendRequest(userId)),
  removeFriend: (userId, isFriendRequest) => dispatch(removeFriend(userId, isFriendRequest)),
  acceptFriendRequest: userId => dispatch(acceptFriendRequest(userId)),
  rejectFriendRequest: userId => dispatch(rejectFriendRequest(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSearch);
