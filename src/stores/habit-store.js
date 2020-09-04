import { writable } from 'svelte/store';
import Habit from '../core/habit';

export function createHabitStore(key) {
  let habit = new Habit({
    id: key,
    name: '',
    color: '#f08f08'
  });

  const { subscribe, update } = writable(habit);

  return {
    subscribe,
    toggleDay: (day, month, year) =>
      update(habit => habit.toggleDay(day, month, year)),
    setName: name => update(habit => habit.setName(name)),
    setColor: color => update(habit => habit.setColor(color)),
    save: () => update(habit => habit.saveToLocalStorage()),
    load: () => update(habit => habit.loadFromLocalStorage(habit.id))
  };
}
