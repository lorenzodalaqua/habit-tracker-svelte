<script>
  import Header from './components/header.svelte';
  // Pages
  import Settings from './components/settings.svelte';
  import Login from './components/login.svelte';
  import HabitTracker from './components/habit-tracker.svelte';
  import { onDestroy } from 'svelte';

  import appStateStore from './stores/app-state-store';
  import userStore from './stores/user-store';
  let user;
  const unsubscribeUser = userStore.subscribe(store => {
    user = store.user;
  });

  let status;
  const unsubscribeStatus = appStateStore.subscribe(value => {
    status = value;
  });
  onDestroy(() => {
    unsubscribeUser();
    unsubscribeStatus();
  });
</script>

<style>
  main {
    padding: 8px;
  }

  .notice {
    border-bottom: 2px solid var(--accent-color);
    border-radius: var(--border-radius);
    margin: 8px;
    padding: 4px;
  }
</style>

<div>
  <Header {user} {status} />
  {#if !user}
    <div class="notice">
      Warning, your habits are only being tracked locally in your browser, to
      save them you need to
      <a href="#login">Login</a>
    </div>
  {/if}
  <main>
    <Settings {user} />
    <Login />
    <HabitTracker {user} {status} />
  </main>
</div>
