import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER });

    try {
      // Initialize Firebase Authentication and attempt to register the user
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Dispatch the success action if registration is successful
      dispatch(registerUserSuccessful(response.user));
    } catch (error) {
      // Dispatch the failure action if an error occurs
      dispatch(registerUserFailed(error.message));
    }
  };
};

export const registerUserSuccessful = (user) => {
  console.log("user", user);
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  };
};

export const registerUserFailed = (error) => {
  return {
    type: REGISTER_USER_FAILED,
    payload: error,
  };
};