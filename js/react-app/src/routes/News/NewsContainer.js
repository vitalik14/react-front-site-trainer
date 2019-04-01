import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import News from './News';
import { getPurLifePosts } from '../../common/actions/posts';
import post from '../../common/models/post';

class NewsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
      hasFetchedPurLifeNews: false,
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabSwipe = this.handleTabSwipe.bind(this);
    this.handlePurLifeNewsLoad = this.handlePurLifeNewsLoad.bind(this);
  }

  handleTabClick(event, value) {
    this.setState({ tabIdx: value });
  }

  handleTabSwipe(tabIdx) {
    this.setState({ tabIdx });
  }

  handlePurLifeNewsLoad() {
    const {
      state: { hasFetchedPurLifeNews },
      props: { loadPurLifePosts },
    } = this;
    if (!hasFetchedPurLifeNews) {
      loadPurLifePosts();
      this.setState({ hasFetchedPurLifeNews: true });
    }
  }

  render() {
    const {
      state: {
        tabIdx,
        hasFetchedPurLifeNews,
      },
      props: {
        baseDomain,
        posts,
      },
    } = this;
    return (
      <News
        baseDomain={baseDomain}
        tabIdx={tabIdx}
        posts={posts}
        hasFetchedPurLifeNews={hasFetchedPurLifeNews}
        loadPurLifePosts={this.handlePurLifeNewsLoad}
        onTabClick={this.handleTabClick}
        onTabSwipe={this.handleTabSwipe}
      />
    );
  }
}

NewsContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  posts: PropTypes.objectOf(
    PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(post),
    }),
  ).isRequired,
  loadPurLifePosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  posts,
  user: { currentUser: { type: currentUserType = null } },
}) => ({ posts, currentUserType });

const mapDispatchToProps = dispatch => ({
  loadPurLifePosts: () => dispatch(getPurLifePosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
