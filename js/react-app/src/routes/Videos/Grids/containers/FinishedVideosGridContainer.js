import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import VideosGrid from '../VideosGrid';
import { getVideos } from '../../../../common/actions/videos';

const mapStateToProps = (
  { videos: { finished } },
  { baseDomain, onPageNumberChange }
) => ({ ...finished, baseDomain, onPageNumberChange });

export default connect(mapStateToProps)(
  onComponentDidMount(getVideos(0, 'finished'))(VideosGrid)
);
