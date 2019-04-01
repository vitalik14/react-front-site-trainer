import React from 'react';
import { PropTypes } from 'prop-types';

import '../../../../assets/styles/_layout.scss';

const MealsTopBanner = ({ baseDomain }) => (
  <div
    className="banner"
    style={{ backgroundImage: `url(${baseDomain}/assets/js/react-app/src/assets/img/png/meals-top-banner-bg.png)` }}
  >
    <h1 className="bannerTitle">Rezepte</h1>
    <p className="bannerSubTitle">Sei mehr als du heute bist!</p>
  </div>
);

MealsTopBanner.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default MealsTopBanner;
