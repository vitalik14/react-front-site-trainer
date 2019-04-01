import React from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import styles from './Trainers.scss';
import trainer from '../../common/models/trainer';
import TrainerGridItem from '../../common/components/GridItems/Trainer/TrainerGridItem';

const Trainers = ({ baseDomain, trainers, isFetchingTrainers }) => (
  <>
    <h1 className={styles.title}>Unsere Trainer</h1>
    {isFetchingTrainers && <Loader />}
    {!isFetchingTrainers && (
      <div className="gridWrapper">
        {trainers.map(({
          id: trainerId,
          name,
          videosCount,
          user: {
            profilePicUrl,
            id: userId,
          },
        }) => (
          <div className="gridItem" key={trainerId}>
            <TrainerGridItem
              baseDomain={baseDomain}
              userId={userId}
              trainerId={trainerId}
              name={name}
              videosCount={videosCount}
              profilePicUrl={profilePicUrl}
            />
          </div>
        ))}
      </div>
    )}
  </>
);

Trainers.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  trainers: PropTypes.arrayOf(trainer).isRequired,
  isFetchingTrainers: PropTypes.bool.isRequired,
};

export default Trainers;
