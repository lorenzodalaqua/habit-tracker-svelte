<script>
  export let online;
  import { onMount } from 'svelte';
  const modulePromise = import('../../firebase/authentication');
  const ID = 'firebase-ui-authentication';
  let moduleLoaded = false;
  let error = false;
  onMount(() => {
    modulePromise
      .then(({ renderFirebaseUIAuth }) => {
        moduleLoaded = true;
        renderFirebaseUIAuth(ID);
      })
      .catch(e => {
        console.error(e);
        error = true;
      });
  });
</script>

<div id="login" class="tab">
  <h2>Authentication</h2>
  {#if online}
    {#if !moduleLoaded}
      <p>Loading...</p>
    {:else if error}
      <p>Error loading login page, please reload or try again later.</p>
    {/if}
  {:else}
    <p>You are offline, login is not available</p>
  {/if}
  <div id={ID} />
</div>
