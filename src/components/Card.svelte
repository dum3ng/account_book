<script lang="ts">
</script>

<div class="card">
  <div class="card-content">
    <slot />
  </div>
  <div class="card-footer">
    <slot name="footer" />
  </div>
</div>

<style>
  .card {
    background: #fff;
    border-radius: 4px;
    border: solid 1px #eee;
    padding: 1em;
  }
  .card-content {
    padding: 1em;
  }
  .card-footer {
    padding: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
