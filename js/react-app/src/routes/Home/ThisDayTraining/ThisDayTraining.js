import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './ThisDayTraining.scss';

const ThisDayTraining = ({ baseDomain }) => (
  <div>
    <h2 className={styles.heading}>Dein heutiges Training</h2>
    <div className={styles.flexCont}>
      <div className={styles.flexItem}>
        <a href={`${baseDomain}/kurse/wochenplan`} className={styles.block}>
          <h3 className={styles.blockTitle}>
            Plan Erstellen
          </h3>
        </a>
      </div>
      <div className={styles.flexItem}>
        <a href={`${baseDomain}/you/trainingplans`} className={styles.block}>
          <h3 className={styles.blockTitle}>
            Рlan Wahlen
          </h3>
        </a>
      </div>
    </div>
  </div>
);

ThisDayTraining.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default ThisDayTraining;
