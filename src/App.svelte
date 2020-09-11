<script>
  import Header from './ui/components/header.svelte';
  import UserOptions from './ui/components/user-options.svelte';
  import Login from './ui/components/login.svelte';
  import HabitTracker from './ui/components/habit-tracker.svelte';

  import { userStore } from './stores/user-store';
  import { onDestroy } from 'svelte';

  let user = null;
  const unsubscribe = userStore.subscribe(value => {
    user = value;
  });

  const setUser = user => userStore.set(user);

  onDestroy(unsubscribe);
</script>

<style>
  main {
    padding: 8px;
  }
</style>

<div>
  <Header {user} />
  <main>
    <UserOptions {setUser} />
    <Login />
    <HabitTracker {user} />
  </main>
</div>
