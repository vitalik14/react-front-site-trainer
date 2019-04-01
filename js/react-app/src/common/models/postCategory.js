import { PropTypes } from 'prop-types';

import banners from './banners';

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  banners,
  settings: PropTypes.shape({
    artcount: PropTypes.string,
    catcount: PropTypes.string,
    redirect: PropTypes.string,
    parents: PropTypes.arrayOf(PropTypes.number),
    subCategoryCount: PropTypes.number,
    postsCount: PropTypes.number,
  }),
});
