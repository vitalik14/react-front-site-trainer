import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Slider from '../../../common/components/Slider/SliderContainer';
import MealGridItem from '../../../common/components/GridItems/Meal/MealGridItem';
import { PrimaryButton, TextBlueButton, TextDarkGreyButton } from '../../../common/customizedMaterialComponents';
import styles from './MealsToday.scss';
import mealModel from '../../../common/models/meal';
import ButtonLoader from '../../../common/components/Loaders/Button/ButtonLoader';
import { stopMealPlan } from '../../../common/services/meals';
import handleError from '../../../common/errorHandler';

export default class MealsToday extends Component {
  state = { isStopConfirmModalOpen: false, isStopping: false, isEnabled: null };

  stopPlan = () => {
    this.setState({ isStopping: true });
    stopMealPlan()
      .then(() => this.setState({
        isStopConfirmModalOpen: false,
        isStopping: false,
        isEnabled: false,
      }))
      .catch(handleError);
  };

  render() {
    const {
      state: { isStopConfirmModalOpen, isStopping, isEnabled },
      props: { baseDomain, mealPlan },
    } = this;

    const enabled = isEnabled === null
      ? mealPlan.enabled
      : isEnabled;

    return (
      <>
        {!enabled && (
          <>
            <div className={styles.topCont}>
              <h2 className={styles.heading}>Deine heutigen Mahlzeiten</h2>
            </div>
            <p>Ihr Essensplan ist nicht aktiviert</p>
          </>
        )}
        {enabled && (
          <Slider
            title="Deine heutigen Mahlzeiten"
            buttons={[
              <TextDarkGreyButton
                key={1}
                style={{ marginRight: 10 }}
                onClick={() => this.setState({ isStopConfirmModalOpen: true })}
              >
                Beenden
              </TextDarkGreyButton>,
              <TextBlueButton
                key={2}
                style={{ marginRight: 10 }}
                href={`${baseDomain}/you/weekplan/meals`}
              >
                Wochenplan
              </TextBlueButton>,
            ]}
            slides={
              Object.values(mealPlan.data).map(({
                id,
                name,
                nutrients: {
                  kcal,
                  carbs,
                  fat,
                  protein,
                },
                banners: { default: thumbnailUrl },
                types,
                meta: {
                  isFavorite,
                  favorite: {
                    id: favId = null,
                    data: { note: favNote = null } = {},
                  } = {},
                },
              }) => (
                <MealGridItem
                  baseDomain={baseDomain}
                  key={id}
                  id={id}
                  name={name}
                  kcal={kcal}
                  carbs={carbs}
                  fat={fat}
                  protein={protein}
                  thumbnailUrl={thumbnailUrl}
                  typeIds={types}
                  isFav={isFavorite}
                  favId={favId}
                  favNote={favNote}
                  showSwapIcon
                />
              ))
            }
          />
        )}
        <Dialog
          fullScreen={window.innerWidth < 768}
          open={isStopConfirmModalOpen || isStopping}
          onClose={() => this.setState({ isStopConfirmModalOpen: false })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Bist Du Dir sicher?</DialogTitle>
          <DialogContent>
            <DialogContentText>Willst Du den Plan wirklich beenden?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <TextBlueButton
              color="primary"
              disabled={isStopping}
              onClick={() => this.setState({ isStopConfirmModalOpen: false })}
              autoFocus
            >
              ABSÄGEN
            </TextBlueButton>
            <PrimaryButton
              color="primary"
              disabled={isStopping}
              onClick={this.stopPlan}
            >
              LÖSCHEN
              {isStopping && <ButtonLoader color="white" />}
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

MealsToday.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  mealPlan: PropTypes.shape({
    enabled: PropTypes.bool,
    diet: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.objectOf(mealModel), PropTypes.array]),
  }),
};

MealsToday.defaultProps = {
  mealPlan: null,
};
