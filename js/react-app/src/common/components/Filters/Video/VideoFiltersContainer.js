import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';
import { PropTypes } from 'prop-types';

import VideoFilters from './VideoFilters';
import { getCourseFilters, getAllTrainers } from '../../../actions/training';
import video from '../../../models/video';
import trainerModel from '../../../models/trainer';

class VideoFiltersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      filters: {
        course: [],
        trainer: [],
        difficulty: [
          {
            id: 1,
            name: 'Einsteiger',
            checked: true
          },
          {
            id: 2,
            name: 'Fortgeschritten',
            checked: true
          },
          {
            id: 3,
            name: 'Profi',
            checked: true
          }
        ],
        duration: [
          'Beliebig',
          'Bis 15 Min',
          '15 - 30 Min',
          '30 - 45 Min',
          'Ab 45 Min'
        ],
        durationRanges: [
          { from: 0, to: Infinity },
          { from: 0, to: 15 },
          { from: 15, to: 30 },
          { from: 30, to: 45 },
          { from: 45, to: Infinity }
        ],
        durationValue: 0
      },
      areMobileFiltersShown: window.innerWidth < 768,
      mobileFiltersShownStates: {
        course: false,
        difficulty: false,
        duration: false,
        trainers: false
      }
    };

    this.handleFilterToggle = this.handleFilterToggle.bind(this);
    this.handleFilteredItems = this.handleFilteredItems.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleMobileFiltersToggle = this.handleMobileFiltersToggle.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.isWithinSelectedCourses = this.isWithinSelectedCourses.bind(this);
    this.isWithinSelectedDifficultyLevels = this.isWithinSelectedDifficultyLevels.bind(
      this
    );
    this.isWithinSelectedTrainers = this.isWithinSelectedTrainers.bind(this);
    this.isWithinSelectedDuration = this.isWithinSelectedDuration.bind(this);

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillReceiveProps({ trainers, courseFilters, page }) {
    const {
      state: {
        filters: { course, trainer },
        pageNumber
      }
    } = this;
    if (
      trainers.length &&
      courseFilters.length &&
      course.length === 0 &&
      trainer.length === 0
    ) {
      this.setState(({ filters }) => ({
        filters: {
          ...filters,
          course: courseFilters.reduce((acc, filter) => {
            acc.push({
              ...filter,
              checked: true
            });
            return acc;
          }, []),
          trainer: trainers.reduce((acc, { id, name }) => {
            acc.push({
              id,
              name,
              checked: true
            });
            return acc;
          }, [])
        }
      }));
    }

    if (page && pageNumber !== page) {
      this.setState(
        () => ({
          pageNumber: page
        }),
        () => {
          this.handleFilteredItems(false);
        }
      );
    }
  }

  componentDidUpdate({ onFilterChange }) {
    onFilterChange();
  }

  handleFilteredItems(replaceVideo) {
    const {
      props: { filterVideos },
      state: { filters, pageNumber }
    } = this;
    filterVideos(pageNumber, filters, replaceVideo);
  }

  handleFilterToggle(type, toggledId) {
    this.setState(
      ({ filters }) => ({
        filters: {
          ...filters,
          [type]: filters[type].map(({ id, name, checked }) => ({
            id,
            name,
            checked: toggledId === id ? !checked : checked
          }))
        }
      }),
      () => {
        this.handleFilteredItems(true);
      }
    );
  }

  handleDurationChange(value) {
    this.setState(
      ({ filters }) => ({
        filters: {
          ...filters,
          durationValue: filters.duration.indexOf(value)
        }
      }),
      () => {
        this.handleFilteredItems(true);
      }
    );
  }

  handleMobileFiltersToggle(type) {
    this.setState(({ mobileFiltersShownStates }) => ({
      mobileFiltersShownStates: {
        ...mobileFiltersShownStates,
        [type]: !mobileFiltersShownStates[type]
      }
    }));
  }

  handleWindowResize({ currentTarget: { innerWidth: currentScreenWidth } }) {
    this.setState({ areMobileFiltersShown: currentScreenWidth < 768 });
  }

  isWithinSelectedCourses(courseName) {
    const {
      state: {
        filters: { course: courseFilters }
      }
    } = this;
    return courseFilters.some(
      ({ name, checked }) => checked && courseName === name
    );
  }

  isWithinSelectedDifficultyLevels(difficultyLevel) {
    const {
      state: {
        filters: { difficulty: difficultyFilters }
      }
    } = this;
    return difficultyFilters.some(
      ({ id, checked }) => checked && id === difficultyLevel
    );
  }

  isWithinSelectedTrainers(trainerName) {
    const {
      state: {
        filters: { trainer: trainerFilters }
      }
    } = this;
    return trainerFilters.some(
      ({ name, checked }) => checked && trainerName === name
    );
  }

  isWithinSelectedDuration(duration) {
    const {
      state: {
        filters: { durationRanges, durationValue }
      }
    } = this;
    const { from, to } = durationRanges[durationValue];
    return duration > from && duration <= to;
  }

  render() {
    const {
      state: { filters, areMobileFiltersShown, mobileFiltersShownStates },
      props: {
        items,
        isFetchingTrainers,
        isFetchingCourseFilters,
        filterVideos
      }
    } = this;

    return (
      <VideoFilters
        items={items}
        filters={filters}
        areMobileFiltersShown={areMobileFiltersShown}
        mobileFiltersShownStates={mobileFiltersShownStates}
        onMobileFiltersToggle={this.handleMobileFiltersToggle}
        onFilterToggle={this.handleFilterToggle}
        onDurationChange={this.handleDurationChange}
        isFetchingTrainers={isFetchingTrainers}
        isFetchingCourseFilters={isFetchingCourseFilters}
        filterVideos={filterVideos}
      />
    );
  }
}

VideoFiltersContainer.propTypes = {
  items: PropTypes.arrayOf(video).isRequired,
  trainers: PropTypes.arrayOf(trainerModel).isRequired,
  courseFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  isFetchingTrainers: PropTypes.bool.isRequired,
  isFetchingCourseFilters: PropTypes.bool.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterVideos: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

const mapStateToProps = ({
  training: {
    isFetchingCourseFilters,
    courseFilters,
    isFetchingTrainers,
    trainers
  }
}) => ({
  isFetchingCourseFilters,
  courseFilters,
  isFetchingTrainers,
  trainers
});

export default connect(mapStateToProps)(
  onComponentDidMount([getCourseFilters, getAllTrainers])(VideoFiltersContainer)
);
