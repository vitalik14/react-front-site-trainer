import React from 'react';
import { PropTypes } from 'prop-types';

const SearchResults = ({ samplePropMessage }) => (
  <div>
    <h1>
      SearchResults page works!
    </h1>
    <p>{samplePropMessage}</p>
  </div>
);

SearchResults.propTypes = {
  samplePropMessage: PropTypes.string.isRequired,
};

export default SearchResults;
