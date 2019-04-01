import React from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import MealGridItem from '../../../common/components/GridItems/Meal/MealGridItem';
import { TextBlueButton } from '../../../common/customizedMaterialComponents';
import trainingPlan from '../../../common/models/trainingPlan';

const MealCategoryGrid = ({
  baseDomain,
  isFetchingCategoryItems,
  hasFetchedCategoryItems,
  categoryItems,
  categoryItemsCount,
  categoryItemsCountPerPage,
  categoryItemsCurrentPage,
  canPaginateCategoryItems,
  loadMoreItems,
}) => {
  if (isFetchingCategoryItems && !hasFetchedCategoryItems) return <Loader />;

  if (!hasFetchedCategoryItems) return null;

  if (hasFetchedCategoryItems && !categoryItemsCount) {
    return (
      <p className="placeholder">
        Keine Rezepte für Ihre angegebenen Filter ¯\_(ツ)_/¯
      </p>
    );
  }

  return (
    <>
      <div className="gridWrapper">
        {
          categoryItems.map(({
            id,
            name,
            banners: { default: thumbnailUrl },
            nutrients: {
              kcal, carbs, protein, fat,
            },
            types,
            meta: {
              isFavorite,
              favorite: {
                id: favId = null,
                data: { note: favNote = null } = {},
              } = {},
            },
          }) => (
            <div key={id} className="gridItem shiftedByFilters">
              <MealGridItem
                baseDomain={baseDomain}
                id={id}
                name={name}
                thumbnailUrl={thumbnailUrl}
                kcal={kcal}
                carbs={carbs}
                protein={protein}
                fat={fat}
                typeIds={types}
                isFav={isFavorite}
                favId={favId}
                favNote={favNote}
              />
            </div>
          ))
        }
      </div>
      {isFetchingCategoryItems && <Loader />}
      <div className="paginationWrapper">
        <div>
          <p className="paginationCount">
            Zeige&nbsp;
            {Math.min(categoryItemsCount, categoryItemsCountPerPage * categoryItemsCurrentPage)}
            &nbsp;von&nbsp;
            {categoryItemsCount}
            &nbsp;Ergebnissen
          </p>
          <TextBlueButton
            variant="outlined"
            onClick={loadMoreItems}
            disabled={!canPaginateCategoryItems || isFetchingCategoryItems}
          >
            Laden Sie mehr Daten
          </TextBlueButton>
        </div>
      </div>
    </>
  );
};

MealCategoryGrid.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingCategoryItems: PropTypes.bool.isRequired,
  hasFetchedCategoryItems: PropTypes.bool.isRequired,
  categoryItemsCount: PropTypes.number.isRequired,
  categoryItems: PropTypes.arrayOf(trainingPlan).isRequired,
  categoryItemsCurrentPage: PropTypes.number.isRequired,
  categoryItemsCountPerPage: PropTypes.number.isRequired,
  canPaginateCategoryItems: PropTypes.bool.isRequired,
  loadMoreItems: PropTypes.func.isRequired,
};

export default MealCategoryGrid;
