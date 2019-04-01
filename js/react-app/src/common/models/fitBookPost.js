import { PropTypes } from 'prop-types';

import user from './user';

export default PropTypes.shape({
  id: PropTypes.number,
  author: PropTypes.oneOfType([user, PropTypes.array]),
  content: PropTypes.string,
  contentElement: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  meta: PropTypes.shape({
    commentedByTeam: PropTypes.bool,
    comments: PropTypes.number,
    edits: PropTypes.number,
    isLiked: PropTypes.bool,
    isPostAuthor: PropTypes.bool,
    likes: PropTypes.number,
    sharedWith: PropTypes.string,
  }),
});
