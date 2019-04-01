import React from 'react';
import { PropTypes } from 'prop-types';

const Partner = ({ samplePropMessage }) => (
  <div>
    <h1>
      Partner page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Partner.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Partner;
