<script>
  import Header from './ui/components/header.svelte';
  import HabitTracker from './ui/components/habit-tracker.svelte';

  // Pages
  // import UserOptions from './ui/components/user-options.svelte';
  // import Login from './ui/components/login.svelte';

  import { userStore } from './stores/user-store';
  import { onDestroy, onMount } from 'svelte';

  let user = null;
  const unsubscribe = userStore.subscribe(value => {
    user = value;
  });
  const setUser = user => userStore.set(user);
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
        console.log('synced');
      }, 1000);
    }
  }
  onMount(() => {
    window.addEventListener('online', checkConnectivity);
    window.addEventListener('offline', checkConnectivity);
    setInterval(sync, 2000);
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
    <HabitTracker {user} />
  </main>
</div>
