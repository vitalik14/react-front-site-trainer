import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

import styles from './AddMeasurementModal.scss';
import {
  StyledFormLabel,
  StyledFormControlLabel,
  AddButton
} from './customizedMaterialComponents';

const requiredFields = [
  {
    label: 'Oberarm',
    measure: 'cm',
    name: 'arm',
    inputprops: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '100', step: '1' }}
      />
    )
  },
  {
    label: 'Brust',
    measure: 'cm',
    name: 'chest',
    inputprops: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '100', step: '1' }}
      />
    )
  },
  {
    label: 'Taille',
    measure: 'cm',
    name: 'waist',
    inputprops: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '250', step: '1' }}
      />
    )
  },
  {
    label: 'Hüfte',
    measure: 'cm',
    name: 'hip',
    inputprops: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '100', step: '1' }}
      />
    )
  },
  {
    label: 'Oberschenkel',
    measure: 'cm',
    name: 'leg',
    inputprops: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '150', step: '1' }}
      />
    )
  },
  {
    label: 'Gewicht',
    measure: 'kg',
    name: 'weight',
    inputprops: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '200', step: '1' }}
      />
    )
  }
];

const optionalFields = [
  {
    label: 'Fettanteil',
    measure: '%',
    name: 'fat',
    inputpropsOptional: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '100', step: '1' }}
      />
    )
  },
  {
    label: ' Wasseranteil',
    measure: '%',
    name: 'water',
    inputpropsOptional: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '100', step: '1' }}
      />
    )
  },
  {
    label: 'Muskelmasse',
    measure: 'kg',
    name: 'muscles',
    inputpropsOptional: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '50', step: '1' }}
      />
    )
  },
  {
    label: 'Knochenmasse',
    measure: 'kg',
    name: 'bones',
    inputpropsOptional: (
      <TextField
        placeholder="0"
        type="number"
        inputProps={{ min: '0', max: '100', step: '1' }}
      />
    )
  }
];

export default class AddMeasurementModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [],
      errorLabelsShownState: {
        atLeastOneRequired: false
      }
    };

    this.addInputToState = this.addInputToState.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidUpdate() {
    const {
      props: { isShown },
      state: { inputs }
    } = this;
    if (isShown === false && inputs.length > 0) {
      this.onClose();
    }
  }

  onClose() {
    this.setState({ inputs: [] });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const {
      state: { inputs }
    } = this;
    const values = inputs.map(({ value }) => value);
    const allEmpty = !values.some(value => !!value);
    if (allEmpty) {
      this.setState({
        errorLabelsShownState: {
          atLeastOneRequired: true
        }
      });
      return;
    }

    this.setState({
      errorLabelsShownState: {
        atLeastOneRequired: false
      }
    });

    const {
      props: { addMeasurement, close }
    } = this;
    const apiData = inputs.reduce((acc, { name, value }) => {
      acc[name] = +value;
      return acc;
    }, {});

    addMeasurement(apiData);
    close();
  }

  addInputToState(element) {
    this.setState(({ inputs }) => ({
      inputs: inputs.concat(element)
    }));
  }

  render() {
    const {
      state: {
        errorLabelsShownState: { atLeastOneRequired }
      },
      props: { isShown, close }
    } = this;
    return (
      <Modal open={isShown}>
        <div className={styles.cont}>
          <div className={styles.topCont}>
            <h1 className={styles.heading}>Neue Messung</h1>
            <div className={styles.closeIconCont}>
              <CloseIcon onClick={close} color="inherit" fontSize="inherit" />
            </div>
          </div>
          <p className={styles.description}>
            Hier kannst Du Deine aktuellen Messwerte (in cm) angeben. Deine
            Angaben werden jedes mal neu gespeichert und zu den alten Daten
            hinzugefügt, wenn Du Sie einträgst. Einen Verlauf Deiner Messungen
            kannst Du Dir dann unter Statistik anschauen.
          </p>
          <form onSubmit={this.handleFormSubmit}>
            <StyledFormLabel component="legend">Körpermaße</StyledFormLabel>
            <div className={styles.fieldsCont}>
              {requiredFields.map(({
                label, measure, name, inputprops
              }) => (
                <StyledFormControlLabel
                  key={name}
                  className={styles.controlLabel}
                  name={name}
                  control={inputprops}
                  label={label}
                  inputRef={this.addInputToState}
                  data-measure={measure}
                />
              ))}
            </div>
            <StyledFormLabel component="legend">
              Körpermaße (optional)
            </StyledFormLabel>
            <div className={styles.fieldsCont}>
              {optionalFields.map(
                ({
                  label, measure, name, inputpropsOptional
                }) => (
                  <StyledFormControlLabel
                    key={name}
                    className={styles.controlLabel}
                    name={name}
                    control={inputpropsOptional}
                    label={label}
                    inputRef={this.addInputToState}
                    data-measure={measure}
                  />
                )
              )}
            </div>
            {atLeastOneRequired && (
              <p className={styles.errorLabel}>
                Mindestens ein Feld ist erforderlich
              </p>
            )}
            <AddButton type="submit">SPEICHERN</AddButton>
          </form>
        </div>
      </Modal>
    );
  }
}

AddMeasurementModal.propTypes = {
  addMeasurement: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
