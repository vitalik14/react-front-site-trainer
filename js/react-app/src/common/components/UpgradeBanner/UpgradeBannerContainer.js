import { connect } from 'react-redux';

import UpgradeBanner from './UpgradeBanner';

const mapStateToProps = ({
  user: { isFetchingCurrentUser, currentUser: { privilege: currentUserPlan } },
}) => ({
  loading: isFetchingCurrentUser,
  currentUserPlan,
});

export default connect(mapStateToProps)(UpgradeBanner);
