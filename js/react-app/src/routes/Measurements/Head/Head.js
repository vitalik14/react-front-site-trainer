import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Head.scss';

import { StyledButton } from '../customizedMaterialComponents';

const Head = ({ heading, openMeasurementAddingModal }) => (
  <div className={styles.topCont}>
    <h2 className={styles.heading}>
      {heading}
    </h2>
    <div>
      <StyledButton onClick={openMeasurementAddingModal}>
        Messung
      </StyledButton>
    </div>
  </div>
);

Head.propTypes = {
  heading: PropTypes.string.isRequired,
  openMeasurementAddingModal: PropTypes.func.isRequired,
};

export default Head;
