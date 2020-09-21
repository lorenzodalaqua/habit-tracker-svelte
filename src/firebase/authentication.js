import { firebase } from './app';
import * as firebaseui from 'firebaseui';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export function renderFirebaseUIAuth(elementID) {
  ui.start(`#${elementID}`, {
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      }
    ]
  });
}

export function onUserUpdate(callback) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

export async function signOut() {
  return firebase.auth().signOut();
}
