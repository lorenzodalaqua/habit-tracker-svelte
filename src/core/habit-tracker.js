import Habit from './habit';

export default class HabitTracker {
  constructor({ habits } = {}) {
    this.set({ habits, lastUpdate: null });
  }

  set({ habits, lastUpdate } = {}) {
    this.habits = habits || {
      1: new Habit({ id: 1 }),
      2: new Habit({ id: 2 }),
      3: new Habit({ id: 3 })
    };
    this.lastUpdate = lastUpdate;
  }

  updateTimestamp() {
    this.lastUpdate = new Date();
  }

  serialize() {
    return {
      ids: Object.keys(this.habits),
      lastUpdate: this.lastUpdate
    };
  }

  save() {
    this.saveTracker();
    Object.keys(this.habits).forEach(id => this.saveHabit(id));
    // TODO: if user is provided and firebase module is loaded, save on firebase here too.
  }

  load() {
    const stored = localStorage.getItem('habit-tracker');
    if (stored) {
      const { ids } = JSON.parse(stored);
      this.habits = {}; // Reset habits to get loaded ones
      ids.forEach(id => this.loadHabit(id));
    }
    // TODO: if user is provided and firebase module is loaded, check which version is newer
    // by the timestamp, and set the value to be from localStorage or firebase, whichever is latest
  }

  saveTracker() {
    localStorage.setItem('habit-tracker', JSON.stringify(this.serialize()));
  }

  saveHabit(id) {
    const habit = this.habits[id];
    if (habit) {
      localStorage.setItem(`habit.${id}`, JSON.stringify(habit.serialize()));
    }
  }

  loadHabit(id) {
    const stored = localStorage.getItem(`habit.${id}`);
    if (stored) {
      const newHabit = new Habit({ id });
      newHabit.set(JSON.parse(stored));
      this.habits[id] = newHabit;
    }
  }

  addHabit() {
    const ids = Object.keys(this.habits);
    const id = ids.length > 0 ? Math.max(...Object.keys(this.habits)) + 1 : 1;
    this.habits[id] = new Habit({ id });
    this.updateTimestamp();
  }

  removeHabit(id) {
    delete this.habits[id];
    this.updateTimestamp();
  }

  toggleHabitDay(id, day, month, year) {
    const habit = this.habits[id];
    if (habit) {
      habit.toggleDay(day, month, year);
    } else {
      console.warn('Trying to toggle unexistent habit day');
    }
    this.updateTimestamp();
  }

  setHabitName(id, name) {
    const habit = this.habits[id];
    if (habit) {
      habit.name = name;
    } else {
      console.warn('Trying to set unexistent habit name');
    }
    this.updateTimestamp();
  }

  setHabitColor(id, color) {
    const habit = this.habits[id];
    if (habit) {
      habit.color = color;
    } else {
      console.warn('Trying to set unexistent habit color');
    }
    this.updateTimestamp();
  }
}
