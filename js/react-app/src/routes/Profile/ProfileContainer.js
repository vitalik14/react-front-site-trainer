import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import {
  getProfileData,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  removeFriend,
} from '../../common/actions/fitbook';
import Profile from './Profile';

const getData = ({ userId }) => getProfileData(userId);

const mapStateToProps = ({
  user: { currentUser: { id: currentUserId } },
  fitbook: {
    isFetchingProfileData,
    profileData,
    friendBeingAddedId,
    friendRequests: {
      friendIdBeingAccepted,
      friendIdBeingRejected,
    },
    friends: {
      itemIdBeingRemoved,
    },
  },
}) => ({
  currentUserId,
  loading: isFetchingProfileData,
  data: profileData,
  adding: !!friendBeingAddedId,
  accepting: !!friendIdBeingAccepted,
  rejecting: !!friendIdBeingRejected,
  removing: !!itemIdBeingRemoved,
});

const mapDispatchToProps = (dispatch, { userId }) => ({
  acceptFriendRequest: () => dispatch(acceptFriendRequest(userId)),
  rejectFriendRequest: () => dispatch(rejectFriendRequest(userId)),
  sendFriendRequest: () => dispatch(sendFriendRequest(userId)),
  removeFriend: () => dispatch(removeFriend(userId)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(getData)(Profile));
