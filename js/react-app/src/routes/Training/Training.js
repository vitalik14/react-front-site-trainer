import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Training.scss';
import Search from './Search/Search';
import CurrentCourses from './CurrentCourses/CurrentCourses';
import DaySchedule from './DaySchedule/DaySchedule';
import Videos from './Videos/Videos';
import Courses from './Courses/Courses';
import { fullCourse, partialCourse } from '../../common/models/course';
import schedule from '../../common/models/schedule';
import video from '../../common/models/video';

const Training = ({
  baseDomain,
  onSearchInputRefSet,
  onSearchKeyUp,
  onSearchFocus,
  onSearchClear,
  onSearchResultsOutsideClick,
  showSearchResults,
  searchInputValue,
  isFetchingPartialCourses,
  partialCourses,
  hasFetchedPartialCoursesAtLeastOnce,
  isFetchingFullCourses,
  fullCourses,
  selectedSearchResultId,
  selectedSearchResultSlug,
  onSearchResultSelect,
  loadSearchResults,
  isFetchingCurrentCourses,
  currentCourses,
  isFetchingDaySchedule,
  daySchedule,
  isFetchingVideos,
  videos,
}) => (
  <div>
    <div className={styles.banner}>
      <h1 className={styles.pageTitle}>Training</h1>
      <p className={styles.pageSubTitle}>Be more than you are today!</p>
    </div>
    <Search
      baseDomain={baseDomain}
      onSearchInputRefSet={onSearchInputRefSet}
      onSearchKeyUp={onSearchKeyUp}
      onSearchFocus={onSearchFocus}
      onSearchClear={onSearchClear}
      onSearchResultsOutsideClick={onSearchResultsOutsideClick}
      isFetchingResults={isFetchingPartialCourses}
      showSearchResults={showSearchResults}
      searchInputValue={searchInputValue}
      results={partialCourses}
      hasFetchedResultsAtLeastOnce={hasFetchedPartialCoursesAtLeastOnce}
      selectedSearchResultId={selectedSearchResultId}
      selectedSearchResultSlug={selectedSearchResultSlug}
      onSearchResultSelect={onSearchResultSelect}
      loadSearchResults={loadSearchResults}
    />
    <CurrentCourses
      baseDomain={baseDomain}
      isFetching={isFetchingCurrentCourses}
      data={currentCourses}
    />
    <DaySchedule
      baseDomain={baseDomain}
      isFetching={isFetchingDaySchedule}
      data={daySchedule}
    />
    <Videos
      baseDomain={baseDomain}
      isFetching={isFetchingVideos}
      items={videos}
    />
    <Courses
      baseDomain={baseDomain}
      isFetching={isFetchingFullCourses}
      items={fullCourses}
    />
  </div>
);

Training.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  onSearchInputRefSet: PropTypes.func.isRequired,
  onSearchKeyUp: PropTypes.func.isRequired,
  onSearchFocus: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  onSearchResultsOutsideClick: PropTypes.func.isRequired,
  showSearchResults: PropTypes.bool.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  isFetchingPartialCourses: PropTypes.bool.isRequired,
  partialCourses: PropTypes.arrayOf(partialCourse).isRequired,
  hasFetchedPartialCoursesAtLeastOnce: PropTypes.bool.isRequired,
  isFetchingFullCourses: PropTypes.bool.isRequired,
  fullCourses: PropTypes.arrayOf(fullCourse).isRequired,
  selectedSearchResultId: PropTypes.number,
  selectedSearchResultSlug: PropTypes.string,
  onSearchResultSelect: PropTypes.func.isRequired,
  loadSearchResults: PropTypes.func.isRequired,
  isFetchingCurrentCourses: PropTypes.bool.isRequired,
  currentCourses: PropTypes.shape({
    room1: schedule,
    room2: schedule,
  }).isRequired,
  isFetchingDaySchedule: PropTypes.bool.isRequired,
  daySchedule: PropTypes.shape({
    dayOfWeek: PropTypes.number,
    schedule: PropTypes.shape({
      room1: PropTypes.arrayOf(schedule),
      room2: PropTypes.arrayOf(schedule),
    }),
  }).isRequired,
  isFetchingVideos: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(video).isRequired,
};

Training.defaultProps = {
  selectedSearchResultId: null,
  selectedSearchResultSlug: null,
};

export default Training;
