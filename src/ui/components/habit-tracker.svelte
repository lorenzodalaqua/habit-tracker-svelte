<script>
  import { onMount, onDestroy } from 'svelte';
  import HabitRow from './habit-row.svelte';
  import habitTrackerStore from '../stores/habit-tracker-store';

  let tracker = null;
  const unsubscribe = habitTrackerStore.subscribe(value => {
    tracker = value;
  });
  onMount(habitTrackerStore.load);
  onDestroy(unsubscribe);

  // Date and month selection
  const date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const months = new Array(12).fill(0).map((_, i) => i + 1);
  const years = new Array(30).fill(0).map((_, i) => 2020 + i);
</script>

<style>
  div {
    margin-bottom: 0.5em;
  }
  .monthPicker {
    display: flex;
  }

  .monthPicker * {
    width: 100%;
  }
  @media all and (min-width: 700px) {
    .monthPicker {
      max-width: 20em;
    }
  }
</style>

<svelte:window
  on:focus={habitTrackerStore.load}
  on:blur={habitTrackerStore.save} />

<div id="tracker">
  {#if !tracker.user}
    <div>
      Your habits are being tracked locally, to save them you need to <a href="#login">Login</a>
    </div>
  {/if}
  <div>
    <div class="monthPicker">
      <label class="hidden" for="month"> Month </label>
      <select bind:value={month} id="month">
        {#each months as monthNumber}
          <option>{monthNumber}</option>
        {/each}
      </select>
      <label class="hidden" for="year"> Year </label>
      <select bind:value={year} id="year">
        {#each years as yearNumber}
          <option>{yearNumber}</option>
        {/each}
      </select>
    </div>
    {#each Object.keys(tracker.habits) as id, index}
      <HabitRow {index} {id} {month} {year} />
    {/each}
    <button on:click={() => habitTrackerStore.addHabit()}> Add habit </button>
  </div>
</div>
