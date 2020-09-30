<script>
  export let user;
  import { onMount, onDestroy } from 'svelte';
  import HabitRow from './habit-row.svelte';
  import habitTrackerStore from '../stores/habit-tracker-store';
  import appStateStore, { APP_STATES } from '../stores/app-state-store';
  let syncingModule = null;
  import('../../core/habit-tracker-sync')
    .then(value => {
      syncingModule = value;
    })
    .catch(() => {
      appStateStore.set(APP_STATES.ERROR);
    });

  let tracker;
  const unsubscribeTracker = habitTrackerStore.subscribe(value => {
    tracker = value;
  });
  let status;
  const unsubscribeStatus = appStateStore.subscribe(value => {
    status = value;
  });

  const SYNC_INTERVAL = 500;
  function sync() {
    if (navigator.onLine && user) {
      if (status === APP_STATES.UNLOADED) {
        loadFromStorage();
      }
      if (status === APP_STATES.UNSAVED_CHANGES) saveToStorage();
    }
  }
  onMount(() => {
    habitTrackerStore.load();
    setInterval(sync, SYNC_INTERVAL);
  });
  onDestroy(() => {
    unsubscribeTracker();
    unsubscribeStatus();
    clearInterval(sync);
  });

  function loadFromStorage() {
    if (syncingModule && user) {
      syncingModule
        .loadHabitTracker(user)
        .then(stored => {
          habitTrackerStore.set(stored);
          appStateStore.set(APP_STATES.SYNCED);
        })
        .catch(error => {
          appStateStore.set(APP_STATES.ERROR);
          console.error(error);
        });
    }
  }
  function saveToStorage() {
    if (user && syncingModule) {
      appStateStore.set(APP_STATES.SAVING);
      syncingModule
        .saveHabitTracker(user, tracker)
        .then(() => {
          appStateStore.set(APP_STATES.SYNCED);
        })
        .catch(error => {
          console.error(error);
          appStateStore.set(APP_STATES.ERROR);
        });
    }
  }

  function onFocus() {
    habitTrackerStore.load();
    loadFromStorage();
  }

  function onBlur() {
    habitTrackerStore.save();
  }

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

<svelte:window on:focus={onFocus} on:blur={onBlur} />

<div id="tracker">
  {#if user}
    {#if status == APP_STATES.SAVING}
      <div>Saving...</div>
    {:else if status == APP_STATES.UNLOADED}
      <div>Loading...</div>
    {:else if status == APP_STATES.UNSAVED_CHANGES}
      <div>Unsaved changes.</div>
    {:else if status == APP_STATES.SYNCED}
      <div>Synced!</div>
    {:else if status == APP_STATES.ERROR}
      <div>{navigator.onLine ? 'Error!' : 'Offline'}</div>
    {/if}
  {:else}
    <div>
      Warning, your habits are only being tracked locally in your browser, to
      save them you need to
      <a href="#login">Login</a>
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
