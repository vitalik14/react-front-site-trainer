import { PropTypes } from 'prop-types';

import banners from './banners';

export const partialCourse = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  slug: PropTypes.string,
});

export const fullCourse = PropTypes.shape({
  ...partialCourse,
  videos: PropTypes.number,
  kcal: PropTypes.number,
  tools: PropTypes.string,
  banners,
  descriptions: PropTypes.shape({
    short: PropTypes.string,
    full: PropTypes.string,
  }),
  isSuperCourse: PropTypes.bool,
  subCourses: PropTypes.arrayOf(PropTypes.number),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
});
