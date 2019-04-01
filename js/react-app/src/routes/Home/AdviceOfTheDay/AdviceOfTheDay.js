import React from 'react';
import { PropTypes } from 'prop-types';

import { GreyQuoteIcon } from '../customizedMaterialComponents';
import styles from './AdviceOfTheDay.scss';

const AdviceOfTheDay = ({ advice }) => (
  <div className={styles.parentCont}>
    <h2 className={styles.heading}>Tipp des Tages</h2>
    <div className={styles.adviceCont}>
      <div className={styles.quoteIconCont}>
        <GreyQuoteIcon />
      </div>
      <div>
        <p className={styles.advice}>{advice}</p>
      </div>
    </div>
  </div>
);

AdviceOfTheDay.propTypes = {
  advice: PropTypes.string.isRequired,
};

export default AdviceOfTheDay;
