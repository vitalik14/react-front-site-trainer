import { connect } from 'react-redux';

import VideosGrid from '../VideosGrid';
// import { getVideos } from '../../../../common/actions/videos';

const mapStateToProps = (
  { videos: { all } },
  { baseDomain, filteredItems, onPageNumberChange },
) => ({ ...all, baseDomain, filteredItems, onPageNumberChange });

export default connect(
  mapStateToProps,
)(VideosGrid);
