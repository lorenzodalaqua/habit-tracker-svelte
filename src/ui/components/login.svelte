<script>
  import { initializeUI } from '../../core/firebase';
  import { onMount } from 'svelte';
  const ID = 'firebase-ui-authentication';
  onMount(() => initializeUI(ID));
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>

<div id="login" class="tab">
  <div class="container">
    <h2>Authentication</h2>
    <div id={ID} />
  </div>
</div>
