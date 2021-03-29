<script lang="ts">
  import type BillingItemModel from '../model/billing_item'
  import BillingItem from './BillingItem.svelte'

  export let items: BillingItemModel[]
  $: sorted = [...items].sort((a, b) => a.time.getTime() - b.time.getTime())
</script>

<div>
  {#each sorted as item}
    <BillingItem {item} />
  {/each}
</div>
