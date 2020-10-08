<script>
  export let id, index, month, year;
  import { onMount, onDestroy } from 'svelte';
  import habitTrackerStore from '../stores/habit-tracker-store';

  let tracker = null;
  const unsubscribe = habitTrackerStore.subscribe(value => {
    tracker = value;
  });
  onDestroy(unsubscribe);
  const date = new Date();
  const today = date.getDate();
  let name, color, days, classes, isCurrentMonth;
  $: isCurrentMonth = date.getMonth() + 1 === month;
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
    let className = 'checkbox';
    if (isCurrentMonth && day + 1 == today) {
      className += ' today';
    }
    if (day < days.length - 1 && days[day] && days[day + 1]) {
      className += ' streak';
    }
    return className;
  }
  let deletePromptOpen = false;
  function deleteHabit(id) {
    habitTrackerStore.removeHabit(id);
  }
  function openDeletePrompt() {
    deletePromptOpen = true;
  }
  function closeDeletePrompt() {
    deletePromptOpen = false;
  }
</script>

<style>
  .habit-color {
    color: var(--habit-color);
  }

  .row {
    width: 100%;
    margin: 0;
    margin-bottom: 0.25em;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .checkbox-label {
    position: relative;
  }
  .checkbox-label svg {
    position: absolute;
    display: none;
  }

  .checkbox:checked ~ svg {
    position: absolute;
    display: block;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    color: var(--habit-color);
    fill: currentColor;
  }

  .checkbox.today:checked ~ svg {
    background: var(--habit-color);
    color: white;
    border-radius: 50%;
    top: 9px;
    bottom: 9px;
    left: 9px;
    right: 9px;
    width: calc(100% - 18px);
    height: calc(100% - 18px);
    padding: 1px;
  }

  .checkbox:before {
    display: block;
    color: var(--text-color);
    content: attr(data-day);
    font-size: 0.9em;
    font-weight: bold;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .checkbox:checked:before {
    display: none;
  }

  .checkbox.today:not(:checked) {
    background-color: var(--habit-color);
    border: 1px solid var(--habit-color);
  }

  .checkbox.today:not(:checked):focus {
    border: 1px solid var(--accent-color);
  }

  .checkbox.today:not(:checked):before {
    color: white;
  }

  .checkbox.streak:after {
    content: ' ';
    position: absolute;
    height: 5px;
    width: calc(var(--input-size) / 3);
    right: calc(var(--input-size) / -3 - 1px);
    top: calc(50% - 2px);
    background: var(--habit-color);
  }

  .habit-name-text {
    flex: 1 1 100%;
  }

  @media all and (min-width: 1000px) {
    .habit-name-text {
      min-width: 8em;
      flex: 1 1 8em;
    }
  }

  @media all and (min-width: 1500px) {
    .habit-name-text {
      min-width: 15em;
      flex: 1 1 15em;
    }
  }
</style>

<div style="--habit-color: {color}">
  <div class="row habit-color">
    <label class="hidden" for={`name-${id}`}>Nome do hábito:</label>
    <input
      id={`name-${id}`}
      type="text"
      class="habit-name-text"
      placeholder={placeholders[index % placeholders.length]}
      value={name}
      on:input={event => habitTrackerStore.setHabitName(id, event.target.value)} />
    {#each days as value, day}
      <label class="checkbox-label" for={`${day}-${id}`}>
        <span class="hidden">{name} - {day + 1}/{month}/{year}</span>
        <input
          data-day={day + 1}
          class={classes[day]}
          id={`${day}-${id}`}
          type="checkbox"
          checked={value}
          on:change={() => habitTrackerStore.toggleHabitDay(id, day, month, year)} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"><path
            d="M12.98 20.744a3.094 3.094 0 01-4.789.235l-5.575-6.176a2.389 2.389 0 01.176-3.377 2.398 2.398 0 013.383.176l3.944 4.37a.291.291 0 00.45-.023l8.108-10.976a2.398 2.398 0 013.35-.506 2.388 2.388 0 01.505 3.343z" /></svg>
      </label>
    {/each}
    <label class="hidden" for={`${id}-color`}>Cor do hábito {name}</label>
    <input
      id={`${id}-color`}
      type="color"
      value={color}
      on:change={event => habitTrackerStore.setHabitColor(id, event.target.value)} />
    <button
      on:click={deletePromptOpen ? closeDeletePrompt : openDeletePrompt}
      class="icon-button delete-button"><span class="hidden">Delete</span>
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"><title>Delete</title>
        <path
          d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" /></svg>
    </button>
  </div>
  {#if deletePromptOpen}
    <div class="habit-color">
      <span>
        Are you sure you want to delete? You will lose forever all data for this
        habit.
      </span>
      <button on:click={closeDeletePrompt}>Cancel</button><button
        on:click={() => {
          deleteHabit(id);
          closeDeletePrompt();
        }}>Delete</button>
    </div>
  {/if}
</div>
