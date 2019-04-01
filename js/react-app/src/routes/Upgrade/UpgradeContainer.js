import { connect } from 'react-redux';

import Upgrade from './Upgrade';

const mapStateToProps = ({ user: { currentUser, isFetchingCurrentUser } }) => ({
  currentUser,
  isFetchingCurrentUser,
});

export default connect(mapStateToProps)(Upgrade);
