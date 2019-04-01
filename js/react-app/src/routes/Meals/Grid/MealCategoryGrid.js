import React from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import banners from '../../../common/models/banners';
import styles from './MealCategoryGrid.scss';

const MealCategoryGrid = ({
  baseDomain,
  isFetchingCategories,
  categories,
}) => (
  <div className={styles.wrapper}>
    {isFetchingCategories && <Loader />}
    {!isFetchingCategories && (
      categories.map(({
        id,
        name,
        banners: { default: thumbnailURL },
        recipesCount,
      }) => (
        <a
          key={id}
          href={`${baseDomain}/meals/category/${id}`}
          className={styles.item}
          style={{
            backgroundImage: thumbnailURL
              ? `url(${thumbnailURL})`
              : `url(${baseDomain}/assets/images/default/meal.jpg)`,
          }}
        >
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.count}>{`${recipesCount} rezepte`}</p>
        </a>
      ))
    )}
  </div>
);

MealCategoryGrid.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingCategories: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      banners,
      recipesCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MealCategoryGrid;
