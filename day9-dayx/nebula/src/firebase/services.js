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

export function updateUserData(userObject) {
  return getAuthenticatedUser().then((result) => {
    return setDoc(doc(firestore, "users", result.uid), userObject, {
      merge: true,
    });
  });
}

function addUserToDatabase(uid, name, email, authenticationMethod) {
  const basicUserSchema = {
    name: name,
    email: email,
    authenticationMethod: authenticationMethod,
    tierType: APP_CONSTANTS.BASIC_TIER,
    tags: [],
    pinnedNotes: [],
    shortcuts: {
      DASHBOARD_PAGE: "ctrl+shift+d",
      NOTES_PAGE: "ctrl+shift+n",
      NOTEBOOKS_PAGE: "ctrl+shift+b",
      SETTINGS_PAGE: "ctrl+shift+s",
    },
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
export function createNewUserWithEmailAndPassword(
  name,
  email,
  password,
  authenticationMethod
) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const uid = userCredentials.user.uid;
      return addUserToDatabase(uid, name, email, authenticationMethod);
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
          APP_CONSTANTS.WITH_GOOGLE
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
