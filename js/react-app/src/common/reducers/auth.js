import {
  RQUEST_REGISTRATION_USER,
  RECEIVE_REGISTRATION_USER,
  RECEIVE_REGISTRATION_ERROR_MESSAGE_USER
} from '../actions/actionsTypes';

const initialState = {
  registering: false,
  errorMessage: ''
};

export default (state = initialState, { type, message }) => {
  switch (type) {
    case RQUEST_REGISTRATION_USER:
      return {
        ...state,
        registering: true,
        errorMessage: ''
      };

    case RECEIVE_REGISTRATION_USER:
      return {
        ...state,
        registering: false,
        errorMessage: ''
      };

    case RECEIVE_REGISTRATION_ERROR_MESSAGE_USER:
      return {
        ...state,
        registering: false,
        errorMessage: message
      };

    default:
      return state;
  }
};
