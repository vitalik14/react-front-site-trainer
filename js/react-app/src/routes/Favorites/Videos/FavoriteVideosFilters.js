import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

import styles from './FavoriteVideos.scss';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import { filtersModel } from './FavoriteVideos';

const StyledCollapse = withStyles({
  entered: {
    padding: 2,
    margin: -2,
  },
})(Collapse);

const StyledPaper = withStyles({
  root: {
    marginTop: -6,
    padding: '10px 0px 0 15px',
  },
})(Paper);

const renderCheckbox = (
  { id, name, checked }, // eslint-disable-line react/prop-types
  type,
  onFilterToggle,
) => (
  <FormControlLabel
    key={id}
    label={name}
    control={(
      <Checkbox
        checked={checked}
        onChange={() => onFilterToggle(type, id)}
      />
    )}
  />
);

const renderRadio = (value, checkedValue, onChange, idx) => (
  <FormControlLabel
    key={idx}
    label={value}
    control={(
      <Radio
        checked={idx === checkedValue}
        onChange={() => onChange(value)}
      />
    )}
  />
);

const renderFilters = (title, isFetching, filters, callback) => (
  <div>
    <div className={styles.filtersInnerWrap}>
      {title && <h5 className={styles.filterTitle}>{title}</h5>}
      {isFetching && <Loader />}
      {!isFetching && (
        <FormGroup>
          {filters.map(callback)}
        </FormGroup>
      )}
    </div>
  </div>
);

const FavoriteVideosFilters = ({
  filters: {
    course: courseFilters,
    trainer: trainerFilters,
    difficulty: difficultyFilters,
    duration: durationFilters,
    durationValue,
  },
  areMobileFiltersShown,
  mobileFiltersShownStates,
  isFetchingCourseFilters,
  isFetchingTrainers,
  onFilterToggle,
  onMobileFiltersToggle,
  onDurationChange,
}) => (
  <div>
    {!areMobileFiltersShown && (
      <div>
        {renderFilters('KURS', isFetchingCourseFilters, courseFilters, filter => renderCheckbox(filter, 'course', onFilterToggle))}
        {renderFilters('SCHWIERIGKEIT', false, difficultyFilters, filter => renderCheckbox(filter, 'difficulty', onFilterToggle))}
        {renderFilters('DAUER', false, durationFilters, (value, idx) => renderRadio(value, durationValue, onDurationChange, idx))}
        {renderFilters('TRAINERS', isFetchingTrainers, trainerFilters, filter => renderCheckbox(filter, 'trainer', onFilterToggle))}
      </div>
    )}
    {
      areMobileFiltersShown && (
        <div>
          <div className={styles.mobileSingleTypeFiltersCont}>
            <Button variant="contained" onClick={() => onMobileFiltersToggle('course')}>Kursfilter umschalten</Button>
            <StyledCollapse in={mobileFiltersShownStates.course}>
              <StyledPaper>
                {renderFilters(null, isFetchingCourseFilters, courseFilters, filter => renderCheckbox(filter, 'course', onFilterToggle))}
              </StyledPaper>
            </StyledCollapse>
          </div>
          <div className={styles.mobileSingleTypeFiltersCont}>
            <Button variant="contained" onClick={() => onMobileFiltersToggle('difficulty')}>Schwierigkeitsgradfilter umschalten</Button>
            <StyledCollapse in={mobileFiltersShownStates.difficulty}>
              <StyledPaper>
                {renderFilters(null, false, difficultyFilters, filter => renderCheckbox(filter, 'difficulty', onFilterToggle))}
              </StyledPaper>
            </StyledCollapse>
          </div>
          <div className={styles.mobileSingleTypeFiltersCont}>
            <Button variant="contained" onClick={() => onMobileFiltersToggle('duration')}>Toggle-Dauerfilter</Button>
            <StyledCollapse in={mobileFiltersShownStates.duration}>
              <StyledPaper>
                {renderFilters(null, false, durationFilters,
                  (value, idx) => renderRadio(value, durationValue, onDurationChange, idx))}
              </StyledPaper>
            </StyledCollapse>
          </div>
          <div className={styles.mobileSingleTypeFiltersCont}>
            <Button variant="contained" onClick={() => onMobileFiltersToggle('trainer')}>Toggle Trainer Filter</Button>
            <StyledCollapse in={mobileFiltersShownStates.trainer}>
              <StyledPaper>
                {renderFilters(null, isFetchingTrainers, trainerFilters, filter => renderCheckbox(filter, 'trainer', onFilterToggle))}
              </StyledPaper>
            </StyledCollapse>
          </div>
        </div>
      )
    }
  </div>
);

FavoriteVideosFilters.propTypes = {
  filters: PropTypes.shape({
    course: filtersModel,
    trainer: filtersModel,
    difficulty: filtersModel,
    duration: PropTypes.arrayOf(PropTypes.string),
    durationValue: PropTypes.number.isRequired,
  }).isRequired,
  areMobileFiltersShown: PropTypes.bool.isRequired,
  mobileFiltersShownStates: PropTypes.objectOf(PropTypes.bool).isRequired,
  onMobileFiltersToggle: PropTypes.func.isRequired,
  onFilterToggle: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
  isFetchingTrainers: PropTypes.bool.isRequired,
  isFetchingCourseFilters: PropTypes.bool.isRequired,
};

export default FavoriteVideosFilters;
