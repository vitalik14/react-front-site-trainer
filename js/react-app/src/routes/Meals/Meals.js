import React from 'react';
import { PropTypes } from 'prop-types';

import TopBanner from './Banners/Top/MealsTopBanner';
import InfoBanner from './Banners/Info/MealsInfoBanner';
import Search from './Search/MealCategorySearchContainer';
import Grid from './Grid/MealCategoryGridContainer';

const MealPlan = ({ baseDomain }) => (
  <>
    <TopBanner baseDomain={baseDomain} />
    <InfoBanner baseDomain={baseDomain} />
    <Search baseDomain={baseDomain} />
    <Grid baseDomain={baseDomain} />
  </>
);

MealPlan.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default MealPlan;
