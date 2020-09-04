import firebase from 'firebase';
import firestore from 'firebase/firestore'; // Required for side-effects

const config = {
  apiKey: 'AIzaSyB9uI_t8GX_epmaev-vbTugEAQZsYlLfAk',
  authDomain: 'habit-tracker-7bfeb.firebaseapp.com',
  databaseURL: 'https://habit-tracker-7bfeb.firebaseio.com',
  projectId: 'habit-tracker-7bfeb',
  storageBucket: 'habit-tracker-7bfeb.appspot.com',
  messagingSenderId: '183449563338',
  appId: '1:183449563338:web:61178c7b8e64909e1a4433'
};
firebase.initializeApp(config);

const db = firebase.firestore();

export async function storeDoc(collection, name, data) {
  return db.collection(collection).doc(name).set(data);
}

export async function readDoc(collection, name) {
  const doc = await db.collection(collection).doc(name).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
}

export async function readAll(collection) {
  const query = await db.collection(collection).get();
  const docs = [];
  query.forEach(doc => docs.push(doc.data()));
  return docs;
}
