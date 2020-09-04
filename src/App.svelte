<script>
  import { onMount } from 'svelte';
  import HabitRow from './ui/row-wrapper.svelte';
  import { readDoc, readAll, storeDoc } from './core/firebase';

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
  function saveFirebase() {
    storeDoc('testing', 'new', {
      id: '2',
      name: 'lorenzo',
      date: new Date()
    }).then(doc => console.log('Saved:', doc));
  }
  function loadFirebase() {
    //readDoc('testing', 'lorenzo').then(doc => console.log('Loaded:', doc));
    readAll('testing').then(docs => docs.forEach(doc => console.log(doc)));
  }
  onMount(loadFromLocalStorage);
</script>

<style>
  div {
    margin-bottom: 0.5em;
  }
</style>

<svelte:window on:focus={loadFromLocalStorage} on:blur={saveToLocalStorage} />
<main>
  <button on:click={saveFirebase}>SaveFirebase</button>
  <button on:click={loadFirebase}>LoadFirebase</button>
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
</main>
