import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick/lib';

import {
  SliderArrIconButton,
  SliderPrevIcon,
  SliderNextIcon,
} from '../../../common/customizedMaterialComponents';
import meal from '../../../common/models/meal';
import RecipeGridItem from '../../../common/components/GridItems/Meal/MealGridItem';
import styles from './SingleMealPlan.scss';

const SingleMealPlan = ({
  baseDomain,
  date,
  slider,
  sliderConfig,
  canGoBack,
  canGoNext,
  setSliderReference,
  onBeforeChange,
  meals,
}) => (
  <div className={styles.cont}>
    <div className={styles.topCont}>
      <h2 className={styles.date}>{date}</h2>
      {slider && (
        <div>
          <SliderArrIconButton
            onClick={slider.slickPrev}
            disabled={!canGoBack}
          >
            <SliderPrevIcon />
          </SliderArrIconButton>
          <SliderArrIconButton
            onClick={slider.slickNext}
            disabled={!canGoNext}
          >
            <SliderNextIcon />
          </SliderArrIconButton>
        </div>
      )}
    </div>
    <Slider
      ref={setSliderReference}
      {...sliderConfig}
      beforeChange={onBeforeChange}
    >
      {
        meals.map(({
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
          meta: {
            isFavorite,
            favorite: {
              id: favId = null,
              data: { note: favNote = null } = {},
            } = {},
          },
        }) => (
          <div key={id}>
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
              isFav={isFavorite}
              favId={favId}
              favNote={favNote}
            />
          </div>
        ))}
    </Slider>
  </div>
);

SingleMealPlan.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(meal).isRequired,
  canGoBack: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
};

export default SingleMealPlan;
