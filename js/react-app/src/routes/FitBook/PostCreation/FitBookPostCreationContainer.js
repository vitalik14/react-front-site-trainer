import { connect } from 'react-redux';

import { createFitbookPost } from '../../../common/actions/fitbook';
import FitBookPostCreation from './FitBookPostCreation';

const mapStateToProps = ({
  user: { isFetchingCurrentUser, currentUser: { type = 'user', profilePicUrl = '' } },
  fitbook: { isCreatingPost },
}) => ({
  loading: isCreatingPost,
  avatarURL: profilePicUrl,
  userType: type,
  isFetchingCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  create: (content, sharedWith, files) => dispatch(createFitbookPost(content, sharedWith, files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FitBookPostCreation);
