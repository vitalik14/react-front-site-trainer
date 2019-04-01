import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import styles from './TrainingPlansFilters.scss';
import { StyledRadio, PrimaryButton, TextDarkGreyButton } from '../../../common/customizedMaterialComponents';
import Loader from '../../../common/components/Loaders/Layout/LayoutLoader';
import trainer from '../../../common/models/trainer';

const orders = [
  { value: 'durationAsc', label: 'Aktualität' },
  { value: 'nameAsc', label: 'Name (A-Z)' },
  { value: 'nameDesc', label: 'Name (Z-A)' },
  { value: 'dateAsc', label: 'Dauer (aufsteigend)' },
  { value: 'dateDesc', label: 'Dauer (absteigend)' },
];

const levels = [
  { value: 0, label: 'Beliebig' },
  { value: 1, label: 'Leicht' },
  { value: 2, label: 'Mittel' },
  { value: 3, label: 'Schwer' },
];

export default class TrainingPlansFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOrder: 'durationAsc',
      selectedTrainerId: 0,
      selectedLevel: 0,
      selectedGoal: 0,
    };

    this.setFilter = this.setFilter.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setFilter(type, value) {
    this.setState({ [type]: value });
  }

  handleClear() {
    this.setState({
      selectedOrder: 'dateDesc',
      selectedTrainerId: 0,
      selectedLevel: 0,
      selectedGoal: 0,
    });
  }

  handleSubmit() {
    const {
      state: {
        selectedOrder,
        selectedTrainerId,
        selectedLevel,
        selectedGoal,
      },
      props: { reloadPlans },
    } = this;
    reloadPlans(selectedOrder, selectedTrainerId, selectedLevel, selectedGoal);
  }

  render() {
    const {
      state: {
        selectedOrder,
        selectedTrainerId,
        selectedLevel,
        selectedGoal,
      },
      props: {
        isFetchingTrainers,
        isFetchingGoals,
        trainers,
        goals,
      },
    } = this;
    return (
      <div className={styles.block}>
        <section className={styles.section}>
          <h5 className={styles.sectionTitle}>SORTIEREN NACH</h5>
          <FormGroup style={{ padding: '0 6px' }}>
            {orders.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                label={label}
                control={(
                  <StyledRadio
                    checked={selectedOrder === value}
                    onChange={() => this.setFilter('selectedOrder', value)}
                  />
                )}
              />
            ))}
          </FormGroup>
        </section>
        <section className={styles.section}>
          <h5 className={styles.sectionTitle}>SCHWIERIGKEITSGRAD</h5>
          <FormGroup style={{ padding: '0 6px' }}>
            {levels.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                label={label}
                control={(
                  <StyledRadio
                    checked={selectedLevel === value}
                    onChange={() => this.setFilter('selectedLevel', value)}
                  />
                )}
              />
            ))}
          </FormGroup>
        </section>
        <section className={styles.section}>
          <h5 className={styles.sectionTitle}>TRAINER</h5>
          <FormControl fullWidth style={{ marginBottom: 10 }}>
            <Select
              value={selectedTrainerId}
              onChange={({ target: { value } }) => this.setFilter('selectedTrainerId', value)}
              name="trainer"
              displayEmpty
            >
              <MenuItem value={0} selected disabled>Beliebig</MenuItem>
              {isFetchingTrainers && <Loader />}
              {!isFetchingTrainers && trainers.map(({ id, name }) => (
                <MenuItem
                  key={id}
                  value={id}
                  selected={selectedTrainerId === id}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>
        <section className={styles.section}>
          <h5 className={styles.sectionTitle}>ZIEL</h5>
          {isFetchingGoals && <Loader />}
          {!isFetchingGoals && (
            <FormGroup style={{ padding: '0 6px' }}>
              {[{ id: 0, name: 'Beliebig' }].concat(goals).map(({ id, name }) => (
                <FormControlLabel
                  key={id}
                  label={name}
                  control={(
                    <StyledRadio
                      checked={selectedGoal === id}
                      onChange={() => this.setFilter('selectedGoal', id)}
                    />
                  )}
                />
              ))}
            </FormGroup>
          )}
        </section>
        <div className={styles.buttonsWrapper}>
          <TextDarkGreyButton onClick={this.handleClear}>
            ABSCHAFFEN
          </TextDarkGreyButton>
          <PrimaryButton onClick={this.handleSubmit}>
            SUCHEN
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

TrainingPlansFilters.propTypes = {
  isFetchingTrainers: PropTypes.bool.isRequired,
  isFetchingGoals: PropTypes.bool.isRequired,
  trainers: PropTypes.arrayOf(trainer).isRequired,
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  reloadPlans: PropTypes.func.isRequired,
};
