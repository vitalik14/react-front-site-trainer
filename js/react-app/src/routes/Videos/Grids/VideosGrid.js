import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../Videos.scss';
import { TextBlueButton } from '../../../common/customizedMaterialComponents';
import VideoGridItem from '../../../common/components/GridItems/Video/VideoGridItem';
import video from '../../../common/models/video';

const VideosGrid = ({
  baseDomain,
  isFetching,
  hasBeenFetchedAtLeastOnce,
  items,
  filteredItems,
  count,
  countPerPage,
  currentPage,
  canPaginate,
  loadMoreVideos,
  onPageNumberChange
}) => {
  if (isFetching && !hasBeenFetchedAtLeastOnce) {
    return (
      <div className="loaderWrapper">
        <CircularProgress />
      </div>
    );
  }

  if (!hasBeenFetchedAtLeastOnce) return null;

  if (!items.length) {
    return <p className="placeholder">Keine Videos ¯\_(ツ)_/¯</p>;
  }

  return (
    <>
      <div className={styles.gridWrapper}>
        {
          (filteredItems.length ? filteredItems : items).map(({
            id,
            trainer: {
              name: coachName,
              user: {
                id: coachId,
                profilePicUrl: coachAvatarUrl,
              },
            },
            level,
            course: {
              name: courseName,
              banners: {
                default: thumbnailURL,
              },
              tools,
            },
            kcal,
            date,
            duration,
            user: { playAmount, playedInPercent },
            meta: {
              isFavorite,
              favorite: {
                id: favId = null,
                data: {
                  note: favNote = null,
                  difficulty: favDifficulty = null,
                } = {},
              } = {},
            },
          }) => (
            <div key={id} className={styles.gridItem}>
              <VideoGridItem
                baseDomain={baseDomain}
                id={id}
                courseName={courseName}
                coachId={coachId}
                coachName={coachName}
                coachAvatarUrl={coachAvatarUrl}
                level={level}
                thumbnailURL={thumbnailURL}
                tools={tools}
                kcal={kcal}
                duration={duration}
                playsAmount={playAmount}
                lastPlayedPercentage={playedInPercent}
                isFav={isFavorite}
                favId={favId}
                favNote={favNote}
                date={date}
                favDifficulty={favDifficulty}
              />
            </div>
          ))
        }
      </div>
      {isFetching && (
        <div className="loaderWrapper">
          <CircularProgress />
        </div>
      )}
      <div className="paginationWrapper">
        <div>
          <p className="paginationCount">
            Zeige&nbsp;
            {Math.min(count, countPerPage * currentPage)}
            &nbsp;von&nbsp;
            {count}
            &nbsp;Ergebnissen
          </p>
          <TextBlueButton
            variant="outlined"
            onClick={() => onPageNumberChange(currentPage + 1)}
            disabled={!canPaginate || isFetching}
          >
            Laden Sie mehr Daten
          </TextBlueButton>
        </div>
      </div>
    </>
  );
};

VideosGrid.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasBeenFetchedAtLeastOnce: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(video).isRequired,
  count: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  canPaginate: PropTypes.bool.isRequired,
  onPageNumberChange: PropTypes.func.isRequired
  // loadMoreVideos: PropTypes.func.isRequired,
};

export default VideosGrid;
