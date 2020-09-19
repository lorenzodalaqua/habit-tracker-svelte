import { firebase } from './app';
import 'firebase/firestore';

export const db = firebase.firestore();

export async function storeDoc(user, collection, name, data) {
  return db
    .collection('users')
    .doc(user.uid)
    .collection(collection)
    .doc(name)
    .set(data);
}

export async function readDoc(user, collection, name) {
  const doc = await db
    .collection('users')
    .doc(user.uid)
    .collection(collection)
    .doc(name)
    .get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
}
