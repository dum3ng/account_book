<script lang="ts">
  import { currentBillingItems, categories } from '../store'
  import { BillingType } from '../model/utils'
  import { groupBy } from '../utils/helpers'
  import CategoryChart from './CategoryChart.svelte'

  let incomeData
  $: incomeData = Object.entries(
    groupBy(
      $currentBillingItems.filter((i) => i.type === BillingType.Income),
      'category',
    ),
  )
    .map(([k, v]) => ({
      name: $categories.find((x) => x.id === k)!.name,
      y: v.reduce((pre, a) => pre + a.amount, 0),
    }))
    .sort((a, b) => b.y - a.y)

  let outcomeData
  $: outcomeData = Object.entries(
    groupBy(
      $currentBillingItems.filter((i) => i.type === BillingType.Outcome),
      'category',
    ),
  )
    .map(([k, v]) => ({
      name: $categories.find((x) => x.id === k)!.name,
      y: v.reduce((pre, a) => pre + a.amount, 0),
    }))
    .sort((a, b) => b.y - a.y)
</script>

<div class="container">
  <div class="half">
    {#if incomeData.length}
      <CategoryChart title="income" serie="income" data={incomeData} />
    {/if}
  </div>
  <div class="half">
    {#if outcomeData.length}
      <CategoryChart title="outcome" serie="outcome" data={outcomeData} />
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
  .half {
    flex: 1;
  }
</style>
