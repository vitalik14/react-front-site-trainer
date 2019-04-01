import React from 'react';
import { PropTypes } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TextBlueButton } from '../../../common/customizedMaterialComponents';
import PlanGridItem from '../../../common/components/GridItems/Plan/PlanGridItem';
import plan from '../../../common/models/trainingPlan';
import FormTrainingPlan from '../../../common/components/Modals/FormTrainingPlan/FormTrainingPlan';

export class TrainingPlansGrid extends React.Component {
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
    })
  }

  closeDialog = () => {
    this.setState({
      isOpenDialog: false,
    });
  }

  render() {
    const {
      baseDomain,
      isFetchingPlans,
      hasFetchedPlans,
      plans,
      plansCount,
      plansCurrentPage,
      plansPerPage,
      canPaginatePlans,
      loadMorePlans,
    } = this.props;

    let { isOpenDialog, idItem } = this.state;

    if (isFetchingPlans && !hasFetchedPlans) {
      return (
        <div className="loaderWrapper">
          <CircularProgress />
        </div>
      );
    }

    if (!hasFetchedPlans) return null;

    if (hasFetchedPlans && !plans.length) {
        return <p className="placeholder">Keine Pläne ¯\_(ツ)_/¯</p>;
    }

    return (
      <div>
        <div className="gridWrapper shiftedByFilters">
        {plans.map(({
            id,
            name,
            banners: { default: thumbnailUrl },
            description,
            duration,
            trainers,
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
                trainers={trainers}
                appPromotion={appPromotion}
            />
            
            </div>
        ))}
        </div>
        <FormTrainingPlan 
          onClose={this.closeDialog} 
          open={isOpenDialog} 
          id={idItem} 
        />
        {isFetchingPlans && (
        <div className="loaderWrapper">
            <CircularProgress />
        </div>
        )}
        <div className="paginationWrapper">
        <div>
            <p className="paginationCount">
            Es werden&nbsp;
            {Math.min(plansCount, plansPerPage * plansCurrentPage)}
            &nbsp;Pläne von&nbsp;
            {plansCount}
            &nbsp;angezeigt
            </p>
            <TextBlueButton
            variant="outlined"
            onClick={() => loadMorePlans(plansCurrentPage + 1, false)}
            disabled={!canPaginatePlans || isFetchingPlans}
            >
            Laden Sie mehr Daten
            </TextBlueButton>
        </div>
        </div>
    </div>
    );
  };
}

TrainingPlansGrid.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingPlans: PropTypes.bool.isRequired,
  hasFetchedPlans: PropTypes.bool.isRequired,
  plans: PropTypes.arrayOf(plan).isRequired,
  plansCount: PropTypes.number.isRequired,
  plansCurrentPage: PropTypes.number.isRequired,
  plansPerPage: PropTypes.number.isRequired,
  canPaginatePlans: PropTypes.bool.isRequired,
  loadMorePlans: PropTypes.func.isRequired,
};

export default TrainingPlansGrid;
