<script>
  export let setUser;

  import { signOut } from '../../core/firebase';

  let color = '#0f80f8';
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
    <label>App color: <input
        id={`app-color`}
        type="color"
        bind:value={color}
        on:change={e => {
          document.documentElement.style.setProperty('--accent-color', e.target.value);
        }} /></label>
    <button
      on:click={() => {
        signOut();
        setUser(null);
        window.location.hash = '';
      }}>Sign out</button>
  </div>
</div>
