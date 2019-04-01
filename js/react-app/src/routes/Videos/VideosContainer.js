import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import Videos from './Videos';
import { getVideos, filterVideos } from '../../common/actions/videos';
import video from '../../common/models/video';

class VideosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
      page: 1
    };

    this.handleFilterChange = () => {};

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabSwipe = this.handleTabSwipe.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageNumber = this.handlePageNumber.bind(this);
  }

  handleTabClick(event, value) {
    this.setState({ tabIdx: value });
  }

  handleTabSwipe(tabIdx) {
    this.setState({ tabIdx });
  }

  handlePageNumber(page) {
    this.setState({
      page
    });
  }

  render() {
    const {
      state: { tabIdx, page },
      props: { baseDomain, items, getFilteredVideos }
    } = this;

    return (
      <Videos
        baseDomain={baseDomain}
        tabIdx={tabIdx}
        onTabClick={this.handleTabClick}
        onTabSwipe={this.handleTabSwipe}
        onFilterChange={this.handleFilterChange}
        items={items}
        page={page}
        onPageNumberChange={this.handlePageNumber}
        filteredItems={items}
        filterVideos={getFilteredVideos}
      />
    );
  }
}

VideosContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(video).isRequired,
  getFilteredVideos: PropTypes.func.isRequired
};

const mapStateToProps = (
  {
    videos: {
      all: { items }
    }
  },
  { baseDomain }
) => ({ items, baseDomain });
const mapDispatchToProps = dispatch => ({
  getFilteredVideos: (page, filters, replaceVideo) => {
    dispatch(filterVideos(page, filters, replaceVideo));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(onComponentDidMount(getVideos())(VideosContainer));
