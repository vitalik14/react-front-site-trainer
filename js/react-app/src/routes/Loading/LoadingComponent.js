import React from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../common/components/Loaders/Layout/LayoutLoader';

const LoadingComponent = ({ error }) => {
  if (error) {
    console.error(error);
    return <p>An error occurred while loading the page</p>;
  }
  return <Loader />;
};

LoadingComponent.propTypes = {
  error: PropTypes.shape({
    type: PropTypes.string,
    request: PropTypes.string,
  }),
};

LoadingComponent.defaultProps = {
  error: null,
};

export default LoadingComponent;
