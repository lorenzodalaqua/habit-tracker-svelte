<script>
  export let user, status;
  import { APP_STATES } from '../stores/app-state-store';
</script>

<style>
  header {
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
    box-shadow: 1px 1px 4px #cccccc, -1px -1px 4px #ffffff;
    border-radius: 8px;
    /* border-bottom: 2px solid var(--accent-color); */
    font-size: 1rem;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 1.2rem;
  }

  .status {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85em;
  }

  .status svg {
    --icon-size: 15px;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--accent-color);
    margin-right: 0.25em;
  }
</style>

<header>
  <h1>
    <a
      href="/"
      on:click={e => {
        e.preventDefault();
        window.location.hash = '';
      }}>Habit Tracker</a>
  </h1>

  {#if user}
    {#if status == APP_STATES.SYNCED}
      <div class="status">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
          width="15"
          height="15"><path
            d="M12.98 20.744a3.094 3.094 0 01-4.789.235l-5.575-6.176a2.389 2.389 0 01.176-3.377 2.398 2.398 0 013.383.176l3.944 4.37a.291.291 0 00.45-.023l8.108-10.976a2.398 2.398 0 013.35-.506 2.388 2.388 0 01.505 3.343z" /></svg>
        Saved
      </div>
    {:else if status == APP_STATES.ERROR}
      <div class="status">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="15"
          height="15"><path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z" /></svg>{navigator.onLine ? 'Error!' : 'Offline'}
      </div>
    {:else}
      <div class="status">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="15"
          height="15"><path
            d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z" /></svg>
        {#if status == APP_STATES.SAVING}
          Saving...
        {:else if status == APP_STATES.UNLOADED}
          Loading...
        {:else if status == APP_STATES.UNSAVED_CHANGES}
          {navigator.onLine ? 'Saving...' : 'Modified'}
        {/if}
      </div>
    {/if}
    <a href="#user">Settings</a>
  {:else}<a href="#login">Login</a>{/if}
</header>
