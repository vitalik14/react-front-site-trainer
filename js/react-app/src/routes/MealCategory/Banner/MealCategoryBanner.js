import React from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import styles from './MealCategoryBanner.scss';

const MealCategoryBanner = ({
  isFetchingCategoryInfo,
  categoryInfo: { name, recipesCount, banners },
}) => (
  <>
    {isFetchingCategoryInfo && <Loader />}
    {!isFetchingCategoryInfo && (
      <div
        className={styles.block}
        style={
          banners.wide
            ? { backgroundImage: `url(${banners.wide})` }
            : {
              height: 120,
              marginBottom: 0,
              fontSize: 24,
              color: '#4D4D4E',
              textShadow: 'none',
            }
        }
      >
        <h1 className={styles.title}>
          {`${recipesCount} ${name}-Rezepte`}
        </h1>
      </div>
    )}
  </>
);

MealCategoryBanner.propTypes = {
  isFetchingCategoryInfo: PropTypes.bool.isRequired,
  categoryInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    banners: PropTypes.shape({
      default: PropTypes.string,
      wide: PropTypes.string,
      square: PropTypes.string,
    }),
    recipes_count: PropTypes.number,
  }).isRequired,
};

export default MealCategoryBanner;
