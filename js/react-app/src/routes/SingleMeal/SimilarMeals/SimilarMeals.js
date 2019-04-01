import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import SliderContainer from '../../../common/components/Slider/SliderContainer';
import meal from '../../../common/models/meal';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import MealGridItem from '../../../common/components/GridItems/Meal/MealGridItem';

export default class SimilarMeals extends Component {
  componentDidMount() {
    const { props: { fetchItems } } = this;
    fetchItems();
  }

  render() {
    const { props: { isFetching, items, baseDomain } } = this;

    if (isFetching) return <Loader />;

    return (
      <div style={{ marginBottom: 45 }}>
        <SliderContainer
          title="Sie werden interessiert sein"
          slides={
            items.map(({
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
              <MealGridItem
                baseDomain={baseDomain}
                key={id}
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
            ))
          }
        />
      </div>
    );
  }
}

SimilarMeals.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(meal).isRequired,
  baseDomain: PropTypes.string.isRequired,
};
