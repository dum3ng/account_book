<script lang="ts">
  export let size: number = 16
  export let direction: '-' | '|' = '-'
</script>

<div
  class="spacer"
  style={direction === '-' ? `width: ${size}px` : `height: ${size}px`}
/>

<style>
  .spacer {
    display: inline-block;
  }
</style>
