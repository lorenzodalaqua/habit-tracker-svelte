<script>
  import Header from './components/header.svelte';
  // Pages
  import UserOptions from './components/user-options.svelte';
  import Login from './components/login.svelte';
  import HabitTracker from './components/habit-tracker.svelte';

  import { onDestroy, onMount } from 'svelte';

  import userStore from './stores/user-store';
  let user;
  const unsubscribe = userStore.subscribe(store => {
    user = store.user;
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  main {
    padding: 8px;
  }
</style>

<div>
  <Header {user} />
  <main>
    <UserOptions />
    <Login />
    <HabitTracker {user} />
  </main>
</div>
