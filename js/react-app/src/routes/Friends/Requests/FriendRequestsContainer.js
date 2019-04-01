import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../../../common/actions/fitbook';
import FriendRequests from './FriendRequests';

const mapStateToProps = ({ fitbook: { friendRequests } }) => friendRequests;

const mapDispatchToProps = dispatch => ({
  loadMoreItems: page => dispatch(getFriendRequests(false, page)),
  accept: id => dispatch(acceptFriendRequest(id)),
  reject: id => dispatch(rejectFriendRequest(id)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(getFriendRequests)(FriendRequests));
