<script lang="ts">
  import { prevent_default } from 'svelte/internal'
  import BillingItem from '../model/billing_item'
  import { BillingType } from '../model/utils'

  import { currentBillingItems } from '../store'

  $: [income, outcome] = $currentBillingItems.reduce(
    (pre, item) =>
      item.type === BillingType.Income
        ? [pre[0] + item.amount, pre[1]]
        : [pre[0], pre[1] + item.amount],
    [0, 0],
  )
</script>

<div class="statistics">
  <div>
    <h3>income</h3>
    <div>{income ? income.toLocaleString() : '---'}</div>
  </div>
  <div>
    <h3>outcome</h3>
    <div>{outcome ? outcome.toLocaleString() : '---'}</div>
  </div>
</div>

<style>
  .statistics {
    display: flex;
    padding: 24px;
    justify-content: space-around;
  }
</style>
