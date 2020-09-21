import { db } from '../firebase/storage';

export async function saveHabitTracker(user, tracker) {
  const batch = db.batch();
  const userRef = db.collection('users').doc(user.id);
  batch.set(userRef, tracker.serialize());
  for (let id in tracker.habits) {
    await saveHabit(user, id, tracker.habits[id], batch);
  }
  return batch.commit();
}

export async function loadHabitTracker(user) {
  const doc = await db.collection('users').doc(user.id);
  if (doc.exists()) {
    return doc.data();
  } else {
    return null;
  }
}

export async function saveHabit(user, id, habit, batch = null) {
  let habitRef = db
    .collection('users')
    .doc(user.id)
    .collection('habits')
    .doc(id);
  if (batch) {
    batch.set(habitRef, habit.serialize());
    return true;
  } else {
    return habitRef.set(habit.serialize());
  }
}
