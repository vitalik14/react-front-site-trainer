import React from 'react';
import { PropTypes } from 'prop-types';

const GroceryList = ({ samplePropMessage }) => (
  <div>
    <h1>
      Grocery List page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

GroceryList.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default GroceryList;
