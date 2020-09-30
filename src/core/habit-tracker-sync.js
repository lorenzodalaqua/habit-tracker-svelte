import { db } from '../firebase/storage';

export async function saveHabitTracker(user, tracker) {
  const userRef = db.collection('users').doc(user.id);
  const serialized = tracker.serialize();
  return userRef.set(serialized);
}

export async function loadHabitTracker(user) {
  const doc = await db.collection('users').doc(user.id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
}
