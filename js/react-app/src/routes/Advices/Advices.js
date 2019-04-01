import React from 'react';
import { PropTypes } from 'prop-types';

const Advices = ({ samplePropMessage }) => (
  <div>
    <h1>
      Advices page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Advices.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Advices;
