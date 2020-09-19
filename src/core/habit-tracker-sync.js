import { db } from '../firebase/storage';

export async function saveHabitTracker(user, tracker) {
  const batch = db.batch();
  const userRef = db.collection('users').doc(user.uid);
  batch.set(userRef, tracker.serialize());
  for (let id in tracker.habits) {
    await saveHabit(user, tracker.habits[id], batch);
  }
  return batch.commit();
}

export async function loadHabitTracker(user) {
  const doc = await db.collection('users').doc(user.uid);
  if (doc.exists()) {
    return doc.data();
  } else {
    return null;
  }
}

export async function saveHabit(user, habit, batch = null) {
  let habitRef = db
    .collection('users')
    .doc(user.uid)
    .collection('habits')
    .doc(habit.id);
  if (batch) {
    batch.set(habitRef, habit.serialize());
    return true;
  } else {
    return habitRef.set(habit.serialize());
  }
}
