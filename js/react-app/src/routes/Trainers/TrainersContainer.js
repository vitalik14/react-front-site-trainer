import { connect } from 'react-redux';
import { onComponentDidMount } from 'react-redux-lifecycle';

import { getAllTrainers } from '../../common/actions/training';
import Trainers from './Trainers';

const mapStateToProps = (
  { training: { trainers, isFetchingTrainers } },
) => ({ trainers, isFetchingTrainers });

export default connect(mapStateToProps)(onComponentDidMount(getAllTrainers)(Trainers));
