import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './LayoutLoader.scss';

export default () => (
  <div className={styles.wrapper}>
    <CircularProgress color="inherit" />
  </div>
);
