<script>
  import { initializeUI } from '../../core/firebase';
  import { onMount } from 'svelte';
  const ID = 'firebase-ui-authentication';
  onMount(() => initializeUI(ID));
</script>

<style>
</style>

<div id="login" class="tab">
  <h2>Authentication</h2>
  <div id={ID} />
</div>
