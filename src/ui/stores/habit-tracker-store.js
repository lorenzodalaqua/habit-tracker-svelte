import { writable } from 'svelte/store';
import HabitTracker from '../../core/habit-tracker';
import appStateStore, { APP_STATES } from './app-state-store';

const tracker = new HabitTracker();
tracker.load(); // load from localStorage
const { subscribe, set, update } = writable(tracker);

function onSave(tracker) {
  tracker.save();
  appStateStore.set(APP_STATES.UNSAVED_CHANGES);
}

const habitTrackerStore = {
  subscribe,
  set: newValue => {
    tracker.set(newValue);
    set(tracker);
  },
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
      onSave(tracker);
      return tracker;
    }),
  removeHabit: id =>
    update(tracker => {
      tracker.removeHabit(id);
      onSave(tracker);
      return tracker;
    }),
  toggleHabitDay: (id, day, month, year) =>
    update(tracker => {
      tracker.toggleHabitDay(id, day, month, year);
      onSave(tracker);
      return tracker;
    }),
  setHabitName: (id, name) =>
    update(tracker => {
      tracker.setHabitName(id, name);
      onSave(tracker);
      return tracker;
    }),
  setHabitColor: (id, color) =>
    update(tracker => {
      tracker.setHabitColor(id, color);
      onSave(tracker);
      return tracker;
    })
};

export default habitTrackerStore;
