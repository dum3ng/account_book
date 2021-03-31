<script lang="ts">
  import { categories } from '../store'
  import type BillingItem from '../model/billing_item'
  import { formatTime } from '../utils/helpers'
  import { BillingType } from '../model/utils'

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
  <div class="amount">
    <span class="amount-type"
      >{item.type === BillingType.Income ? 'INCOME' : 'OUTCOME'}</span
    >
    <!-- <span
      class="mark"
      style="color: {item.type === BillingType.Income ? '#9ede73' : '#be0000'}"
      >{item.type === BillingType.Income ? '+' : '-'}</span
    > -->
    {item.amount.toLocaleString()}
    {#if item.amount < 0}
      <span class="error">!</span>
    {/if}
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
  .amount {
    position: relative;
  }
  .amount-type {
    position: absolute;
    color: #999;
    bottom: 1.2rem;
    right: 0;
    font-size: 0.6rem;
  }
  .error {
    color: red;
    position: absolute;
    left: 3rem;
  }
  .mark {
    /* transform: scale(2) translateY(-2px);
    display: inline-block; */
  }
</style>
