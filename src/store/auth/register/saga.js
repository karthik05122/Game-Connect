import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  console.log("Attempting to register user via:", process.env.REACT_APP_DEFAULTAUTH);
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = yield call(
        fireBaseBackend.registerUser,
        user.email,
        user.password
      );
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = yield call(postJwtRegister, "/post-jwt-register", user);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = yield call(postFakeRegister, user);
    } else {
      throw new Error("Unsupported authentication method");
    }
    
    yield put(registerUserSuccessful(response));
  } catch (error) {
    console.log("Registration error:", error);
    yield put(registerUserFailed(error.message || "Registration failed"));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
