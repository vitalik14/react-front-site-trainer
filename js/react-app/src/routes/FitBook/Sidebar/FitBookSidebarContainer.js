import { connect } from 'react-redux';

import { likePinnedPost, unlikePinnedPost } from '../../../common/actions/fitbook';
import FitBookSidebar from './FitBookSidebar';

const mapStateToProps = (
  { fitbook: { isPinnedPostUpdatingLike } },
  { pinnedPost },
) => ({
  isPinnedPostUpdatingLike,
  pinnedPost,
});

const mapDispatchToProps = (dispatch, { pinnedPost }) => ({
  likePost: () => dispatch(likePinnedPost(pinnedPost.id)),
  unlikePost: () => dispatch(unlikePinnedPost(pinnedPost.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FitBookSidebar);
