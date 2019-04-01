import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getMealCategoryItems } from '../../common/actions/meals';
import styles from './MealCategory.scss';
import Banner from './Banner/MealCategoryBannerContainer';
import Filters from './Filters/MealCategoryFilters';
import Grid from './Grid/MealCategoryGrid';
import trainingPlan from '../../common/models/trainingPlan';

class MealCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRanges: {
        kcal: [0, 1500],
        carbs: [0, 300],
        protein: [0, 200],
        fat: [0, 150],
      },
    };

    this.handleRangeInputChange = this.handleRangeInputChange.bind(this);
    this.handleFiltersClear = this.handleFiltersClear.bind(this);
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
  }

  handleRangeInputChange(type, values) {
    this.setState(({ selectedRanges }) => ({
      selectedRanges: {
        ...selectedRanges,
        [type]: values,
      },
    }));
  }

  handleFiltersClear() {
    this.setState({
      selectedRanges: {
        kcal: [0, 1500],
        carbs: [0, 300],
        protein: [0, 200],
        fat: [0, 150],
      },
    });
  }

  handleFiltersSubmit() {
    const {
      state: { selectedRanges },
      props: { id, loadMeals },
    } = this;
    const rangesParam = Object.entries(selectedRanges)
      .reduce((params, [key, [from, to]]) => {
        params[key] = `${from}-${to}`; // eslint-disable-line no-param-reassign
        return params;
      }, {});
    loadMeals(id, 1, true, rangesParam);
  }

  loadMoreItems() {
    const { props: { id, categoryItemsCurrentPage, loadMeals }, state: { selectedRanges } } = this;
    const rangesParam = Object.entries(selectedRanges)
      .reduce((params, [key, [from, to]]) => {
        params[key] = `${from}-${to}`; // eslint-disable-line no-param-reassign
        return params;
      }, {});
    loadMeals(id, categoryItemsCurrentPage + 1, false, rangesParam);
  }

  render() {
    const {
      state: { selectedRanges },
      props: {
        id,
        baseDomain,
        isFetchingCategoryItems,
        hasFetchedCategoryItems,
        categoryItems,
        categoryItemsCount,
        categoryItemsCountPerPage,
        categoryItemsCurrentPage,
        canPaginateCategoryItems,
      },
    } = this;
    return (
      <>
        <Banner />
        <div className={styles.flexWrapper}>
          <div className={styles.gridWrapper}>
            <Grid
              id={id}
              baseDomain={baseDomain}
              isFetchingCategoryItems={isFetchingCategoryItems}
              hasFetchedCategoryItems={hasFetchedCategoryItems}
              categoryItems={categoryItems}
              categoryItemsCount={categoryItemsCount}
              categoryItemsCountPerPage={categoryItemsCountPerPage}
              categoryItemsCurrentPage={categoryItemsCurrentPage}
              canPaginateCategoryItems={canPaginateCategoryItems}
              loadMoreItems={this.loadMoreItems}
            />
          </div>
          <div className={styles.searchBlockWrapper}>
            <Filters
              id={id}
              selectedRanges={selectedRanges}
              onRangeInputChange={this.handleRangeInputChange}
              onClear={this.handleFiltersClear}
              onSubmit={this.handleFiltersSubmit}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (
  {
    meals: {
      isFetchingCategoryItems,
      hasFetchedCategoryItems,
      categoryItems,
      categoryItemsCount,
      categoryItemsCountPerPage,
      categoryItemsCurrentPage,
      canPaginateCategoryItems,
    },
  },
  { id, baseDomain },
) => ({
  id,
  baseDomain,
  isFetchingCategoryItems,
  hasFetchedCategoryItems,
  categoryItems,
  categoryItemsCount,
  categoryItemsCountPerPage,
  categoryItemsCurrentPage,
  canPaginateCategoryItems,
});

const mapDispatchToProps = dispatch => ({
  loadMeals: (
    id,
    page,
    replace,
    {
      kcal = '0-1500', carbs = '0-300', protein = '0-200', fat = '0-150',
    } = {},
  ) => dispatch(getMealCategoryItems(
    id, page, replace, 0, kcal, carbs, protein, fat,
  )),
});

MealCategory.propTypes = {
  id: PropTypes.number.isRequired,
  baseDomain: PropTypes.string.isRequired,
  isFetchingCategoryItems: PropTypes.bool.isRequired,
  hasFetchedCategoryItems: PropTypes.bool.isRequired,
  categoryItemsCount: PropTypes.number.isRequired,
  categoryItems: PropTypes.arrayOf(trainingPlan).isRequired,
  categoryItemsCurrentPage: PropTypes.number.isRequired,
  categoryItemsCountPerPage: PropTypes.number.isRequired,
  canPaginateCategoryItems: PropTypes.bool.isRequired,
  loadMeals: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealCategory);
