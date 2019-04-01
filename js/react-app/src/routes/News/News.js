import React from 'react';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import SwipeableViews from 'react-swipeable-views';

import { StyledTab, StyledTabs } from '../../common/customizedMaterialComponents';
import HealthNews from './Health/HealthNews';
import PurLifeNews from './PurLife/PurLifeNews';
import post from '../../common/models/post';
import styles from './News.scss';

const News = ({
  baseDomain,
  tabIdx,
  onTabClick,
  onTabSwipe,
  loadPurLifePosts,
  hasFetchedPurLifeNews,
  posts,
  currentUserType,
}) => (
  <div>
    <div className={styles.banner}>
      <h1 className={styles.pageTitle}>News</h1>
      <p className={styles.pageSubTitle}>Be more than you are today!</p>
    </div>
    <Paper square style={{ margin: '0 2px' }}>
      <StyledTabs
        value={tabIdx}
        onChange={onTabClick}
        fullWidth
      >
        <StyledTab label="Health News" />
        <StyledTab label="PurLife News" />
      </StyledTabs>
    </Paper>
    <SwipeableViews
      axis="x"
      index={tabIdx}
      onChangeIndex={onTabSwipe}
    >
      {(tabIdx === 0 && (
        <HealthNews
          baseDomain={baseDomain}
          isFetching={posts.health.isFetching}
          items={posts.health.items}
          currentUserType={currentUserType}
        />
      )) || <div />}
      {(tabIdx === 1 && (
        <PurLifeNews
          isFetching={posts.purLife.isFetching}
          items={posts.purLife.items}
          loadPurLifePosts={loadPurLifePosts}
          hasFetchedPurLifeNews={hasFetchedPurLifeNews}
          currentUserType={currentUserType}
        />
      )) || <div />}
    </SwipeableViews>
  </div>
);

News.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  tabIdx: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onTabSwipe: PropTypes.func.isRequired,
  posts: PropTypes.objectOf(
    PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(post),
    }),
  ).isRequired,
  loadPurLifePosts: PropTypes.func.isRequired,
  hasFetchedPurLifeNews: PropTypes.bool.isRequired,
  currentUserType: PropTypes.string,
};

News.defaultProps = {
  currentUserType: null,
};

export default News;
