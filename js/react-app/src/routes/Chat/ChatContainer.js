import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getFriends } from '../../common/actions/fitbook';
import Chat from './Chat';

const mapStateToProps = ({ fitbook: { friends } }) => ({ friends });

const mapDispatchToProps = dispatch => ({
  loadMoreFriends: page => dispatch(getFriends(page, false)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(() => getFriends())(Chat));
