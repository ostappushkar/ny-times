import * as firebase from "firebase";
import "firebase/auth";
export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACR_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};
firebase.initializeApp(config);
export const persistance = firebase.auth.Auth.Persistence.LOCAL;
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const authRef = firebase.auth();
