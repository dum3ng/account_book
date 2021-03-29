<script lang="ts">
  export let visible = false
</script>

<div class="modal-container" style="display: {visible ? 'block' : 'none'}">
  <div class="modal-content">
    <slot />
  </div>
</div>

<style>
  .modal-container {
    position: absolute;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #33333355;
    padding-top: 120px;
  }
  .modal-content {
    margin: 0 auto;
    width: 80%;
  }
  @media (min-width: 640px) {
    .modal-content {
      max-width: 640px;
    }
  }
</style>
