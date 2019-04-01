import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import burntCaloriesModel from '../../../common/models/burntCalories';
import { StyledButton } from '../customizedMaterialComponents';
import styles from './BurntCalories.scss';
import CircularGraph from '../../../assets/js/circular-graph';
import AddMeasurementModalContainer from '../../../common/components/Modals/AddMeasurement/AddMeasurementModalContainer';

export default class BurntCalories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddMeasurementModalShown: false
    };

    this.openMeasurementAddingModal = this.openMeasurementAddingModal.bind(this);
    this.closeMeasurementAddingModal = this.closeMeasurementAddingModal.bind(this);
  }
 
  componentDidMount() {
    const { props: { burntCalories } } = this;
    if (burntCalories) {
      const {
        today: {
          value: todayValue,
          max: todayMax,
        },
        week: {
          value: weekValue,
          max: weekMax,
        },
        month: {
          value: monthValue,
          max: monthMax,
        },
      } = burntCalories;

      CircularGraph.create({
        id: 'today-calories-graph',
        radius: 57,
        value: todayValue,
        maxValue: todayMax,
        width: 3,
        text: value => value,
        colors: ['#CFD8DC', '#EC407A'],
        duration: 500,
        textClass: 'circleValue',
        styleText: false,
      });

      CircularGraph.create({
        id: 'week-calories-graph',
        radius: 57,
        value: weekValue,
        maxValue: weekMax,
        width: 3,
        text: value => value,
        colors: ['#CFD8DC', '#F8CF1C'],
        duration: 500,
        wrpClass: 'circles-wrp',
        textClass: 'circleValue',
        styleText: false,
      });

      CircularGraph.create({
        id: 'month-calories-graph',
        radius: 57,
        value: monthValue,
        maxValue: monthMax,
        width: 3,
        text: value => value,
        colors: ['#CFD8DC', '#00E5FF'],
        duration: 500,
        textClass: 'circleValue',
        styleText: false,
      });
    }
  }
  
  openMeasurementAddingModal() {
    this.setState({ isAddMeasurementModalShown: true });
  }

  closeMeasurementAddingModal() {
    this.setState({ isAddMeasurementModalShown: false });
  }
  
  render() {
    const { props: { baseDomain }, state: {isAddMeasurementModalShown} } = this;
    return (
      <div className={styles.parentCont}>
        <h2 className={styles.heading}>Verbrannte Kalorien</h2>
        <div className={styles.cont}>
          <div className={styles.circlesCont}>
            <div className={styles.circleCont}>
              <h6 className={styles.circleHeading}>Heute</h6>
              <div className={styles.circle} id="today-calories-graph" />
            </div>
            <div className={styles.circleCont}>
              <h6 className={styles.circleHeading}>Woche</h6>
              <div className={styles.circle} id="week-calories-graph" />
            </div>
            <div className={styles.circleCont}>
              <h6 className={styles.circleHeading}>Monat</h6>
              <div className={styles.circle} id="month-calories-graph" />
            </div>
          </div>
          <div className={styles.buttonsCont}>
            <StyledButton color="secondary" href={`${baseDomain}/you/stats`} className={styles.button}>Zur statistik</StyledButton>
            <StyledButton color="secondary" onClick={this.openMeasurementAddingModal} className={styles.button}>Messung +</StyledButton>
            <AddMeasurementModalContainer
              isShown={isAddMeasurementModalShown}
              close={this.closeMeasurementAddingModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

BurntCalories.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  burntCalories: burntCaloriesModel,
};

BurntCalories.defaultProps = {
  burntCalories: null,
};
