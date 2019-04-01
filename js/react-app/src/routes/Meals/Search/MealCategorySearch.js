import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

import styles from './MealCategorySearch.scss';
import { PrimaryButton } from '../../../common/customizedMaterialComponents';

const MealCategorySearch = ({
  value, onChange, onKeyUp, onSubmit,
}) => (
  <div className={styles.searchBlock}>
    <TextField
      label="Suchen"
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
    <PrimaryButton
      style={{ height: 32 }}
      disabled={!value}
      onClick={onSubmit}
    >
      SUCHEN
    </PrimaryButton>
  </div>
);

MealCategorySearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MealCategorySearch;
