<script>
  import HabitTracker from './ui/habit-tracker.svelte';
  import Authentication from './ui/authentication.svelte';
  import { userStore } from './stores/user-store';
  let user = null;
  const unsubscribe = userStore.subscribe(value => {
    user = value;
  });
</script>

<style>
  div {
    margin-bottom: 0.5em;
  }
</style>

<main>
  <h1>Habit Tracker</h1>
  <HabitTracker />
  <!-- {#if user}
    <div>{user.name}</div>
  {:else}
    <div>Login</div>
  {/if} -->
</main>
