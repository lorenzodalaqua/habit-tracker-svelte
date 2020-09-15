<script>
  export let online;
  import { initializeUI } from '../../core/firebase';
  import { onMount } from 'svelte';
  const ID = 'firebase-ui-authentication';
  onMount(() => initializeUI(ID));
</script>

<div id="login" class="tab">
  <h2>Authentication</h2>
  {#if online}
    <div id={ID} />
  {:else}
    <p>You are offline, login is not available</p>
  {/if}
</div>
