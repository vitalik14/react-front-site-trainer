import { connect } from 'react-redux';

import { addMeasurement } from '../../../actions/user';
import AddMeasurementModal from './AddMeasurementModal';

const mapStateToProps = (state, { isShown, close }) => ({
  isShown,
  close,
});

const mapDispatchToProps = dispatch => ({
  addMeasurement: data => dispatch(addMeasurement(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMeasurementModal);
