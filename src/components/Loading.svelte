<script lang="ts">
  import { isLoading } from '../store'
</script>

<div class="modal" style=" display: {$isLoading ? 'block' : 'none'}">
  <h2 class="loading">loading</h2>
</div>

<style>
  .modal {
    position: absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
  .loading {
    color: black;
  }
</style>
