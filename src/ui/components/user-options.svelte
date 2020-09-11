<script>
  export let setUser;

  import { signOut } from '../../core/firebase';
</script>

<style>
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>

<div id="user" class="tab">
  <div class="content">
    <h2>User Options</h2>
    <button
      on:click={() => {
        signOut();
        setUser(null);
        window.location.hash = '';
      }}>Sign out</button>
  </div>
</div>
