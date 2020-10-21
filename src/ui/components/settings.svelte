<script>
  export let user;
  import userStore from '../stores/user-store';
  import appStateStore, { APP_STATES } from '../stores/app-state-store';
  let authModule = null;
  import('../../firebase/authentication')
    .then(value => {
      authModule = value;
    })
    .catch(() => {
      appStateStore.set(APP_STATES.ERROR);
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
    <h2>Settings</h2>
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
        class="accent-color"
        disabled={!authModule}
        on:click={() => {
          authModule.signOut();
          userStore.clear();
          window.location.hash = '';
        }}>Sign out</button>
    {:else}
      <p>You are offline, user options are not available</p>
    {/if}
  </div>
</div>
