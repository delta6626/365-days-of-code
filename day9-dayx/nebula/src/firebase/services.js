import { auth, firestore } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

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
    tierType: "basic",
    tags: [],
    preferences: {
      autoSaveTriggerTime: 1,
      language: "en",
      subscribedToEmailNotifications: true,
    },
  };

  return setDoc(doc(firestore, "users", uid), basicUserSchema);
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
      return "SUCCESS";
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
        resolve("Unauthenticated"); // If no user, resolve with 'Unauthenticated'
      }
    });
  });
}
