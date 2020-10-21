import Habit from './habit';

const defaultHabits = {
  1: new Habit({ id: 1 })
};

export default class HabitTracker {
  constructor({ habits } = {}) {
    this.set({ habits, lastUpdate: null });
  }

  set({ habits, lastUpdate } = {}) {
    this.lastUpdate = lastUpdate;
    if (habits) {
      this.habits = {}; // Reset habits to get loaded ones
      Object.keys(habits).forEach(id => {
        this.habits[id] = new Habit(habits[id]);
      });
    } else {
      this.habits = defaultHabits;
    }
  }

  updateTimestamp() {
    this.lastUpdate = new Date();
  }

  serialize() {
    return {
      habits: Object.keys(this.habits).map(id => this.habits[id].serialize()),
      lastUpdate: this.lastUpdate
    };
  }

  save() {
    localStorage.setItem('habit-tracker', JSON.stringify(this.serialize()));
  }

  load() {
    const stored = localStorage.getItem('habit-tracker');
    if (stored) {
      this.set(JSON.parse(stored));
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
