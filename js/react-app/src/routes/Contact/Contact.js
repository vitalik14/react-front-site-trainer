import React from 'react';
import { PropTypes } from 'prop-types';

const Contact = ({ samplePropMessage }) => (
  <div>
    <h1>
      Contact page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Contact.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Contact;
