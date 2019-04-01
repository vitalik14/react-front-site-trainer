import { combineReducers } from 'redux';

import layout from './layout';
import user from './user';
import training from './training';
import meals from './meals';
import posts from './posts';
import videos from './videos';
import fitbook from './fitbook';
import comments from './comments';
import auth from './auth';

export default combineReducers({
  auth,
  layout,
  user,
  training,
  meals,
  posts,
  videos,
  fitbook,
  comments,
});
