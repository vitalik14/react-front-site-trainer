import { connect } from 'react-redux';

import Home from './Home';

const mapStateToProps = ({
  user: {
    isFetchingDashboardData,
    dashboardData,
  },
}) => ({
  isFetchingDashboardData,
  dashboardData,
});

export default connect(mapStateToProps)(Home);
