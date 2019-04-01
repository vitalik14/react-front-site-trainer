import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onComponentDidMount } from 'react-redux-lifecycle';

import {
  getFitbookChat,
  sendChatMessage,
  updateChatName,
  updateChatUsers,
} from '../../../common/actions/fitbook';
import SingleChat from './SingleChat';

const mapStateToProps = (
  {
    fitbook: {
      chatsData,
      isFetchingChatData,
      chatIdUpdatingName,
      chatIdUpdatingUsers,
    },
    user: {
      isFetchingCurrentUser,
      currentUser,
    },
  },
  { match: { params: { id } } },
) => ({
  data: (id && chatsData[id]) || {},
  chatIdUpdatingName,
  chatIdUpdatingUsers,
  isFetchingChatData,
  isFetchingCurrentUser,
  currentUser,
});

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
  loadMessages: (page, replace) => dispatch(getFitbookChat(id, page, replace)),
  addMessage: content => dispatch(sendChatMessage(id, content)),
  updateName: (name, users) => dispatch(updateChatName(id, name, users)),
  updateUsers: users => dispatch(updateChatUsers(id, users)),
});

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(({ match: { params: { id } } }) => getFitbookChat(id))(SingleChat)));
