import React from 'react';
import { PropTypes } from 'prop-types';

const Shop = ({ samplePropMessage }) => (
  <div>
    <h1>
      Shop page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Shop.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Shop;
