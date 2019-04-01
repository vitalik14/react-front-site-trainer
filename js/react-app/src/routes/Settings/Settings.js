import React from 'react';
import { PropTypes } from 'prop-types';

const Settings = ({ samplePropMessage }) => (
  <div>
    <h1>
      Settings page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Settings.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Settings;
