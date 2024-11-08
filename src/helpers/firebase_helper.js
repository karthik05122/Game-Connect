import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setLoggedInUser(user);
        } else {
          this.clearLoggedInUser();
        }
      });
    }
  }

  registerUser = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => firebase.auth().currentUser)
      .catch(error => this._handleError(error));
  };

  loginUser = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => firebase.auth().currentUser)
      .catch(error => this._handleError(error));
  };

  forgetPassword = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email, {
        url: `${window.location.protocol}//${window.location.host}/login`,
      })
      .then(() => true)
      .catch(error => this._handleError(error));
  };

  logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        this.clearLoggedInUser();
        return true;
      })
      .catch(error => this._handleError(error));
  };

  socialLoginUser = async (type) => {
    let provider;
    if (type === "google") {
        provider = new firebase.auth.GoogleAuthProvider();
    } else if (type === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
    }
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        return user;
    } catch (error) {
        throw this._handleError(error);
    }
  };

  addNewUserToFirestore = (user) => {
    const collection = firebase.firestore().collection("users");
    const profile = user?.additionalUserInfo?.profile || {};
    const details = {
      firstName: profile.given_name || profile.first_name || '',
      lastName: profile.family_name || profile.last_name || '',
      fullName: profile.name || '',
      email: profile.email || '',
      picture: profile.picture || '',
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return { user, details };
  };

  setLoggedInUser = user => {
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  clearLoggedInUser = () => {
    localStorage.removeItem("authUser");
  };

  getAuthenticatedUser = () => {
    const authUser = localStorage.getItem("authUser");
    return authUser ? JSON.parse(authUser) : null;
  };

  _handleError(error) {
    const { code, message } = error;
    console.error(`Firebase error (${code}): ${message}`);
    return message;
  }
}

let _fireBaseBackend = null;

const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

const getFirebaseBackend = () => _fireBaseBackend;

export { initFirebaseBackend, getFirebaseBackend };