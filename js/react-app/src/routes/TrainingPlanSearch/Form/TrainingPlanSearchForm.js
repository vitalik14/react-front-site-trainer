import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import styles from './TrainingPlanSearchForm.scss';
import { PrimaryButton, TextDarkGreyButton } from '../../../common/customizedMaterialComponents';

const goals = [
  { id: 1, label: 'Abnehmen' },
  { id: 2, label: 'Muskeln aufbauen' },
  { id: 3, label: 'Schmerzen lindern' },
  { id: 4, label: 'Fit werden' },
];

const dietOptions = ['Keine Besonderheiten', 'Vegetarier', 'Vegan'];

const activityOptions = ['Kaum Bewegung', 'Wenig Bewegung', 'Mäßige Bewegung', 'Viel Bewegung', 'Sehr Viel Bewegung'];

const StyledPaper = withStyles({
  root: {
    padding: 6,
  },
})(Paper);

const TrainingPlanSearchForm = ({
  baseDomain,
  preferenceFieldValues,
  isPreferencesFilterOn,
  onPreferencesFilterToggle,
  selectedGoal,
  onGoalSelect,
  onPreferenceChange,
  onSubmit,
  formTouched,
  preferencesTouched,
  touchedPreferences,
  isPreferencesChangeWarningPopoverOpen,
  onPreferencesChangeWarningPopoverOpen,
  onPreferencesChangeWarningPopoverClose,
  onPreferencesRevert,
}) => (
  <div className={styles.block}>
    <h4 className={styles.title}>
      Mein Ziel
    </h4>
    <FormControl component="fieldset">
      <RadioGroup
        className={styles.radioGroup}
        aria-label="Mein Ziel"
        name="goal"
        value={String(selectedGoal)}
        onChange={onGoalSelect}
        row
      >
        {
          goals.map(({ id, label }) => (
            <FormControlLabel
              key={id}
              value={String(id)}
              label={label}
              control={<Radio />}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
    <div className={styles.preferencesFilterWrap}>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox checked={isPreferencesFilterOn} onChange={onPreferencesFilterToggle} />
          }
          label="Filtern Sie nach meinen Vorlieben"
        />
      </FormControl>
    </div>
    <h4 className={styles.title} style={{ opacity: isPreferencesFilterOn ? 1 : 0.5 }}>
      Über mich
    </h4>
    <div className={styles.fieldsCont}>
      <TextField
        label={`Birthday${touchedPreferences.indexOf('birthday') !== -1 ? ' *' : ''}`}
        value={preferenceFieldValues.birthday}
        onChange={onPreferenceChange('birthday')}
        disabled={!isPreferencesFilterOn}
        type="date"
      />
      <TextField
        label={`Gewicht (kg)${touchedPreferences.indexOf('weight') !== -1 ? ' *' : ''}`}
        value={preferenceFieldValues.weight}
        onChange={onPreferenceChange('weight')}
        disabled={!isPreferencesFilterOn}
        type="number"
      />
      <TextField
        label={`Körpergröße (cm)${touchedPreferences.indexOf('size') !== -1 ? ' *' : ''}`}
        value={preferenceFieldValues.size}
        onChange={onPreferenceChange('size')}
        disabled={!isPreferencesFilterOn}
        type="number"
      />
    </div>
    <p className={styles.title} style={{ opacity: isPreferencesFilterOn ? 1 : 0.5 }}>
      Gesundheit
    </p>
    <div className={styles.fieldsCont}>
      <FormControl>
        <InputLabel htmlFor="diet-disabled">
          Ernährung
          {touchedPreferences.indexOf('diet') !== -1 ? ' *' : ''}
        </InputLabel>
        <Select
          value={preferenceFieldValues.diet}
          onChange={onPreferenceChange('diet')}
          name="diet"
          displayEmpty
          input={<Input name="diet-disabled" id="diet-disabled" />}
          disabled={!isPreferencesFilterOn}
        >
          <MenuItem value={0} disabled>Wählen</MenuItem>
          <MenuItem value={1}>{dietOptions[0]}</MenuItem>
          <MenuItem value={2}>{dietOptions[1]}</MenuItem>
          <MenuItem value={3}>{dietOptions[2]}</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="activity-disabled">
          Bewegung im Alltag
          {touchedPreferences.indexOf('activity') !== -1 ? ' *' : ''}
        </InputLabel>
        <Select
          value={preferenceFieldValues.activity}
          onChange={onPreferenceChange('activity')}
          name="activity"
          displayEmpty
          input={<Input name="activity-disabled" id="activity-disabled" />}
          disabled={!isPreferencesFilterOn}
        >
          <MenuItem value={0} disabled>Wählen</MenuItem>
          <MenuItem value={1}>{activityOptions[0]}</MenuItem>
          <MenuItem value={2}>{activityOptions[1]}</MenuItem>
          <MenuItem value={3}>{activityOptions[2]}</MenuItem>
          <MenuItem value={4}>{activityOptions[3]}</MenuItem>
          <MenuItem value={5}>{activityOptions[4]}</MenuItem>
        </Select>
      </FormControl>
      <div />
    </div>
    <div className={styles.buttonsWrap}>
      <PrimaryButton
        id="submit-search-btn"
        onClick={onSubmit}
        disabled={!(formTouched || preferencesTouched)}
        onMouseEnter={onPreferencesChangeWarningPopoverOpen}
        onMouseLeave={onPreferencesChangeWarningPopoverClose}
        style={{ position: 'relative' }}
      >
        Plan finden
        {isPreferencesChangeWarningPopoverOpen && (
          <Grow
            id="preferences-change-warning-popover"
            className={styles.preferencesChangeWarningPopover}
            in={isPreferencesChangeWarningPopoverOpen}
          >
            <div>
              <StyledPaper>
                <p className={styles.preferenceChangeWarningText}>
                  Hinweis: Sie werden die entsprechenden Einstellungen (*)
                  von Ihnen aktualisieren, indem Sie auf diese Schaltfläche klicken
                </p>
                <TextDarkGreyButton style={{ width: '100%' }} variant="outlined" component="div" onClick={onPreferencesRevert}>
                  Revert
                </TextDarkGreyButton>
              </StyledPaper>
            </div>
          </Grow>
        )}
      </PrimaryButton>
      <TextDarkGreyButton href={`${baseDomain}/kurse/trainingplans`}>
        Alle traningsplane
      </TextDarkGreyButton>
    </div>
  </div>
);

TrainingPlanSearchForm.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  preferenceFieldValues: PropTypes.shape({
    birthday: PropTypes.string,
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    diet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    activity: PropTypes.number,
    goal: PropTypes.number,
    specialTags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  isPreferencesFilterOn: PropTypes.bool.isRequired,
  onPreferencesFilterToggle: PropTypes.func.isRequired,
  selectedGoal: PropTypes.number.isRequired,
  onGoalSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPreferenceChange: PropTypes.func.isRequired,
  formTouched: PropTypes.bool.isRequired,
  preferencesTouched: PropTypes.bool.isRequired,
  touchedPreferences: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPreferencesChangeWarningPopoverOpen: PropTypes.bool.isRequired,
  onPreferencesChangeWarningPopoverOpen: PropTypes.func.isRequired,
  onPreferencesChangeWarningPopoverClose: PropTypes.func.isRequired,
  onPreferencesRevert: PropTypes.func.isRequired,
};

export default TrainingPlanSearchForm;
