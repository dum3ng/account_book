<script lang="ts">
  import { range, currentYear, currentMonth } from '../store'
  import * as _ from '../utils/helpers'

  const now = new Date()
  $: years = $range.start
    ? _.range($range.start.getFullYear(), now.getFullYear(), true)
    : []

  $: monthes = $range.start
    ? _.range(
        1,
        $currentYear === now.getFullYear() ? now.getMonth() + 1 : 12,
        true,
      )
    : []

  let handleYear: svelte.JSX.FormEventHandler<HTMLSelectElement> = (e) => {
    const year = parseInt((e.target as HTMLInputElement).value)
    $currentYear = year
    if (year === now.getFullYear()) {
      if ($currentMonth > now.getMonth() + 1) {
        $currentMonth = now.getMonth() + 1
      }
    }
  }
  let handleMonth = (e) =>
    ($currentMonth = parseInt((e.target as HTMLInputElement).value))
</script>

<div>
  <select name="year" id="" on:change={handleYear} value={$currentYear}>
    {#each years as year}
      <option value={year}>{year}</option>
    {/each}
  </select>
  <select name="month" id="" on:change={handleMonth} value={$currentMonth}>
    {#each monthes as month}
      <option value={month}>{month}</option>
    {/each}
  </select>
</div>

<style></style>
