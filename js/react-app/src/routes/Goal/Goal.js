import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './Goal.scss';
import { PrimaryButton, StyledRadio } from '../../common/customizedMaterialComponents';
import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';
import ButtonLoader from '../../common/components/Loaders/Button/ButtonLoader';
import { updatePreferences } from '../../common/services/user';
import handleError from '../../common/errorHandler';

const goals = [
  { id: 1, label: 'Abnehmen' },
  { id: 2, label: 'Muskeln aufbauen' },
  { id: 3, label: 'Schmerzen lindern' },
  { id: 4, label: 'Fit werden' },
];

const dietOptions = ['Keine Besonderheiten', 'Vegetarier', 'Vegan'];

const activityOptions = ['Kaum Bewegung', 'Wenig Bewegung', 'Mäßige Bewegung', 'Viel Bewegung', 'Sehr Viel Bewegung'];

export default class Goal extends Component {
  state = {
    goal: 0,
    birthday: '',
    weight: '',
    size: '',
    diet: 0,
    activity: 0,
    isUpdating: false,
    elperDateText: "Der Wert ist ungültig",
	  inputDateCorrect: false
  };

  setPreference = name => (el) => {
	  switch (name) {
		  case 'size':
		  case 'weight': 
			  el.target.value = String(el.target.value).replace('-', '');
        break;
		  case 'birthday':
		  	  this.setState({inputDateCorrect: false });
			  return;
	  }
	  
	  this.setState({ [name]: el.target.value });
  }

  setPreferenceOut = name => (el) => {
		if (name === "weight") {
			let val = el.target.value;
			el.target.value = val > 300?300: (val < 40 && val > 0)? 40:el.target.value;
		} else if (name === "size") {
			let val = el.target.value;
			el.target.value = val > 300?300: (val < 50 && val > 0)? 50:el.target.value;
		} else if (name === "birthday") {
			let year = new Date().getFullYear();
			let dateMin18 = new Date().setFullYear(year - 18);
			let dateMax99 = new Date().setFullYear(year - 99);

			if (+new Date(el.target.value) > dateMin18) {
				el.target.value = new Date(dateMin18).toLocaleDateString().split('.').reverse().join('-');
				this.setState({inputDateCorrect: true });

			} else if(+new Date(el.target.value) < dateMax99) {
				el.target.value = new Date(dateMax99).toLocaleDateString().split('.').reverse().join('-');
				this.setState({inputDateCorrect: true });
			}
		}

		this.setState({ [name]: el.target.value });
  }

  updatePreferences = () => {
    const {
      state: {
        goal,
        birthday,
        weight,
        size,
        diet,
        activity,
      },
    } = this;
    this.setState({ isUpdating: true });
    updatePreferences({
      goal,
      birthday,
      weight,
      size,
      diet,
      activity,
    })
      .then(() => this.setState({ isUpdating: false }))
      .catch(handleError);
  };


  render() {
    const {
      state: {
        goal,
        diet,
        activity,
        isUpdating,
        helperDateText,
		    inputDateCorrect
      },
      props: {
        loading,
        data: {
          goal: initialGoal,
          birthday: initialBirthday,
          weight: initialWeight,
          size: initialSize,
          diet: initialDiet,
          activity: initialActivity,
        },
      },
    } = this;

    if (loading) return <LayoutLoader />;

    return (
      <div className={styles.block}>
        <p className={styles.description}>
          Hier kannst Du Deine persönlichen Angaben hinterlegen,
          um pur-life auf Dich anzupassen und den perfekten
          Trainingsplan zu finden.
        </p>
        <h4 className={styles.title}>Ich will</h4>
        <div className={styles.fieldsCont}>
          <FormControl component="fieldset">
            <RadioGroup
              className={styles.radioGroup}
              aria-label="Mein Ziel"
              name="goal"
              value={String(goal || initialGoal)}
              onChange={this.setPreference('goal')}
              row
            >
              {
                goals.map(({ id, label }) => (
                  <FormControlLabel
                    key={id}
                    value={String(id)}
                    label={label}
                    control={<StyledRadio />}
                  />
                ))
              }
            </RadioGroup>
          </FormControl>
        </div>
        <h4 className={styles.title}>Über mich</h4>
        <div className={styles.fieldsCont}>
          <TextField
            label="Geburtsdatum"
            helperText={inputDateCorrect && helperDateText}
            defaultValue={initialBirthday}
            onChange={this.setPreference('birthday')}
            onBlur={this.setPreferenceOut('birthday')}
            type="date"
            required={ true }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Gewicht (kg)"
            defaultValue={initialWeight}
			      onChange={this.setPreference('weight')}
			      onBlur={this.setPreferenceOut('weight')}
            type="number"
          />
          <TextField
            label="Körpergröße (cm)"
            defaultValue={initialSize}
            onChange={this.setPreference('size')}
            onBlur={this.setPreferenceOut('size')}
            type="number"
          />
        </div>
        <p className={styles.title}>
          Gesundheit
        </p>
        <div className={styles.fieldsCont}>
          <FormControl>
            <InputLabel htmlFor="diet-disabled">Ernährung</InputLabel>
            <Select
              value={diet || initialDiet}
              onChange={this.setPreference('diet')}
              name="diet"
              displayEmpty
              input={<Input name="diet-disabled" id="diet-disabled" />}
            >
              <MenuItem value={0} disabled><em>Wählen</em></MenuItem>
              <MenuItem value={1}>{dietOptions[0]}</MenuItem>
              <MenuItem value={2}>{dietOptions[1]}</MenuItem>
              <MenuItem value={3}>{dietOptions[2]}</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="activity-disabled">Bewegung im Alltag</InputLabel>
            <Select
              value={activity || initialActivity}
              onChange={this.setPreference('activity')}
              name="activity"
              displayEmpty
              input={<Input name="activity-disabled" id="activity-disabled" />}
            >
              <MenuItem value={0} disabled><em>Wählen</em></MenuItem>
              <MenuItem value={1}>{activityOptions[0]}</MenuItem>
              <MenuItem value={2}>{activityOptions[1]}</MenuItem>
              <MenuItem value={3}>{activityOptions[2]}</MenuItem>
              <MenuItem value={4}>{activityOptions[3]}</MenuItem>
              <MenuItem value={5}>{activityOptions[4]}</MenuItem>
            </Select>
          </FormControl>
          <div />
        </div>
        <div className={styles.buttonWrap}>
          <PrimaryButton id="submit-btn" onClick={this.updatePreferences}>
            SPEICHERN
            {isUpdating && <ButtonLoader color="#ffffff" />}
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

Goal.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    birthday: PropTypes.string,
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    diet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    activity: PropTypes.number,
    goal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    specialTags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};
