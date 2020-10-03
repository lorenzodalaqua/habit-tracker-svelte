export default class Habit {
  constructor(args) {
    this.set(args);
  }

  set(stored) {
    this.id = stored.id;
    this.name = stored.name || '';
    this.color = stored.color || this.getRandomColor(stored.id);
    this.tracker = stored.tracker || {};
    return this;
  }

  serialize() {
    return {
      name: this.name,
      tracker: this.tracker,
      color: this.color
    };
  }

  getMonthTracker(month, year) {
    this.ensureTrackerHasMonth(month, year);
    const monthTracker = this.tracker[year][month];
    const booleans = new Array(this.getDaysInMonth(month, year))
      .fill(false)
      .map((_, day) => this.getDayValue(day, monthTracker));
    return booleans;
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
    return 0; // Each mont is a 32-bit integer used as a 32-bit 'array'
  }

  getDayValue(day, month) {
    // This is a way to check if the bit indexed by the day value is set
    // (Shift 1 by the day, and do a bitwise and with the current value, if this
    // is not zero, the day is set)
    return !!(month & (1 << day));
  }
  setDayValue(day, month) {
    // This is a way to set the bit indexed by the day value
    // (Shift 1 by the day, and do a bitwise or with the current value)
    return month | (1 << day);
  }
  clearDayValue(day, month) {
    // This is a way to clear the bit indexed by the day value
    // (Shift 1 by the day, invert this and do a bitwise and with the current value)
    return month & ~(1 << day);
  }

  toggleDay(day, month, year) {
    this.ensureTrackerHasMonth(month, year);
    const monthTracker = this.tracker[year][month];
    const current = this.getDayValue(day, monthTracker);
    if (current) {
      this.tracker[year][month] = this.clearDayValue(day, monthTracker);
    } else {
      this.tracker[year][month] = this.setDayValue(day, monthTracker);
    }
  }

  getRandomColor(id) {
    const options = [
      '#b71ec2',
      '#d51010',
      '#de7b00',
      '#edd60a',
      '#a8d600',
      '#1fb800',
      '#07ca7f',
      '#108ad5',
      '#0059b8',
      '#4c01a7'
    ];
    const index = id % options.length;
    return options[index];
  }
}
