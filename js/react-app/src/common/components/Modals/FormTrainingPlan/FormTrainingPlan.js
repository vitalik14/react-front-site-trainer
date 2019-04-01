import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

import styles from './FormTrainingPlan.scss';
import {
  setTrainingPlan,
  fetchCurrentTrainingPlan
} from '../../../services/training';
import Loader from '../../../components/Loaders/Layout/LayoutLoader';
import { PrimaryButton, TextBlueButton } from '../../../customizedMaterialComponents';
import handleError from '../../../errorHandler';
import { toDateString } from '../../../helpers';

export default class FormTrainingPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      isSetPlanModalOpen: false,
      isSettingPlan: false,
      isCurrentPlan: null,
      currentPlanName: '',
      mealPlanSelectValue: 0,
      startDateValue: toDateString(new Date()),
    };
  }
 
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      fetchCurrentTrainingPlan()
        .then(({
          data: { trainingplan: { id: currentPlanId, name: currentPlanName } },
        }) => {
         this.setState({ 
            loading: false,
            isCurrentPlan: nextProps.id === currentPlanId, 
            currentPlanName, 
            isSetPlanModalOpen: true,
            data: { id : nextProps.id }
          }); 
          
        })
        .catch(handleError);
    } else {
      this.setState({ isSetPlanModalOpen: false });
    }
  }

  setPlan = () => {
    let { onClose } = this.props;
    this.setState({ isSettingPlan: true });
    const { state: { data: { id }, mealPlanSelectValue, startDateValue } } = this;
    setTrainingPlan(id, !!mealPlanSelectValue, startDateValue)
      .then(() => {
        this.setState({
          isSettingPlan: false,
          isCurrentPlan: true,
          mealPlanSelectValue: 0,
          startDateValue: toDateString(new Date()),
        });

        onClose();
      })
      .catch(handleError);
  };

  closeSetPlanDialog = () => {
    const { state: { isSettingPlan } } = this;
    let { onClose } = this.props;
    if (!isSettingPlan) {
      this.setState({
        mealPlanSelectValue: 0,
        startDateValue: toDateString(new Date()),
      });
      onClose();
    }
  };

  render() {
    const {
      state: {
        loading,
        isSetPlanModalOpen,
        isSettingPlan,
        currentPlanName,
        mealPlanSelectValue,
        startDateValue,
        isCurrentPlan
      }
    } = this;

    if (loading) return <Loader />;

    return (
      <>
        <Dialog
          fullWidth
          fullScreen={window.innerWidth < 768}
          open={isSetPlanModalOpen || isSettingPlan}
          onClose={this.closeSetPlanDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Trainingsplan wählen</DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="subject-select">Mit Ernährungsplan?</InputLabel>
              <Select
                value={mealPlanSelectValue}
                onChange={({ target: { value } }) => this.setState({ mealPlanSelectValue: value })}
                input={<OutlinedInput name="subject-select" id="subject" labelWidth={200} />}
              >
                <MenuItem value={0}>Nein</MenuItem>
                <MenuItem value={1}>Ja</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              label="Wann möchtest Du starten?"
              value={startDateValue}
              onChange={({ target: { value } }) => this.setState({ startDateValue: value })}
              margin="normal"
              variant="outlined"
            />
            <p>
              {isCurrentPlan && 'Dies ist Dein aktueller Trainingsplan. Wenn Du diesen Plan wählst, fängst Du diesen neu an.'}
              {!isCurrentPlan && `Wenn Du diesen Trainingsplan wählst, wird Dein aktueller Plan (${currentPlanName}) überschrieben.`}
            </p>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isSettingPlan}
              onClick={this.closeSetPlanDialog}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isSettingPlan}
              onClick={this.setPlan}
            >
              WÄHLEN
              {isSettingPlan && (
                <div style={{ height: 16, marginLeft: 15 }}>
                  <CircularProgress color="inherit" size={16} />
                </div>
              )}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

FormTrainingPlan.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};
