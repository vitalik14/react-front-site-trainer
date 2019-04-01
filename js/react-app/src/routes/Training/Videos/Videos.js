import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import SliderContainer from '../../../common/components/Slider/SliderContainer';
import VideoGridItem from '../../../common/components/GridItems/Video/VideoGridItem';
import video from '../../../common/models/video';
import routeStyles from '../Training.scss';
import componentStyles from './Videos.scss';
import { TextBlueButton } from '../../../common/customizedMaterialComponents';

const Videos = ({
  baseDomain,
  isFetching,
  items,
}) => {
  if (isFetching) {
    return (
      <div className={routeStyles.loaderCont}>
        <CircularProgress />
      </div>
    );
  }

  if (!items.length) {
    return <p>Keine Videos verfügbar ¯\_(ツ)_/¯</p>;
  }

  return (
    <div className={componentStyles.cont}>
      <SliderContainer
        title="Neue Videos"
        buttons={[
          <TextBlueButton href={`${baseDomain}/videos`} style={{ marginRight: 10 }}>
            ALLE VIDEOS
          </TextBlueButton>,
        ]}
        slides={
          items.map(({
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
            <VideoGridItem
              key={id}
              id={id}
              baseDomain={baseDomain}
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
              favDifficulty={favDifficulty}
            />
          ))
        }
      />
    </div>
  );
};

Videos.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(video).isRequired,
};

export default Videos;
