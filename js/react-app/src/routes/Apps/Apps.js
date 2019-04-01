import React from 'react';
import { PropTypes } from 'prop-types';

const Apps = ({ samplePropMessage }) => (
  <div>
    <h1>
      Apps page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Apps.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Apps;
