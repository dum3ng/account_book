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
  ).map(([k, v]) => ({
    name: $categories.find((x) => x.id === k)!.name,
    y: v.reduce((pre, a) => pre + a.amount, 0),
  }))

  let outcomeData
  $: outcomeData = Object.entries(
    groupBy(
      $currentBillingItems.filter((i) => i.type === BillingType.Outcome),
      'category',
    ),
  ).map(([k, v]) => ({
    name: $categories.find((x) => x.id === k)!.name,
    y: v.reduce((pre, a) => pre + a.amount, 0),
  }))
</script>

<div class="container">
  <CategoryChart title="income" serie="income" data={incomeData} />
  <CategoryChart title="outcome" serie="outcome" data={outcomeData} />
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
