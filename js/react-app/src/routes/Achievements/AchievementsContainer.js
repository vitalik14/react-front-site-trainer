import { connect } from 'react-redux';

import Achievements from './Achievements';

const mapStateToProps = ({ user: { isFetchingUnlockedAchievements, unlockedAchievements } }) => ({
  isFetchingUnlockedAchievements,
  unlockedAchievements,
});

export default connect(mapStateToProps)(Achievements);
