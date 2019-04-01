import React from 'react';
import { PropTypes } from 'prop-types';

import trainingPlanModel from '../../../common/models/trainingPlan';
import Slider from '../../../common/components/Slider/SliderContainer';
import PlanGridItem from '../../../common/components/GridItems/Plan/PlanGridItem';

const PinnedTrainingPlans = ({ baseDomain, plans }) => (
  <>
    {
      !(plans && plans.length) && <p>Sie haben noch keine Trainingspläne gepinnt</p>
    }
    {
      !!(plans && plans.length) && (
        <Slider
          title="Deine angepinnten Trainingspläne"
          slides={
            plans.map(({
              id,
              name,
              description,
              banners: { default: thumbnailUrl },
              duration,
              metadata: {
                appPromotion,
                inProgress,
                isPinned,
                isCustom,
                isPublic,
              },
            }) => (
              <PlanGridItem
                key={id}
                id={id}
                name={name}
                baseDomain={baseDomain}
                description={description}
                thumbnailUrl={thumbnailUrl}
                duration={duration}
                appPromotion={appPromotion}
                inProgress={inProgress}
                isPinned={isPinned}
                isPublic={isPublic}
                isCustom={isCustom}
              />
            ))
          }
        />
      )
    }
  </>
);

PinnedTrainingPlans.propTypes = {
  baseDomain: PropTypes.string.isRequired,
  plans: PropTypes.arrayOf(trainingPlanModel),
};

PinnedTrainingPlans.defaultProps = {
  plans: null,
};

export default PinnedTrainingPlans;
