import { connect } from 'react-redux';

import { getComments, updateComment, deleteComment } from '../../../actions/comments';
import CommentsList from './CommentsList';

const mapStateToProps = (
  { comments },
  { entityType, entityItemId },
) => comments[entityType][entityItemId] || {};

const mapDispatchToProps = (dispatch, { entityType, entityItemId }) => ({
  loadItems: (page, replace) => dispatch(getComments(entityType, entityItemId, replace, page)),
  update: (commentId, content) => dispatch(
    updateComment(entityType, entityItemId, commentId, content),
  ),
  remove: id => dispatch(deleteComment(id, entityType, entityItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
