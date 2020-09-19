import { writable } from 'svelte/store';
import HabitTracker from '../../core/habit-tracker';

const tracker = new HabitTracker();
tracker.load(); // load from localStorage

const { subscribe, set, update } = writable(tracker);

const habitTrackerStore = {
  subscribe,
  set,
  update,
  save: () => {
    tracker.save();
  },
  load: () => {
    tracker.load();
    set(tracker);
  },
  addHabit: () =>
    update(tracker => {
      tracker.addHabit();
      tracker.save();
      return tracker;
    }),
  removeHabit: id =>
    update(tracker => {
      tracker.removeHabit(id);
      tracker.save();
      return tracker;
    }),
  toggleHabitDay: (id, day, month, year) =>
    update(tracker => {
      tracker.toggleHabitDay(id, day, month, year);
      tracker.saveTracker();
      tracker.saveHabit(id);
      return tracker;
    }),
  setHabitName: (id, name) =>
    update(tracker => {
      tracker.setHabitName(id, name);
      tracker.saveTracker();
      tracker.saveHabit(id);
      return tracker;
    }),
  setHabitColor: (id, color) =>
    update(tracker => {
      tracker.setHabitColor(id, color);
      tracker.saveTracker();
      tracker.saveHabit(id);
      return tracker;
    })
};

export default habitTrackerStore;
