import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getPreferences } from '../../common/actions/user';
import Goal from './Goal';

const mapStateToProps = ({ user: { isFetchingPreferences, preferences } }) => ({
  loading: isFetchingPreferences,
  data: preferences,
});

export default connect(mapStateToProps)(onComponentDidMount(getPreferences)(Goal));
