import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Favorites from './Favorites';
import { getFavoriteItems } from '../../common/actions/user';
import favorite from '../../common/models/favorite';
import trainer from '../../common/models/trainer';

class FavoritesContainer extends Component {
  constructor(props) {
    super(props);

    this.tabIdxToItemsTypeMapping = ['video', 'recipe', 'post'];

    this.state = {
      tabIdx: 0,
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabSwipe = this.handleTabSwipe.bind(this);
    this.loadFavoriteItems = this.loadFavoriteItems.bind(this);
  }

  handleTabClick(event, value) {
    this.setState({ tabIdx: value });
    this.loadFavoriteItems(value);
  }

  handleTabSwipe(tabIdx) {
    this.setState({ tabIdx });
    this.loadFavoriteItems(tabIdx);
  }

  loadFavoriteItems(tabIdx) {
    const {
      props: { favorites, loadFavoriteItems },
    } = this;
    const type = this.tabIdxToItemsTypeMapping[tabIdx];
    if (!favorites[type].hasBeenFetchedAtLeastOnce) {
      loadFavoriteItems(type);
    }
  }

  render() {
    const {
      state: { tabIdx },
      props: {
        baseDomain,
        favorites,
        loadFavoriteItems,
        trainers,
        courseFilters,
        isFetchingTrainers,
        isFetchingCourseFilters,
      },
    } = this;

    return (
      <Favorites
        baseDomain={baseDomain}
        data={favorites}
        tabIdx={tabIdx}
        loadFavoriteItems={loadFavoriteItems}
        trainers={trainers}
        courseFilters={courseFilters}
        isFetchingTrainers={isFetchingTrainers}
        isFetchingCourseFilters={isFetchingCourseFilters}
        onTabClick={this.handleTabClick}
        onTabSwipe={this.handleTabSwipe}
        onFilterToggle={this.handleFilterToggle}
        onDurationChange={this.handleDurationChange}
      />
    );
  }
}

FavoritesContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  favorites: PropTypes.objectOf(
    PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(favorite),
      count: PropTypes.number,
      countPerPage: PropTypes.number,
      currentPage: PropTypes.number,
      canPaginate: PropTypes.bool,
    }),
  ).isRequired,
  trainers: PropTypes.arrayOf(trainer).isRequired,
  courseFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  isFetchingTrainers: PropTypes.bool.isRequired,
  isFetchingCourseFilters: PropTypes.bool.isRequired,
  loadFavoriteItems: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  user: { favorites },
  training: {
    trainers,
    courseFilters,
    isFetchingTrainers,
    isFetchingCourseFilters,
  },
}) => ({
  favorites,
  trainers,
  courseFilters,
  isFetchingTrainers,
  isFetchingCourseFilters,
});

const mapDispatchToProps = dispatch => ({
  loadFavoriteItems: type => dispatch(getFavoriteItems(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
