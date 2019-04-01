import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import Training from './Training';
import { getPartialCourses } from '../../common/actions/training';
import { partialCourse, fullCourse } from '../../common/models/course';
import scheduleModel from '../../common/models/schedule';
import video from '../../common/models/video';

class TrainingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSearchResult: {
        id: null,
        slug: null,
      },
      showSearchResults: false,
      searchInputValue: '',
    };

    this.loadSearchResultsWithDebounce = debounce(this.loadSearchResults.bind(this), 500);
    this.handleSearchInputRefSet = this.handleSearchInputRefSet.bind(this);
    this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
    this.handleSearchInputFocus = this.handleSearchInputFocus.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
    this.handleSearchResultsOutsideClick = this.handleSearchResultsOutsideClick.bind(this);
    this.handleSearchResultSelect = this.handleSearchResultSelect.bind(this);
  }

  componentWillReceiveProps() {
    if (!document.querySelectorAll('[data-id-time]').length) {
      return;
    }

    const arr = Array.prototype.map.call(document.querySelectorAll('[data-id-time]'), (el) => {
      return el.getAttribute('data-id-time');
    });
    let lastEl = '';
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const time = arr.find(el => {
      const hours = +el.split(':')[0];
      const minutes = +el.split(':')[1];
        if ((currentHours < hours) || (currentHours == hours && currentMinutes >= minutes)) {
            return lastEl;
        }
        lastEl = el;
        return false;
    });
    const elem = time || arr[0];

    document.getElementById('trainers').style.visibility = 'visible';
    document.querySelector(`[data-id-time="${elem}"]`).scrollIntoView();
    window.scrollTo(0,0);
  }

  loadSearchResults(name) {
    const { props: { loadCourses } } = this;
    loadCourses(name);
    this.setState({ selectedSearchResult: { id: null, slug: null } });
  }

  handleSearchKeyUp(searchInputValue) {
    this.setState({ searchInputValue });
  }

  handleSearchInputFocus() {
    this.setState({ showSearchResults: true });
  }

  handleSearchClear() {
    this.setState({ selectedSearchResult: { id: null, slug: null }, searchInputValue: '', showSearchResults: false });
    this.searchInputRef.focus();
    const { props: { loadCourses } } = this;
    loadCourses('');
  }

  handleSearchInputRefSet(searchInputRef) {
    this.searchInputRef = searchInputRef;
  }

  handleSearchResultsOutsideClick() {
    this.setState({ showSearchResults: false });
  }

  handleSearchResultSelect({ id, name, slug }) {
    this.setState({
      selectedSearchResult: { id, slug },
      searchInputValue: name,
      showSearchResults: false,
    });
  }

  render() {
    const {
      state: {
        showSearchResults,
        selectedSearchResult: {
          id: selectedSearchResultId,
          slug: selectedSearchResultSlug,
        },
        searchInputValue,
      },
      props: {
        baseDomain,
        isFetchingPartialCourses,
        partialCourses,
        hasFetchedPartialCoursesAtLeastOnce,
        isFetchingFullCourses,
        fullCourses,
        isFetchingCurrentCourses,
        currentCourses,
        isFetchingDaySchedule,
        daySchedule,
        isFetchingVideos,
        videos,
      },
    } = this;

    return (
      <Training
        baseDomain={baseDomain}
        isFetchingPartialCourses={isFetchingPartialCourses}
        partialCourses={partialCourses}
        hasFetchedPartialCoursesAtLeastOnce={hasFetchedPartialCoursesAtLeastOnce}
        isFetchingFullCourses={isFetchingFullCourses}
        fullCourses={fullCourses}
        loadSearchResults={this.loadSearchResultsWithDebounce}
        onSearchInputRefSet={this.handleSearchInputRefSet}
        onSearchKeyUp={this.handleSearchKeyUp}
        onSearchFocus={this.handleSearchInputFocus}
        onSearchClear={this.handleSearchClear}
        onSearchResultsOutsideClick={this.handleSearchResultsOutsideClick}
        showSearchResults={showSearchResults}
        searchInputValue={searchInputValue}
        selectedSearchResultId={selectedSearchResultId}
        selectedSearchResultSlug={selectedSearchResultSlug}
        onSearchResultSelect={this.handleSearchResultSelect}
        isFetchingCurrentCourses={isFetchingCurrentCourses}
        currentCourses={currentCourses}
        isFetchingDaySchedule={isFetchingDaySchedule}
        daySchedule={daySchedule}
        isFetchingVideos={isFetchingVideos}
        videos={videos}
      />
    );
  }
}

TrainingContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingPartialCourses: PropTypes.bool.isRequired,
  partialCourses: PropTypes.arrayOf(partialCourse).isRequired,
  hasFetchedPartialCoursesAtLeastOnce: PropTypes.bool.isRequired,
  isFetchingFullCourses: PropTypes.bool.isRequired,
  fullCourses: PropTypes.arrayOf(fullCourse).isRequired,
  loadCourses: PropTypes.func.isRequired,
  isFetchingCurrentCourses: PropTypes.bool.isRequired,
  currentCourses: PropTypes.shape({
    room1: scheduleModel,
    room2: scheduleModel,
  }).isRequired,
  isFetchingDaySchedule: PropTypes.bool.isRequired,
  daySchedule: PropTypes.shape({
    dayOfWeek: PropTypes.number,
    schedule: PropTypes.shape({
      room1: PropTypes.arrayOf(scheduleModel),
      room2: PropTypes.arrayOf(scheduleModel),
    }),
  }).isRequired,
  isFetchingVideos: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(video).isRequired,
};

const mapStateToProps = ({
  training: {
    isFetchingPartialCourses,
    partialCourses,
    isFetchingFullCourses,
    fullCourses,
    isFetchingCurrentCourses,
    hasFetchedPartialCoursesAtLeastOnce,
    currentCourses,
    isFetchingDaySchedule,
    daySchedule,
  },
  videos: {
    all: {
      isFetching: isFetchingVideos,
      items: videos,
    },
  },
}) => ({
  isFetchingPartialCourses,
  partialCourses,
  hasFetchedPartialCoursesAtLeastOnce,
  isFetchingFullCourses,
  fullCourses,
  isFetchingCurrentCourses,
  currentCourses,
  isFetchingDaySchedule,
  daySchedule,
  isFetchingVideos,
  videos,
});

const mapDispatchToProps = dispatch => ({
  loadCourses: name => dispatch(getPartialCourses(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingContainer);
