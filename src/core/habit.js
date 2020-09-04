export default class Habit {
  constructor({ id, name, color }) {
    this.id = id;
    this.name = name;
    this.tracker = {};
    this.color = color;
  }

  toggleDay(day, month, year) {
    this.ensureTrackerHasMonth(month, year);
    this.tracker[year][month][day] = !this.tracker[year][month][day];
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  getMonthlyTracking(month, year) {
    this.ensureTrackerHasMonth(month, year);
    const booleans = this.tracker[year][month];
    return booleans.slice(0, this.getDaysInMonth(month, year));
  }

  getDaysInMonth(month, year) {
    const daysInMonth = {
      1: 31,
      2: year % 4 === 0 ? 29 : 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };
    return daysInMonth[month];
  }

  ensureTrackerHasMonth(month, year) {
    if (!this.tracker[year]) {
      this.tracker[year] = {};
    }
    if (!this.tracker[year][month]) {
      this.tracker[year][month] = this.createNewMonthTracker();
    }
  }

  createNewMonthTracker() {
    return new Array(32).fill(false);
  }

  saveToLocalStorage() {
    console.log(`Saving habit: ${this.name}`);
    localStorage.setItem(
      `habit-${this.id}`,
      JSON.stringify({
        id: this.id,
        name: this.name,
        tracker: this.tracker,
        color: this.color,
        negative: this.negative
      })
    );
  }

  loadFromLocalStorage(id) {
    const stored = JSON.parse(localStorage.getItem(`habit-${id}`)) || {};
    this.id = id;
    this.name = stored.name || '';
    this.color = stored.color || '#08f08f';
    this.tracker = stored.tracker || {};
    this.negative = stored.negative || false;
    console.log(`Loading habit: ${this.name}`);
    return this;
  }
}
