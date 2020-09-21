<script>
  export let user, online;
  import { onMount, onDestroy } from 'svelte';
  import HabitRow from './habit-row.svelte';
  import habitTrackerStore from '../stores/habit-tracker-store';

  let tracker = null;
  const unsubscribe = habitTrackerStore.subscribe(value => {
    tracker = value;
  });
  const syncingModule = import('../../core/habit-tracker-sync');
  // TODO: move the whole saving/loading logic to the habit-tracker class, and make the dynamic import there.
  // Here we only keep the syncing logic and call the store save/load on interval and on blur/focus
  // Note: we will have to call the load function after the user is first loaded also.
  const SYNC_INTERVAL = 3000;
  const STATES = { SAVED: 'SAVED', SAVING: 'SAVING', FAILED: 'FAILED' };
  let status = STATES.SAVED;
  function sync() {
    if (online && user) {
      status = STATES.SAVING;
      syncingModule
        .then(({ saveHabitTracker }) => {
          saveHabitTracker(user, tracker)
            .then(() => {
              status = STATES.SAVED;
            })
            .catch(e => {
              console.error(e);
              status = STATES.FAILED;
            });
        })
        .catch(e => {
          console.error('module', e);
          status = STATES.FAILED;
        });
    } else {
      status = STATES.SAVED;
    }
  }
  onMount(() => {
    habitTrackerStore.load();
    setInterval(sync, SYNC_INTERVAL);
  });
  onDestroy(() => {
    unsubscribe();
    clearInterval(sync);
  });

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
  {#if user}
    {#if status == STATES.SAVING}
      <div>Saving...</div>
    {:else if status == STATES.FAILED}
      <div>Error saving.</div>
    {:else if status == STATES.SAVED}
      <div>Saved.</div>
    {/if}
  {:else}
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
