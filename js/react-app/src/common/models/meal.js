import { PropTypes } from 'prop-types';

import banners from './banners';

const shortMeal = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  nutrients: PropTypes.shape({
    kcal: PropTypes.number,
    carbs: PropTypes.number,
    protein: PropTypes.number,
    fat: PropTypes.number,
  }),
  banners,
  types: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.shape({
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

export const fullMeal = PropTypes.shape({
  ...shortMeal,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      unit: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  preparation: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      banners,
      recipesCount: PropTypes.number,
    }),
  ).isRequired,
  isFav: PropTypes.bool.isRequired,
});

export default shortMeal;
