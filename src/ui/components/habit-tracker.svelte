<script>
  export let user, status;
  import { onMount, onDestroy } from 'svelte';
  import HabitRow from './habit-row.svelte';
  import habitTrackerStore from '../stores/habit-tracker-store';
  import appStateStore, { APP_STATES } from '../stores/app-state-store';
  import userStore from '../stores/user-store';
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

  const SYNC_INTERVAL = 500;
  function sync() {
    if (navigator.onLine && user) {
      if (status === APP_STATES.UNLOADED) {
        loadFromStorage();
      }
      if (status === APP_STATES.UNSAVED_CHANGES) {
        saveToStorage();
      }
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
          if (error.code == 'permission-denied') {
            userStore.clear();
          }
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
          if (error.code == 'permission-denied') {
            userStore.clear();
          }
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

  let isLoading = false;
  $: isLoading = user && status == APP_STATES.UNLOADED;

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

  .controls {
    color: var(--accent-color);
  }

  .monthPicker {
    display: flex;
  }

  .monthPicker * {
    width: 100%;
  }
  @media all and (min-width: 768px) {
    .monthPicker {
      max-width: 20rem;
    }
  }

  .add-habit {
    display: flex;
  }
  .add-habit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
  }
  .add-habit-button svg {
    margin-right: 0.5em;
    fill: currentColor;
    width: 1em;
    height: 1em;
  }
  @media all and (min-width: 768px) {
    .add-habit-button {
      flex: 0 0 auto;
    }
  }
</style>

<svelte:window on:focus={onFocus} on:blur={onBlur} />

<div id="tracker">
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <div class="controls">
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
      <div class="add-habit">
        <button
          class="add-habit-button"
          on:click={() => habitTrackerStore.addHabit()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"><path
              d="M19.602 7.67a1.316 1.316 0 0 0-.966-.397h-5.909v-5.91c0-.378-.133-.7-.398-.965A1.315 1.315 0 0 0 11.363 0H8.636c-.378 0-.7.132-.966.398a1.315 1.315 0 0 0-.397.966v5.909h-5.91c-.378 0-.7.132-.965.398A1.315 1.315 0 0 0 0 8.636v2.728c0 .379.132.7.398.966.265.265.587.397.966.397h5.909v5.91c0 .378.132.7.397.966.266.265.588.397.966.397h2.727c.38 0 .701-.132.966-.397.266-.266.398-.588.398-.966v-5.91h5.91c.378 0 .7-.132.965-.397s.398-.587.398-.966V8.636c0-.378-.132-.7-.398-.965z" /></svg>
          Add habit
        </button>
      </div>
    </div>
  {/if}
</div>
