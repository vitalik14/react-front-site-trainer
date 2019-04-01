import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import trainingPlan from '../../../common/models/trainingPlan';
import PlanGridItem from '../../../common/components/GridItems/Plan/PlanGridItem';
import { TextBlueButton } from '../../../common/customizedMaterialComponents';
import FormTrainingPlan from '../../../common/components/Modals/FormTrainingPlan/FormTrainingPlan';
export default class TrainingPlanSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idItem: 0,
      isOpenDialog: false
    }
  }

  openDialog = (elem) => {
    const id = +elem.currentTarget.id;

    this.setState({
      isOpenDialog: true,
      idItem: id,
    });
  }

  closeDialog = () => {
    this.setState({
      isOpenDialog: false
    });
  }

  render() {
    const {
      baseDomain,
      isFetchingPlans,
      hasFetchedPlans,
      plansCount,
      plansCurrentPage,
      plansPerPage,
      canPaginatePlans,
      plans,
      loadMorePlans,
      selectedGoal,
      isPreferencesFilterOn
    } = this.props;

    if (isFetchingPlans && !hasFetchedPlans) {
      return (
        <div className="loaderWrapper">
          <CircularProgress />
        </div>
      );
    }

    if (!hasFetchedPlans) return null;

    if (hasFetchedPlans && !plansCount) {
      return (
        <p className="placeholder">
          Keine Trainingspläne für Ihre angegebenen Filter ¯\_(ツ)_/¯
        </p>
      );
    }
    let { isOpenDialog, idItem } = this.state;

    return (
      <>
        <div className="gridWrapper" style={{ marginTop: 20 }}>
          {
            plans.map(({
              id,
              name,
              banners: { default: thumbnailUrl },
              description,
              duration,
              metadata: {
                inProgress,
                isPublic,
                isCustom,
                isPinned,
                marker,
                appPromotion,
              },
            }) => (
              <div key={id} className="gridItem">
                <PlanGridItem
                  openDialog={this.openDialog}
                  baseDomain={baseDomain}
                  id={id}
                  name={name}
                  thumbnailUrl={thumbnailUrl}
                  description={description}
                  duration={duration}
                  inProgress={inProgress}
                  isPublic={!!isPublic}
                  isCustom={!!isCustom}
                  isPinned={isPinned}
                  marker={marker}
                  appPromotion={appPromotion}
                  shouldShowLink
                />
              </div>
            ))
          }
        </div>
        {isFetchingPlans && (
          <div className="loaderWrapper">
            <CircularProgress />
          </div>
        )}
        <FormTrainingPlan 
          onClose={this.closeDialog} 
          open={isOpenDialog} 
          id={idItem} 
        />
        <div className="paginationWrapper">
          <div>
            <p className="paginationCount">
              Zeige&nbsp;
              {Math.min(plansCount, plansPerPage * plansCurrentPage)}
              &nbsp;von&nbsp;
              {plansCount}
              &nbsp;Ergebnissen
            </p>
            <TextBlueButton
              variant="outlined"
              onClick={() => loadMorePlans(plansCurrentPage + 1, selectedGoal, isPreferencesFilterOn)}
              disabled={!canPaginatePlans || isFetchingPlans}
            >
              Laden Sie mehr Daten
            </TextBlueButton>
          </div>
        </div>
      </>
    );
  }
}

TrainingPlanSearchResults.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingPlans: PropTypes.bool.isRequired,
  hasFetchedPlans: PropTypes.bool.isRequired,
  plansCount: PropTypes.number.isRequired,
  plansCurrentPage: PropTypes.number.isRequired,
  plansPerPage: PropTypes.number.isRequired,
  canPaginatePlans: PropTypes.bool.isRequired,
  plans: PropTypes.arrayOf(trainingPlan).isRequired,
  loadMorePlans: PropTypes.func.isRequired,
  selectedGoal: PropTypes.number.isRequired,
  isPreferencesFilterOn: PropTypes.bool.isRequired,
};
