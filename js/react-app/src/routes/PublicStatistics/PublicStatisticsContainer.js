import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getFitbookStats } from '../../common/actions/fitbook';
import PublicStatistics from './PublicStatistics';

const mapStateToProps = ({ fitbook: { isFetchingStats, stats } }) => ({
  isFetching: isFetchingStats,
  data: stats,
});

export default connect(mapStateToProps)(onComponentDidMount(getFitbookStats)(PublicStatistics));
