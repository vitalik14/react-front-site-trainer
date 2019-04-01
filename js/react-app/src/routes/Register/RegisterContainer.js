import { connect } from 'react-redux';
import Register from './Register';

import registerUser from '../../common/actions/auth';

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
});

const mapStateToProps = ({ auth: { errorMessage } }) => ({
  errorMessage
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
