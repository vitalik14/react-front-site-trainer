import React from 'react';
import { PropTypes } from 'prop-types';

const Companies = ({ samplePropMessage }) => (
  <div>
    <h1>
      Companies page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Companies.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Companies;
