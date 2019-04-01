import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import TrainingPlanSearchForm from './TrainingPlanSearchForm';
import { setPreferences } from '../../../common/actions/user';
import { getPlans } from '../../../common/actions/training';

class TrainingPlanSearchFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preferenceFieldValues: {
        birthday: '',
        weight: '',
        size: '',
        diet: 0,
        activity: 0,
      },
      initialPreferences: {
        birthday: '',
        weight: '',
        size: '',
        diet: 0,
        activity: 0,
      },
      formTouched: true,
      preferencesTouched: false,
      touchedPreferences: [],
      isPreferencesChangeWarningPopoverOpen: false,
    };

    this.handlePreferencesFilterToggle = this.handlePreferencesFilterToggle.bind(this);
    this.handleGoalSelect = this.handleGoalSelect.bind(this);
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreferencesChangeWarningPopoverOpen = this.handlePreferencesChangeWarningPopoverOpen.bind(this); // eslint-disable-line max-len
    this.handlePreferencesChangeWarningPopoverClose = this.handlePreferencesChangeWarningPopoverClose.bind(this); // eslint-disable-line max-len
    this.handlePreferencesRevert = this.handlePreferencesRevert.bind(this);
  }

  componentWillReceiveProps({ preferences }) {
    if (Object.keys(preferences).length) {
      const {
        birthday, weight, size, diet, activity,
      } = preferences;
      this.setState({
        preferenceFieldValues: {
          birthday: birthday || '',
          weight: weight || '',
          size: size || '',
          diet: diet || 0,
          activity: activity || 0,
        },
        initialPreferences: {
          birthday, weight, size, diet, activity,
        },
      });
    }
  }

  handleGoalSelect({ target: { value } }) {
    const { props: { onGoalSelect } } = this;
    onGoalSelect(+value);
    this.setState(({ formTouched: true }));
  }

  handlePreferencesFilterToggle() {
    const { props: { onPreferencesFilterToggle } } = this;
    onPreferencesFilterToggle();
    this.setState(({ formTouched: true }));
  }

  handlePreferenceChange(preference) {
    return ({ target: { value } }) => {
      this.setState(({ preferenceFieldValues, touchedPreferences }) => ({
        preferenceFieldValues: {
          ...preferenceFieldValues,
          [preference]: value,
        },
        preferencesTouched: true,
        touchedPreferences: touchedPreferences.concat(preference),
      }));
    };
  }

  handleSubmit({ target: { id, parentNode: { id: parentId } } }) {
    if ([id, parentId].indexOf('submit-search-btn') !== -1) {
      const {
        state: {
          preferenceFieldValues,
          preferencesTouched,
        },
        props: {
          loadPlans,
          updatePreferences,
          selectedGoal,
          isPreferencesFilterOn,
        },
      } = this;
      loadPlans({ goal: selectedGoal, user_specific: +isPreferencesFilterOn });
      if (preferencesTouched) {
        updatePreferences(preferenceFieldValues);
      }
      this.setState({ formTouched: false, preferencesTouched: false });
    }
  }

  handlePreferencesChangeWarningPopoverOpen() {
    const { state: { preferencesTouched } } = this;
    if (preferencesTouched) {
      this.setState({ isPreferencesChangeWarningPopoverOpen: true });
    }
  }

  handlePreferencesChangeWarningPopoverClose() {
    this.setState({ isPreferencesChangeWarningPopoverOpen: false });
  }

  handlePreferencesRevert() {
    const {
      state: {
        initialPreferences: {
          birthday = '', weight = '', size = '', diet = 0, activity = 0,
        },
      },
    } = this;
    this.setState({
      preferenceFieldValues: {
        birthday, weight, size, diet, activity,
      },
      preferencesTouched: false,
      touchedPreferences: [],
    });
  }

  render() {
    const {
      state: {
        preferenceFieldValues,
        formTouched,
        preferencesTouched,
        touchedPreferences,
        isPreferencesChangeWarningPopoverOpen,
      },
      props: { baseDomain, selectedGoal, isPreferencesFilterOn },
    } = this;
    return (
      <TrainingPlanSearchForm
        baseDomain={baseDomain}
        isPreferencesFilterOn={isPreferencesFilterOn}
        onPreferencesFilterToggle={this.handlePreferencesFilterToggle}
        selectedGoal={selectedGoal}
        onGoalSelect={this.handleGoalSelect}
        preferenceFieldValues={preferenceFieldValues}
        onPreferenceChange={this.handlePreferenceChange}
        onSubmit={this.handleSubmit}
        formTouched={formTouched}
        preferencesTouched={preferencesTouched}
        touchedPreferences={touchedPreferences}
        isPreferencesChangeWarningPopoverOpen={isPreferencesChangeWarningPopoverOpen}
        onPreferencesChangeWarningPopoverOpen={this.handlePreferencesChangeWarningPopoverOpen}
        onPreferencesChangeWarningPopoverClose={this.handlePreferencesChangeWarningPopoverClose}
        onPreferencesRevert={this.handlePreferencesRevert}
      />
    );
  }
}

TrainingPlanSearchFormContainer.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  selectedGoal: PropTypes.number.isRequired,
  isPreferencesFilterOn: PropTypes.bool.isRequired,
  onPreferencesFilterToggle: PropTypes.func.isRequired,
  onGoalSelect: PropTypes.func.isRequired,
  preferences: PropTypes.shape({
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
  loadPlans: PropTypes.func.isRequired,
  updatePreferences: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user: { preferences } }) => ({ preferences });

const mapDispatchToProps = dispatch => ({
  loadPlans: params => dispatch(getPlans(params)),
  updatePreferences: data => dispatch(setPreferences(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingPlanSearchFormContainer);
