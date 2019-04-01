import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getVideo } from '../../common/actions/videos';
import { setSidebarPersistentExpansionState } from '../../common/actions/layout';
import Video from './Video';

const mapStateToProps = ({ videos: { isFetchingCurrentVideo, current } }) => ({
  loading: isFetchingCurrentVideo,
  data: current,
});

const mapDispatchToProps = dispatch => ({
  setSidebarExpansionState: state => dispatch(setSidebarPersistentExpansionState(state)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(onComponentDidMount(({ id }) => getVideo(id))(Video));
