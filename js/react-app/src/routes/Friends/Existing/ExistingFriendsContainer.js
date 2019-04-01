import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getFriends, removeFriend } from '../../../common/actions/fitbook';
import ExistingFriends from './ExistingFriends';

const mapStateToProps = ({ fitbook: { friends } }) => friends;

const mapDispatchToProps = dispatch => ({
  loadMoreItems: page => dispatch(getFriends(false, page)),
  remove: id => dispatch(removeFriend(id)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(getFriends)(ExistingFriends));
