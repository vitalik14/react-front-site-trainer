import { connect } from 'react-redux';

import { createComment } from '../../../actions/comments';
import CommentsForm from './CommentsForm';

const mapStateToProps = (
  { user: { currentUser, isFetchingCurrentUser }, comments },
  { entityType, entityItemId },
) => ({
  isCreating: comments[entityType][entityItemId]
    ? comments[entityType][entityItemId].isCreating
    : false,
  currentUser,
  isFetchingCurrentUser,
});

const mapDispatchToProps = (dispatch, { entityType, entityItemId }) => ({
  create: content => dispatch(createComment(entityType, entityItemId, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);
