import React from 'react';
import { PropTypes } from 'prop-types';

import Banner from './Banner/VideoDownloadsBanner';
import Grid from './Grid/VideoDownloadsGrid';

const VideoDownloads = ({ baseDomain }) => (
  <>
    <Banner />
    <Grid baseDomain={baseDomain} />
  </>
);

VideoDownloads.propTypes = {
  baseDomain: PropTypes.string.isRequired,
};

export default VideoDownloads;
