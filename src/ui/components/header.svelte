<script>
  export let user;
</script>

<style>
  header {
    padding: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    <a href="#user">{user.name}</a>
  {:else}<a href="#login">Login</a>{/if}
</header>
