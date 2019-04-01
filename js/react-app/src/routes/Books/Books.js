import React from 'react';
import { PropTypes } from 'prop-types';

const Books = ({ samplePropMessage }) => (
  <div>
    <h1>
      Books page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

Books.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default Books;
