import { auth, firestore } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { APP_CONSTANTS } from "../constants/APP_CONSTANTS";

export function getUserData() {
  return getAuthenticatedUser().then((result) => {
    const currentUserId = result.uid;
    const userDocRef = doc(firestore, "users", currentUserId);

    return getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    });
  });
}

function addUserToDatabase(uid, name, email, emailVerified) {
  const basicUserSchema = {
    name: name,
    email: email,
    emailVerified: emailVerified,
    tierType: APP_CONSTANTS.BASIC_TIER,
    tags: [],
    preferences: {
      autoSaveTriggerTime: 1,
      language: APP_CONSTANTS.ENGLISH,
      subscribedToEmailNotifications: true,
    },
  };

  return setDoc(doc(firestore, "users", uid), basicUserSchema);
}

export function logInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Creates a new user with email and password and adds them to Firestore
 */
export function createNewUserWithEmailAndPassword(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const uid = userCredentials.user.uid;
      const emailVerified = userCredentials.user.emailVerified;
      return addUserToDatabase(uid, name, email, emailVerified);
    })
    .then(() => {
      return APP_CONSTANTS.SUCCESS;
    })
    .catch((error) => {
      throw error;
    });
}

// Sign in with Google
export function googleAuthSignIn() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const extraInformation = getAdditionalUserInfo(result);
      if (extraInformation.isNewUser) {
        return addUserToDatabase(
          result.user.uid,
          result.user.displayName,
          result.user.email,
          result.user.emailVerified
        );
      } else {
        return;
      }
    })
    .catch((error) => {
      throw error;
    });
}

export function getAuthenticatedUser() {
  return new Promise((resolve) => {
    // onAuthStateChanged will call this function when authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // If a user is authenticated, resolve with user info
      } else {
        resolve(APP_CONSTANTS.UNAUTHENTICATED); // If no user, resolve with 'Unauthenticated'
      }
    });
  });
}
