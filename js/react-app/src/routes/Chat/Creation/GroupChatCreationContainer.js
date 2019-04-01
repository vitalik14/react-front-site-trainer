import { connect } from 'react-redux';

import { addGroupChat } from '../../../common/actions/fitbook';
import GroupChatCreation from './GroupChatCreation';

const mapStateToProps = ({ fitbook: { isCreatingGroupChat } }) => ({
  loading: isCreatingGroupChat,
});

const mapDispatchToProps = dispatch => ({
  create: (users, name) => dispatch(addGroupChat(users, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatCreation);
