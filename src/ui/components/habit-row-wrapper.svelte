<script>
  import { onMount } from 'svelte';
  import { createHabitStore } from '../../stores/habit-store';
  import MonthTracker from './habit-row.svelte';

  export let key, month, year;

  let habit = createHabitStore(key);
  let name, color, days, tracker;
  $: color = $habit.color;
  $: name = $habit.name;
  $: days = $habit.getMonthlyTracking(month, year);
  function saveToLocalStorage() {
    if ($habit.name) {
      habit.save();
    }
  }
  function loadFromLocalStorage() {
    habit.load();
  }
  onMount(loadFromLocalStorage);

  function setName(event) {
    habit.setName(event.target.value);
    saveToLocalStorage();
  }

  function setColor(event) {
    habit.setColor(event.target.value);
    saveToLocalStorage();
  }

  function toggleDay(day) {
    habit.toggleDay(day, month, year);
    saveToLocalStorage();
  }
</script>

<svelte:window on:focus={loadFromLocalStorage} on:blur={saveToLocalStorage} />

<MonthTracker
  {key}
  {name}
  {color}
  {days}
  {month}
  {year}
  {setName}
  {toggleDay}
  {setColor} />
