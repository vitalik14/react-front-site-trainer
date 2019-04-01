import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper/Paper';
import SwipeableViews from 'react-swipeable-views';

import styles from './FitBook.scss';
import { StyledWideTab, StyledWideTabs, WhiteButton } from '../../common/customizedMaterialComponents';
import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';
import '../../assets/styles/_layout.scss';
import fitBookPost from '../../common/models/fitBookPost';
import user from '../../common/models/user';
import Sidebar from './Sidebar/FitBookSidebarContainer';
import Posts from './Posts/FitBookPosts';
import PostCreation from './PostCreation/FitBookPostCreationContainer';

export default class FitBook extends Component {
  constructor(props) {
    super(props);

    this.tabIdxToItemsTypeMapping = ['all', 'vidcomments', 'friends', 'trainer'];

    this.state = {
      tabIdx: 0,
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabSwipe = this.handleTabSwipe.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
  }

  handleTabClick(event, value) {
    this.setState({ tabIdx: value });
    this.loadPosts(this.tabIdxToItemsTypeMapping[value]);
  }

  handleTabSwipe(tabIdx) {
    this.setState({ tabIdx });
    this.loadPosts(this.tabIdxToItemsTypeMapping[tabIdx]);
  }

  loadPosts(type, page, replace) {
    const { props: { [`${type}Posts`]: posts, loadPosts } } = this;
    if (!posts.hasFetchedAtLeastOnce) {
      loadPosts(type, page, replace);
    }
  }

  render() {
    const {
      state: { tabIdx },
      props: {
        baseDomain,
        isUsageAccepted,
        isUsageBeingAccepted,
        isFetchingSidebarData,
        sidebarData,
        acceptUsage,
        allPosts,
        vidcommentsPosts,
        friendsPosts,
        trainerPosts,
        loadPosts,
        likePost,
        unlikePost,
        postIdsUpdatingLike,
        currentUserType,
        updatePost,
        removePost,
        postIdsBeingUpdated,
        postIdsBeingRemoved,
        postIdUpdatingPinnedState,
        pinPost,
        unpinPost,
      },
    } = this;

    const postsSharedPropTypes = {
      baseDomain,
      currentUserType,
      updatePost,
      removePost,
      postIdsBeingUpdated,
      postIdsBeingRemoved,
      likePost,
      unlikePost,
      postIdsUpdatingLike,
      pinPost,
      unpinPost,
      postIdUpdatingPinnedState,
      pinnedPostId: sidebarData.pinnedPost ? sidebarData.pinnedPost.id : null,
      loadMoreItems: loadPosts,
    };

    return (
      <>
        {!isUsageAccepted && (
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${baseDomain}/assets/js/react-app/src/assets/img/png/achievements-bg.png)`,
            }}
          >
            <h1 className={styles.bannerTitle}>Nutzungshinweis</h1>
            <p className={styles.bannerDescription}>
              Willkommen in unserem Fitbook! Hier kannst Du mit unseren Trainern
              und anderen pur-life Nutzern über Gesundheit, Training,
              Ernährung und allem was dazu gehört austauschen
              oder uns Rückmeldung zu Deinem Training geben.
              Bei Fragen zu Technik, Abrechnung, Verträgen
              oder Ähnlichem, wende Dich bitte ausschließlich
              an unseren Support, über die Hotline oder unser Kontaktformular.
            </p>
            <WhiteButton onClick={acceptUsage}>
              ICH AKZEPTIERE
              {isUsageBeingAccepted && <ButtonLoader />}
            </WhiteButton>
          </div>
        )}
        <div className={styles.flexWrapper}>
          <div className={styles.postsWrapper}>
            <PostCreation />
            <Paper square style={{ margin: '0 2px' }}>
              <StyledWideTabs
                value={tabIdx}
                onChange={this.handleTabClick}
                fullWidth
              >
                <StyledWideTab label="ALLE BEITRÄGE" />
                <StyledWideTab label="VIDEOKOMMENTARE" />
                <StyledWideTab label="VON FREUNDEN" />
                <StyledWideTab label="VON TRAINERN" />
              </StyledWideTabs>
            </Paper>
            <SwipeableViews
              axis="x"
              index={tabIdx}
              onChangeIndex={this.handleTabSwipe}
            >
              {tabIdx === 0 ? (
                <Posts
                  {...allPosts}
                  {...postsSharedPropTypes}
                />
              ) : <div />}
              {tabIdx === 1 ? (
                <Posts
                  {...vidcommentsPosts}
                  {...postsSharedPropTypes}
                  type="vidcomments"
                />
              ) : <div />}
              {tabIdx === 2 ? (
                <Posts
                  {...friendsPosts}
                  {...postsSharedPropTypes}
                  type="friends"
                />
              ) : <div />}
              {tabIdx === 3 ? (
                <Posts
                  {...trainerPosts}
                  {...postsSharedPropTypes}
                  type="trainer"
                />
              ) : <div />}
            </SwipeableViews>
          </div>
          <aside className={styles.sidebarWrapper}>
            {isFetchingSidebarData && <LayoutLoader />}
            {!isFetchingSidebarData && sidebarData && (
              <Sidebar
                baseDomain={baseDomain}
                infoBoxes={sidebarData.infoBoxes}
                popups={sidebarData.popups}
                kcalStats={sidebarData.kcalStats}
                pinnedPost={sidebarData.pinnedPost}
                unpinPost={unpinPost}
                postIdUpdatingPinnedState={postIdUpdatingPinnedState}
                currentUserType={currentUserType}
              />
            )}
          </aside>
        </div>
      </>
    );
  }
}

export const placesModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    kcal: PropTypes.number,
    user,
  }),
).isRequired;

export const postsModel = {
  isFetching: PropTypes.bool,
  hasFetchedAtLeastOnce: PropTypes.bool,
  items: PropTypes.arrayOf(fitBookPost),
  itemsCount: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  itemsCurrentPage: PropTypes.number,
  canPaginateItems: PropTypes.bool,
  itemIdUpdatingLike: PropTypes.number,
};

FitBook.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isUsageBeingAccepted: PropTypes.bool.isRequired,
  isUsageAccepted: PropTypes.bool,
  isFetchingSidebarData: PropTypes.bool.isRequired,
  acceptUsage: PropTypes.func.isRequired,
  sidebarData: PropTypes.shape({
    infoBoxes: PropTypes.arrayOf(PropTypes.string),
    popups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.String,
        title: PropTypes.String,
        content: PropTypes.String,
      }),
    ),
    kcalStats: PropTypes.shape({
      kcal: PropTypes.shape({
        today: placesModel,
        week: placesModel,
        month: placesModel,
      }),
    }),
    pinnedPost: fitBookPost,
  }).isRequired,
  allPosts: PropTypes.shape(postsModel).isRequired,
  vidcommentsPosts: PropTypes.shape(postsModel).isRequired,
  friendsPosts: PropTypes.shape(postsModel).isRequired,
  trainerPosts: PropTypes.shape(postsModel).isRequired,
  loadPosts: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  postIdsUpdatingLike: PropTypes.arrayOf(PropTypes.number).isRequired,
  updatePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  postIdsBeingUpdated: PropTypes.arrayOf(PropTypes.number).isRequired,
  postIdsBeingRemoved: PropTypes.arrayOf(PropTypes.number).isRequired,
  postIdUpdatingPinnedState: PropTypes.number,
  currentUserType: PropTypes.string.isRequired,
  pinPost: PropTypes.func.isRequired,
  unpinPost: PropTypes.func.isRequired,
};

FitBook.defaultProps = {
  isUsageAccepted: null,
  postIdUpdatingPinnedState: null,
};
