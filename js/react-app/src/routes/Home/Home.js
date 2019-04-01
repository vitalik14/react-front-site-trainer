import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './Home.scss';
import burntCaloriesModel from '../../common/models/burntCalories';
import trainingPlanModel from '../../common/models/trainingPlan';
import videoModel from '../../common/models/video';
import mealModel from '../../common/models/meal';
import AdviceOfTheDay from './AdviceOfTheDay/AdviceOfTheDay';
import BurntCalories from './BurntCalories/BurntCalories';
import UpgradeBanner from '../../common/components/UpgradeBanner/UpgradeBannerContainer';
import ThisDayTrainingPlan from './ThisDayTrainingPlan/ThisDayTrainingPlan';
import ThisDayTraining from './ThisDayTraining/ThisDayTraining';
import PinnedTrainingPlans from './PinnedTrainingPlans/PinnedTrainingPlans';
import MealsToday from './MealsToday/MealsToday';
import LayoutLoader from '../../common/components/Loaders/Layout/LayoutLoader';

const Home = ({
  baseDomain,
  isFetchingDashboardData,
  dashboardData,
}) => (
  <>
    {(isFetchingDashboardData || !Object.keys(dashboardData).length) && <LayoutLoader />}
    {!isFetchingDashboardData && (
      <>
        <div className={styles.topFlexCont}>
          <div className={styles.topFlexItem}>
            <AdviceOfTheDay advice={dashboardData.quote} />
          </div>
          <div className={styles.topFlexItem}>
            <BurntCalories baseDomain={baseDomain} burntCalories={dashboardData.kcal} />
          </div>
        </div>
        <div className={styles.bannerWrapper}>
          <UpgradeBanner baseDomain={baseDomain} />
        </div>
        <ThisDayTrainingPlan
          isFetching={isFetchingDashboardData}
          baseDomain={baseDomain}
          trainingPlan={dashboardData.trainingPlan}
        />
        <ThisDayTraining baseDomain={baseDomain} />
        <div className={styles.pinnedTrainingPlansWrapper}>
          <PinnedTrainingPlans baseDomain={baseDomain} plans={dashboardData.pinnedTrainingPlans} />
        </div>
        <div className={styles.mealPlanWrapper}>
          <MealsToday
            isFetching={isFetchingDashboardData}
            baseDomain={baseDomain}
            mealPlan={dashboardData.mealPlan}
          />
        </div>
      </>
    )}
  </>
);

Home.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  isFetchingDashboardData: PropTypes.bool.isRequired,
  dashboardData: PropTypes.shape({
    quote: PropTypes.string,
    kcal: burntCaloriesModel,
    trainingPlan: PropTypes.shape({
      enabled: PropTypes.bool,
      inFuture: PropTypes.bool,
      changeAllowed: PropTypes.bool,
      startDate: PropTypes.string,
      data: PropTypes.oneOfType([trainingPlanModel, PropTypes.bool]),
      today: PropTypes.arrayOf(videoModel),
    }),
    pinnedTrainingPlans: PropTypes.arrayOf(trainingPlanModel),
    mealPlan: PropTypes.shape({
      enabled: PropTypes.bool,
      diet: PropTypes.string,
      data: PropTypes.oneOfType([PropTypes.objectOf(mealModel), PropTypes.array]),
    }),
  }).isRequired,
};

Home.defaultProps = {
  quote: '',
  kcal: null,
  trainingPlan: null,
  pinnedTrainingPlans: [],
  mealPlan: null,
};

export default Home;
