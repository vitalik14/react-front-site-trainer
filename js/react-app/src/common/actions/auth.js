import {
  RQUEST_REGISTRATION_USER,
  RECEIVE_REGISTRATION_USER,
  RECEIVE_REGISTRATION_ERROR_MESSAGE_USER
} from './actionsTypes';


import registerUser from '../services/auth';

const requestRegisterUser = {
  type: RQUEST_REGISTRATION_USER
};

const receiveRegisterUser = {
  type: RECEIVE_REGISTRATION_USER
};

const receiveRegisterUserErrorMessage = message => ({
  type: RECEIVE_REGISTRATION_ERROR_MESSAGE_USER,
  message
});

export default content => dispatch => {
  dispatch(requestRegisterUser);
  return registerUser(content)
    .then(() => dispatch(receiveRegisterUser))
    .catch(err => {
      dispatch(receiveRegisterUserErrorMessage(err.response.data.message));
    });
};
