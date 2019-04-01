import React from 'react';
import { PropTypes } from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import styles from './RadioRangePicker.scss';
import { StyledLabel, StyledRadio } from '../../customizedMaterialComponents';

const RadioRangePicker = ({ value, onQuickRangeChange }) => (
  <FormControl component="fieldset">
    <RadioGroup
      aria-label="Range"
      name="range"
      value={value}
      onChange={({ target: { value: range } }) => onQuickRangeChange(range)}
      className={styles.formGroup}
    >
      <StyledLabel value="week" control={<StyledRadio />} label="Week" />
      <StyledLabel value="month" control={<StyledRadio />} label="Month" />
      <StyledLabel value="year" control={<StyledRadio />} label="Year" />
    </RadioGroup>
  </FormControl>
);

RadioRangePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onQuickRangeChange: PropTypes.func.isRequired,
};

export default RadioRangePicker;
