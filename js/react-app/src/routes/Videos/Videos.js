import React from 'react';
import { PropTypes } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import {
  TabsPaper,
  StyledTab,
  StyledTabs
} from '../../common/customizedMaterialComponents';
import styles from './Videos.scss';
import AllVideosGrid from './Grids/containers/AllVideosGridContainer';
import StartedVideosGrid from './Grids/containers/StartedVideosGridContainer';
import FinishedVideosGrid from './Grids/containers/FinishedVideosGridContainer';
import VideoFiltersContainer from '../../common/components/Filters/Video/VideoFiltersContainer';
import video from '../../common/models/video';

const Videos = ({
  baseDomain,
  tabIdx,
  onTabClick,
  onTabSwipe,
  onFilterChange,
  filteredItems,
  filterVideos,
  items,
  onPageNumberChange,
  page
}) => (
  <div className={styles.wrapper}>
    <div className={styles.leftInnerWrapper}>
      <TabsPaper square>
        <StyledTabs value={tabIdx} onChange={onTabClick} fullWidth>
          <StyledTab label="Alle" />
          <StyledTab label="Angefangene" />
          <StyledTab label="Geschaute" />
        </StyledTabs>
      </TabsPaper>
      <SwipeableViews axis="x" index={tabIdx} onChangeIndex={onTabSwipe}>
        {tabIdx === 0 ? (
          <AllVideosGrid
            baseDomain={baseDomain}
            filteredItems={filteredItems}
            onPageNumberChange={onPageNumberChange}
          />
        ) : (
          <div />
        )}
        {tabIdx === 1 ? <StartedVideosGrid baseDomain={baseDomain} onPageNumberChange={onPageNumberChange} /> : <div />}
        {tabIdx === 2 ? (
          <FinishedVideosGrid baseDomain={baseDomain} onPageNumberChange={onPageNumberChange} />
        ) : (
          <div />
        )}
      </SwipeableViews>
    </div>
    <div className={styles.filtersWrapper}>
      <VideoFiltersContainer
        items={items}
        filterVideos={filterVideos}
        onFilterChange={onFilterChange}
        page={page}
      />
    </div>
  </div>
);

Videos.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  tabIdx: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onTabSwipe: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filteredItems: PropTypes.arrayOf(video).isRequired,
  items: PropTypes.arrayOf(video).isRequired,
  filterVideos: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

export default Videos;
