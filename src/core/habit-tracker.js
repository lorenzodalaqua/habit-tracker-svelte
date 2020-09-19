import Habit from './habit';

export default class HabitTracker {
  constructor({ user, habits } = {}) {
    this.set({ user, habits });
  }

  set({ user, habits } = {}) {
    this.user = user || null;
    this.habits = habits || {
      1: new Habit({ id: 1 }),
      2: new Habit({ id: 2 }),
      3: new Habit({ id: 3 })
    };
  }

  serialize() {
    return {
      user: this.user,
      ids: Object.keys(this.habits)
    };
  }

  save() {
    this.saveTracker();
    Object.keys(this.habits).forEach(id => this.saveHabit(id));
  }

  load() {
    const stored = localStorage.getItem('habit-tracker');
    if (stored) {
      const { user, ids } = JSON.parse(stored);
      this.user = user;
      this.habits = {}; // Reset habits to get loaded ones
      ids.forEach(id => this.loadHabit(id));
    }
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
  }

  removeHabit(id) {
    delete this.habits[id];
  }

  toggleHabitDay(id, day, month, year) {
    const habit = this.habits[id];
    if (habit) {
      habit.toggleDay(day, month, year);
    } else {
      console.warn('Trying to toggle unexistent habit day');
    }
  }

  setHabitName(id, name) {
    const habit = this.habits[id];
    if (habit) {
      habit.name = name;
    } else {
      console.warn('Trying to set unexistent habit name');
    }
  }

  setHabitColor(id, color) {
    const habit = this.habits[id];
    if (habit) {
      habit.color = color;
    } else {
      console.warn('Trying to set unexistent habit color');
    }
  }
}
