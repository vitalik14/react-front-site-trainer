import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getFitbookChats } from '../../../common/actions/fitbook';
import AllChats from './AllChats';

const mapStateToProps = ({
  user: {
    isFetchingCurrentUser,
    currentUser,
  },
  fitbook: { chats },
}) => ({
  chats,
  isFetchingCurrentUser,
  currentUser,
});

const mapDispatchToProps = dispatch => ({
  loadMoreChats: page => dispatch(getFitbookChats(page, false)),
});

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(() => getFitbookChats())(AllChats)));
