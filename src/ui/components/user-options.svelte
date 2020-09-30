<script>
  import { onMount } from 'svelte';
  import userStore from '../stores/user-store';
  const modulePromise = import('../../firebase/authentication');

  let signOut = null;
  let error = false;
  onMount(() => {
    modulePromise
      .then(module => {
        signOut = module.signOut;
      })
      .catch(e => {
        error = true;
      });
  });

  let color = '#0059b8';
</script>

<style>
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .content > * {
    margin-bottom: 1em;
  }
</style>

<div id="user" class="tab">
  <div class="content">
    <h2>User Options</h2>
    {#if navigator.onLine}
      <label>App color:
        <input
          id={`app-color`}
          type="color"
          bind:value={color}
          on:change={e => {
            document.documentElement.style.setProperty('--accent-color', e.target.value);
          }} /></label>
      <button
        disabled={!signOut && !error}
        on:click={() => {
          signOut();
          userStore.clear();
          window.location.hash = '';
        }}>Sign out</button>
    {:else}
      <p>You are offline, user options are not available</p>
    {/if}
  </div>
</div>
