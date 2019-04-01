import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  date: PropTypes.string,
  duration: PropTypes.number,
  kcal: PropTypes.number,
  level: PropTypes.number,
  description: PropTypes.string,
  meta: PropTypes.shape({
    bodyParts: PropTypes.arrayOf(PropTypes.string),
    age: PropTypes.arrayOf(PropTypes.string),
    isFavorite: PropTypes.bool,
    favorite: PropTypes.shape({
      id: PropTypes.number,
      data: PropTypes.shape({
        note: PropTypes.string,
        difficulty: PropTypes.number,
      }),
    }),
  }),
  course: PropTypes.object,
  trainer: PropTypes.object,
  views: PropTypes.number,
  likes: PropTypes.number,
});
