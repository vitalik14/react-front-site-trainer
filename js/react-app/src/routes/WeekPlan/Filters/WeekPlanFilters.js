import React from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';

import { TextDarkGreyButton, TextPinkButton } from '../../../common/customizedMaterialComponents';
import styles from './WeekPlanFilters.scss';

const WeekPlanFilters = ({
  filters,
  onToggle,
  onApply,
  onClear,
}) => (
  <div className={styles.block}>
    <h3 className={styles.title}>KATEGORIE</h3>
    <FormGroup>
      {
        filters.map(({ id, label, checked }) => (
          <FormControlLabel
            key={id}
            label={label}
            control={(
              <Checkbox
                checked={checked}
                onChange={() => onToggle(id)}
              />
            )}
          />
        ))
      }
    </FormGroup>
    <div className={styles.buttonsWrapper}>
      <TextDarkGreyButton onClick={onClear}>ABSCHAFFEN</TextDarkGreyButton>
      <TextPinkButton onClick={onApply}>FILTERN</TextPinkButton>
    </div>
  </div>
);

WeekPlanFilters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      checked: PropTypes.bool,
    }),
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default WeekPlanFilters;
