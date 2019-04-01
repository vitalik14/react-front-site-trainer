import React from 'react';
import { PropTypes } from 'prop-types';
import { Slider } from 'material-ui-slider';

import styles from './MealCategoryFilters.scss';
import { TextLightGreyButton, TextPinkButton } from '../../../common/customizedMaterialComponents';

const MealCategoryFilters = ({
  selectedRanges,
  onRangeInputChange,
  onClear,
  onSubmit,
}) => (
  <div className={styles.block}>
    <p className={styles.label}>{`KILOKALORIEN: ${selectedRanges.kcal[0]} – ${selectedRanges.kcal[1]}`}</p>
    <div className={styles.sliderWrapper}>
      <Slider
        range
        color="#304FFE"
        max={1500}
        value={[selectedRanges.kcal[0], selectedRanges.kcal[1]]}
        onChange={values => onRangeInputChange('kcal', values)}
      />
    </div>
    <p className={styles.label}>{`KOHLENHYDRATE: ${selectedRanges.carbs[0]} – ${selectedRanges.carbs[1]}`}</p>
    <div className={styles.sliderWrapper}>
      <Slider
        range
        color="#304FFE"
        max={300}
        value={[selectedRanges.carbs[0], selectedRanges.carbs[1]]}
        onChange={values => onRangeInputChange('carbs', values)}
      />
    </div>
    <p className={styles.label}>{`PROTEINE: ${selectedRanges.protein[0]} – ${selectedRanges.protein[1]}`}</p>
    <div className={styles.sliderWrapper}>
      <Slider
        range
        color="#304FFE"
        max={200}
        value={[selectedRanges.protein[0], selectedRanges.protein[1]]}
        onChange={values => onRangeInputChange('protein', values)}
      />
    </div>
    <p className={styles.label}>{`FETTE: ${selectedRanges.fat[0]} – ${selectedRanges.fat[1]}`}</p>
    <div className={styles.sliderWrapper}>
      <Slider
        range
        color="#304FFE"
        max={150}
        value={[selectedRanges.fat[0], selectedRanges.fat[1]]}
        onChange={values => onRangeInputChange('fat', values)}
      />
    </div>
    <div className={styles.buttonsWrap}>
      <TextLightGreyButton onClick={onClear}>
        Abschaffen
      </TextLightGreyButton>
      <TextPinkButton onClick={onSubmit}>
        Suchen
      </TextPinkButton>
    </div>
  </div>
);

MealCategoryFilters.propTypes = {
  selectedRanges: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ),
  ).isRequired,
  onRangeInputChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MealCategoryFilters;
