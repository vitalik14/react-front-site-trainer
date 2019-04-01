import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ButtonLoader.scss';

const ButtonLoader = ({ color }) => (
  <div className={styles.wrapper} style={{ color }}>
    <CircularProgress color="inherit" size={16} />
  </div>
);

ButtonLoader.propTypes = {
  color: PropTypes.string,
};

ButtonLoader.defaultProps = {
  color: '#CFD8DC',
};

export default ButtonLoader;
