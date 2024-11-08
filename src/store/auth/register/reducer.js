import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        loading: true,
        success: false,
        registrationError: null,
      };
    case REGISTER_USER_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
        registrationError: null,
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        success: false,
        registrationError: action.payload, // Firebase error message
      };
    default:
      return state;
  }
};

export default account;