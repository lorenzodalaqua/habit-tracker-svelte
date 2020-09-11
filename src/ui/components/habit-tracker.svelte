<script>
  export let user;

  import { onMount } from 'svelte';
  import HabitRow from './habit-row-wrapper.svelte';
  import Habit from '../../core/habit';
  import { readAll } from '../../core/firebase';

  const date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const months = new Array(12).fill(0).map((_, i) => i + 1);
  const years = new Array(30).fill(0).map((_, i) => 2020 + i);

  let makeHabits = number => new Array(number).fill(0).map((_, i) => i);
  let habits = 8;
  function saveToLocalStorage(number) {
    if (number > 0) {
      localStorage.setItem('habits-number', number);
    }
  }
  function loadFromLocalStorage() {
    habits = Number(localStorage.getItem('habits-number'));
  }

  async function loadFromFireBase() {
    const habitData = await readAll('habits');
    habitData.forEach(dbData => {
      const habit = new Habit(dbData);
      habit.saveToLocalStorage();
    });
    habits = habitData.length;
    localStorage.setItem('habits-number', habits);
    return true;
  }

  const promise = loadFromFireBase();
</script>

<style>
  div {
    margin-bottom: 0.5em;
  }
</style>

<!-- <svelte:window on:focus={loadFromLocalStorage} on:blur={saveToLocalStorage} /> -->

<div id="tracker">
  {#if !user}
    <div>
      Your habits are being tracked locally, to save them you need to <a href="#login">Login</a>
    </div>
  {/if}
  {#await promise}
    <div>...Loading</div>
  {:then _}
    <div>
      <div>
        <select bind:value={month}>
          {#each months as monthNumber}
            <option>{monthNumber}</option>
          {/each}
        </select>
        <select bind:value={year}>
          {#each years as yearNumber}
            <option>{yearNumber}</option>
          {/each}
        </select>
      </div>
      {#each Array(habits) as _, key}
        <HabitRow {key} {month} {year} />
      {/each}
      <button
        on:click={e => {
          habits = habits + 1;
          saveToLocalStorage(habits);
        }}>
        Add habit
      </button>
      <button
        on:click={e => {
          localStorage.removeItem(habits - 1);
          habits = habits - 1;
          saveToLocalStorage(habits);
        }}>
        Remove habit
      </button>
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
