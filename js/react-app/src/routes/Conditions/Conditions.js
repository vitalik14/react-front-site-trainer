import React from 'react';
import { PropTypes } from 'prop-types';

const Conditions = ({ samplePropMessage }) => (
  <div>
    <h1>
      Conditions page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Conditions.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Conditions;
