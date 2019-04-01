import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import {
  getPosts,
  getSidebarData,
  acceptFitbookUsage,
  likePost,
  unlikePost,
  updateFitbookPost,
  removeFitbookPost,
  pinFitbooPost,
  unpinFitbooPost,
} from '../../common/actions/fitbook';
import FitBook from './FitBook';

const mapStateToProps = (
  {
    fitbook: {
      isUsageAccepted,
      isUsageBeingAccepted,
      isFetchingSidebarData,
      sidebarData,
      posts: {
        all: allPosts,
        vidcomments: vidcommentsPosts,
        friends: friendsPosts,
        trainer: trainerPosts,
      },
      postIdsUpdatingLike,
      postIdsBeingUpdated,
      postIdsBeingRemoved,
      postIdUpdatingPinnedState,
    },
    user: { currentUser: { type: currentUserType = 'user' } },
  },
) => ({
  isUsageAccepted,
  isUsageBeingAccepted,
  isFetchingSidebarData,
  sidebarData,
  allPosts,
  vidcommentsPosts,
  friendsPosts,
  trainerPosts,
  postIdsUpdatingLike,
  postIdsBeingUpdated,
  postIdsBeingRemoved,
  postIdUpdatingPinnedState,
  currentUserType,
});

const mapDispatchToProps = dispatch => ({
  acceptUsage: () => dispatch(acceptFitbookUsage()),
  loadPosts: (type, page, replace) => dispatch(getPosts(page, type, replace)),
  likePost: id => dispatch(likePost(id)),
  unlikePost: id => dispatch(unlikePost(id)),
  updatePost: (id, content) => dispatch(updateFitbookPost(id, content)),
  removePost: id => dispatch(removeFitbookPost(id)),
  pinPost: id => dispatch(pinFitbooPost(id)),
  unpinPost: id => dispatch(unpinFitbooPost(id)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount([() => getPosts(), getSidebarData])(FitBook));
