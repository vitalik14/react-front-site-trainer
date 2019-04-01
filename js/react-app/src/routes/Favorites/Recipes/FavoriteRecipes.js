import React from 'react';
import { PropTypes } from 'prop-types';

import RecipeGridItem from '../../../common/components/GridItems/Meal/MealGridItem';
import styles from '../Favorites.scss';
import meal from '../../../common/models/meal';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';

const FavoriteRecipes = ({
  baseDomain,
  data: { isFetching, items },
}) => (
  <div>
    {isFetching && <Loader />}
    {(!isFetching && !items.length) && (
      <h1 className={styles.noDataTitle}>Du hast noch keine Videos favorisiert.</h1>
    )}
    {(!isFetching && !!items.length) && (
      <div className={styles.gridCont}>
        {
          items.map(({
            entity: {
              id,
              name,
              nutrients: {
                kcal,
                carbs,
                protein,
                fat,
              },
              types,
              banners: { default: thumbnailUrl },
            },
            fav: {
              id: favId,
              data: { note: favNote },
            },
          }) => (
            <div key={id} className={styles.gridItem}>
              <RecipeGridItem
                baseDomain={baseDomain}
                id={id}
                name={name}
                thumbnailUrl={thumbnailUrl}
                kcal={kcal}
                carbs={carbs}
                protein={protein}
                fat={fat}
                typeIds={types}
                showSwapIcon={false}
                favId={favId}
                favNote={favNote}
                isFav
              />
            </div>
          ))
        }
      </div>
    )
    }
  </div>
);

FavoriteRecipes.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  data: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(meal),
    count: PropTypes.number,
    countPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    canPaginate: PropTypes.bool,
  }).isRequired,
};

export default FavoriteRecipes;
