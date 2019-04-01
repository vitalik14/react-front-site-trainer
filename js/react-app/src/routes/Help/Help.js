import React from 'react';
import { PropTypes } from 'prop-types';

const Help = ({ samplePropMessage }) => (
  <div>
    <h1>
      Help page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Help.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Help;
