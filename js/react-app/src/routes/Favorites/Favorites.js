import React from 'react';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';

import FavoriteVideosContainer from './Videos/FavoriteVideosContainer';
import FavoriteRecipes from './Recipes/FavoriteRecipes';
import FavoritePosts from './Posts/FavoritePosts';
import { StyledTabs, StyledTab } from '../../common/customizedMaterialComponents';
import trainer from '../../common/models/trainer';
import favorite from '../../common/models/favorite';

const Favorites = ({
  baseDomain,
  data: {
    video: favoriteVideos,
    recipe: favoriteRecipes,
    post: favoritePosts,
  },
  tabIdx,
  courseFilters,
  trainers,
  isFetchingTrainers,
  isFetchingCourseFilters,
  onTabClick,
  onTabSwipe,
  loadFavoriteItems,
}) => (
  <div>
    <Paper square style={{ margin: '0 2px' }}>
      <StyledTabs
        value={tabIdx}
        onChange={onTabClick}
        fullWidth
      >
        <StyledTab label="Video Favoriten" />
        <StyledTab label="Rezept Favoriten" />
        <StyledTab label="Artikel Favoriten" />
      </StyledTabs>
    </Paper>
    <SwipeableViews
      axis="x"
      index={tabIdx}
      onChangeIndex={onTabSwipe}
    >
      {tabIdx === 0 ? (
        <FavoriteVideosContainer
          baseDomain={baseDomain}
          loadFavoriteItems={loadFavoriteItems}
          data={favoriteVideos}
          courseFilters={courseFilters}
          trainers={trainers}
          isFetchingTrainers={isFetchingTrainers}
          isFetchingCourseFilters={isFetchingCourseFilters}
        />
      ) : <div />}
      {tabIdx === 1 ? (
        <FavoriteRecipes
          baseDomain={baseDomain}
          loadFavoriteItems={loadFavoriteItems}
          data={favoriteRecipes}
        />
      ) : <div />}
      {tabIdx === 2 ? (
        <FavoritePosts
          baseDomain={baseDomain}
          loadFavoriteItems={loadFavoriteItems}
          data={favoritePosts}
        />
      ) : <div />}
    </SwipeableViews>
  </div>
);

Favorites.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  data: PropTypes.objectOf(
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
  tabIdx: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onTabSwipe: PropTypes.func.isRequired,
  loadFavoriteItems: PropTypes.func.isRequired,
};

export default Favorites;
