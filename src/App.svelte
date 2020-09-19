<script>
  import Header from './ui/components/header.svelte';
  import HabitTracker from './ui/components/habit-tracker.svelte';

  // Pages
  // import UserOptions from './ui/components/user-options.svelte';
  // import Login from './ui/components/login.svelte';

  import { onDestroy, onMount } from 'svelte';

  const SYNC_INTERVAL = 3000;

  let user = null;

  let online = true;
  let synced = false;
  function checkConnectivity() {
    if (navigator.onLine) {
      online = true;
    } else {
      online = false;
    }
  }
  function sync() {
    if (online) {
      // Here we try to save everything to DB every few seconds
      synced = false;
      setTimeout(() => {
        synced = true;
      }, 1000);
    }
  }
  onMount(() => {
    window.addEventListener('online', checkConnectivity);
    window.addEventListener('offline', checkConnectivity);
    setInterval(sync, SYNC_INTERVAL);
  });
  onDestroy(() => {
    unsubscribe();
    window.removeEventListener('online', checkConnectivity);
    window.removeEventListener('offline', checkConnectivity);
    clearInterval(sync);
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
    <p>{synced ? 'Saved' : 'Saving...'}</p>
    <p>{online ? 'Online' : 'Offline'}</p>
    <!-- <UserOptions {setUser} />
    <Login online={true} /> -->
    <HabitTracker />
  </main>
</div>
