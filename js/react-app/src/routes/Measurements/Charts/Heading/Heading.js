import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Heading.scss';

const Heading = ({ title, measure }) => (
  <div>
    <h2 className={styles.title}>
      {title}
      {measure && (
        <span className={styles.measure}>
          {measure}
        </span>
      )}
    </h2>
  </div>
);

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
};

export default Heading;
