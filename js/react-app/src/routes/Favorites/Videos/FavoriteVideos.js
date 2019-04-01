import React from 'react';
import { PropTypes } from 'prop-types';

import VideoGridItem from '../../../common/components/GridItems/Video/VideoGridItem';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import video from '../../../common/models/video';
import sharedStyles from '../Favorites.scss';
import styles from './FavoriteVideos.scss';

const getFilteredItems = (
  items,
  isWithinSelectedCourses,
  isWithinSelectedDifficultyLevels,
  isWithinSelectedTrainers,
  isWithinSelectedDuration,
) => items.filter(({
  entity: {
    trainer: { name: trainerName },
    level,
    course: { name: courseName },
    duration,
  },
}) => (
  isWithinSelectedCourses(courseName)
  && isWithinSelectedDifficultyLevels(level)
  && isWithinSelectedTrainers(trainerName)
  && isWithinSelectedDuration(duration)
));

const FavoriteVideos = ({
  baseDomain,
  items,
  isFetching,
  isWithinSelectedCourses,
  isWithinSelectedDifficultyLevels,
  isWithinSelectedTrainers,
  isWithinSelectedDuration,
}) => {
  if (isFetching) return <Loader />;

  if (!items.length) {
    return <h1 className={sharedStyles.noDataTitle}>Du hast noch keine Videos favorisiert.</h1>;
  }

  const filteredItems = getFilteredItems(
    items,
    isWithinSelectedCourses,
    isWithinSelectedDifficultyLevels,
    isWithinSelectedTrainers,
    isWithinSelectedDuration,
  );

  if (!filteredItems.length) {
    return (
      <>
        <h1 className={sharedStyles.noDataTitle}>
          Es wurden keine Videos gefunden, die deinen Filtern entsprechen.
        </h1>
      </>
    );
  }

  return (
    <>
      {
        filteredItems.map(({
          entity: {
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
            duration,
            user: { playAmount, playedInPercent },
          },
          fav: {
            id: favId,
            data: { note: favNote, difficulty: favDifficulty },
          },
        }) => (
          <div key={id} className={styles.item}>
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
              favId={favId}
              favNote={favNote}
              favDifficulty={favDifficulty}
              isFav
            />
          </div>
        ))
      }
    </>
  );
};

export const filtersModel = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    checked: PropTypes.bool,
  }),
);

FavoriteVideos.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(video).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isWithinSelectedCourses: PropTypes.func.isRequired,
  isWithinSelectedDifficultyLevels: PropTypes.func.isRequired,
  isWithinSelectedTrainers: PropTypes.func.isRequired,
  isWithinSelectedDuration: PropTypes.func.isRequired,
};

export default FavoriteVideos;
