export default class Habit {
  constructor(args) {
    this.set(args);
  }

  toggleDay(day, month, year) {
    this.ensureTrackerHasMonth(month, year);
    this.tracker[year][month][day] = !this.tracker[year][month][day];
  }

  set(stored) {
    this.name = stored.name || '';
    this.color = stored.color || '#666666';
    this.tracker = stored.tracker || {};
    this.negative = stored.negative || false;
    return this;
  }

  serialize() {
    return {
      name: this.name,
      tracker: this.tracker,
      color: this.color,
      negative: this.negative
    };
  }

  getMonthTracker(month, year) {
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
}
