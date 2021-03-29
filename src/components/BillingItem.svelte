<script lang="ts">
  import { categories } from '../store'
  import type BillingItem from '../model/billing_item'
  import { formatTime } from '../utils/helpers'

  export let item: BillingItem
  $: populated = Object.assign({}, item, {
    category: $categories.find((c) => c.id === item.category),
  })
  $: formated = formatTime(item.time)
</script>

<div class="billing-item flex">
  <div class="flex">
    <div class="time">
      {formated}
    </div>
  </div>
  <div>{populated.category.name}</div>
  <div>
    {item.amount.toLocaleString()}
  </div>
</div>

<style>
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .billing-item {
    padding: 24px;
    border-bottom: solid 1px #eee;
  }
</style>
