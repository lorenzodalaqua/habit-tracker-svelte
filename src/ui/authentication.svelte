<script>
  import { initializeUI } from '../core/firebase';
  import { onMount } from 'svelte';
  const ID = 'firebase-ui-authentication';
  onMount(() => initializeUI(ID));
</script>

<style>
  .container {
    border: 1px solid #f80;
  }
</style>

<div class="container">
  <h2>Authentication</h2>
  <div id={ID} />
</div>
