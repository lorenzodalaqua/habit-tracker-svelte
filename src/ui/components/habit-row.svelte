<script>
  export let id, index, month, year;
  import { onMount, onDestroy } from 'svelte';
  import habitTrackerStore from '../stores/habit-tracker-store';

  let tracker = null;
  const unsubscribe = habitTrackerStore.subscribe(value => {
    tracker = value;
  });
  onDestroy(unsubscribe);
  const today = new Date().getDate();
  let name, color, days, classes;
  $: name = tracker.habits[id].name;
  $: color = tracker.habits[id].color;
  $: days = tracker.habits[id].getMonthTracker(month, year);
  $: classes = days ? days.map((value, day) => getCheckboxClass(day)) : [];
  const placeholders = [
    'What is your next new habit?',
    'What habit do you want to track?',
    'Which habit do you want to reinforce?'
  ];
  function getCheckboxClass(day) {
    let className = '';
    if (day == today) {
      className += 'today';
    }
    if (day > 0 && days[day] && days[day - 1]) {
      className += ' streak';
    }
    return className;
  }
</script>

<style>
  :root {
    --input-size: 1.8em;
  }

  .row {
    width: 100%;
    margin: 0;
    margin-bottom: 0.25em;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }

  .checkboxes {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  input[type='text'] {
    min-width: 100%;
    flex: 1 1 100%;
  }

  @media all and (min-width: 1000px) {
    :root {
      --input-size: 1.7em;
    }

    input[type='text'] {
      min-width: 8em;
      flex: 1 1 8em;
    }
  }

  @media all and (min-width: 1500px) {
    input[type='text'] {
      min-width: 12em;
      flex: 1 1 12em;
    }
  }

  input {
    border-radius: 8px;
    border: 1px solid white;
    background: #ffffff;
    box-shadow: 1px 1px 4px #cccccc, -1px -1px 4px #ffffff;
    margin: 0;
    padding: 0;
    margin: 5px;
  }

  input[type='color'] {
    background: white;
    width: var(--input-size);
    height: var(--input-size);
  }

  input[type='text'] {
    color: var(--habit-color);
    font-weight: bold;
    font-size: 0.9em;
    padding: 0 0.2em;
    height: var(--input-size);
  }

  input:hover {
    border: 1px solid var(--habit-color);
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: var(--input-size);
    height: var(--input-size);
    display: flex;
    padding: 0;
  }

  input[type='checkbox']:checked {
    color: var(--habit-color);
    box-shadow: inset -1px -1px 6px #ffffff, inset 1px 1px 6px #cccccc;
  }

  input[type='checkbox']:before {
    display: block;
    color: var(--habit-color);
    content: attr(data-day);
    font-size: 0.9em;
    font-weight: bold;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  input[type='checkbox'].today:not(:checked) {
    background-color: var(--habit-color);
    border: 1px solid var(--habit-color);
  }

  input[type='checkbox'].today:not(:checked):focus {
    border: 1px solid var(--accent-color);
  }
  input[type='checkbox'].today:not(:checked):before {
    color: white;
  }

  input[type='checkbox']:checked:before {
    display: block;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    right: 4px;
    border-radius: 50%;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    content: '✔️';
    font-size: 0.7em;
    color: var(--habit-color);
    background: white;
  }

  input[type='checkbox'].today:checked:before {
    background: var(--habit-color);
    color: white;
  }

  input[type='checkbox'].streak:after {
    content: ' ';
    position: absolute;
    height: 3px;
    width: 12px;
    left: -13px;
    top: calc(50% - 1px);
    background: var(--habit-color);
  }

  input:focus {
    outline: none;
    border: 1px solid var(--accent-color);
  }

  input[type='text']:focus {
    box-shadow: inset -1px -1px 6px #ffffff, inset 1px 1px 6px #cccccc;
  }
</style>

<div class="list" style="--habit-color: {color}">
  <div class="row">
    <div class="checkboxes">
      <label class="hidden" for={`name-${id}`}>Nome do hábito:</label>
      <input
        id={`name-${id}`}
        type="text"
        placeholder={placeholders[index % placeholders.length]}
        value={name}
        on:input={event => habitTrackerStore.setHabitName(id, event.target.value)} />
      {#each days as value, day}
        <label class="hidden" for={`${day}-${id}`}>
          {name} - {day}/{month}/{year}
        </label>
        <input
          data-day={day + 1}
          class={classes[day]}
          id={`${day}-${id}`}
          type="checkbox"
          checked={value}
          on:change={() => habitTrackerStore.toggleHabitDay(id, day, month, year)} />
      {/each}
      <label class="hidden" for={`${id}-color`}>Cor do hábito {name}</label>
      <input
        id={`${id}-color`}
        type="color"
        value={color}
        on:change={event => habitTrackerStore.setHabitColor(id, event.target.value)} />
      <button on:click={() => habitTrackerStore.removeHabit(id)}>Delete</button>
    </div>
  </div>
</div>
