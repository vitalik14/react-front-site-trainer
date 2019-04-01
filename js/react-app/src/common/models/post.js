import { PropTypes } from 'prop-types';

import banners from './banners';
import category from './postCategory';
import user from './user';

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  date: PropTypes.string,
  lastUpdate: PropTypes.string,
  excerpt: PropTypes.string,
  banners,
  tags: PropTypes.arrayOf(PropTypes.string),
  category,
  author: user,
  metadata: PropTypes.shape({
    hasVideo: PropTypes.bool,
    isPublished: PropTypes.bool,
    commentsCount: PropTypes.number,
    accessible: PropTypes.bool,
    isFavorite: PropTypes.bool,
    favorite: PropTypes.shape({
      id: PropTypes.number,
      data: PropTypes.shape({
        note: PropTypes.string,
        difficulty: PropTypes.number,
      }),
    }),
  }),
});
