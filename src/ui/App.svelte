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

  let online = true;
  function checkConnectivity() {
    online = navigator.onLine;
  }
  onMount(() => {
    window.addEventListener('online', checkConnectivity);
    window.addEventListener('offline', checkConnectivity);
  });
  onDestroy(() => {
    unsubscribe();
    window.removeEventListener('online', checkConnectivity);
    window.removeEventListener('offline', checkConnectivity);
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
    <UserOptions {online} />
    <Login {online} />
    <HabitTracker {user} {online} />
  </main>
</div>
