<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import BillingItem from '../model/billing_item'
  import { BillingType } from '../model/utils'
  import { addBillingItem, categories } from '../store'
  import { formatDateTime, isDate } from '../utils/helpers'
  import Card from './Card.svelte'
  import Spacer from './Spacer.svelte'

  let dispatch = createEventDispatcher()

  let onCancel = (e) => {
    dispatch('cancel')
    dispatch('close')
  }

  function validate() {}

  let onOk = (e) => {
    if (amount < 0) {
      return alert('Can not input an amount less than 0 ')
    }
    if (isDate(time)) {
      const d = new Date(time)
      if (d.getTime() > Date.now()) return alert('Are you from THE Future?')
    }
    // add the billing item
    const item = new BillingItem({ time, type, amount, category })
    addBillingItem(item)

    dispatch('ok')
    dispatch('close')
  }

  let max = formatDateTime(new Date())

  let type = BillingType.Income
  let category = null
  let time = null
  let amount: number = 0
  $: category = $categories.length ? $categories[0] : null
  $: canSubmit = amount > 0 && isDate(time)

  let handleCategory = (e) => (category = e.target.value)
</script>

<div>
  <Card>
    <div class="formfield">
      <span>category </span>
      <select
        name="category"
        id=""
        on:change={handleCategory}
        value={category?.id}
      >
        {#each $categories as c (c.id)}
          <option value={c.id}>{c.name}</option> />
        {/each}
      </select>
    </div>
    <!-- time -->
    <div class="formfield">
      <span for="">time</span>
      <input
        type="datetime-local"
        bind:value={time}
        min="1900-01-01T00:00"
        {max}
      />
    </div>
    <!-- type: income/outcome -->
    <div class="formfield">
      <span>type</span>
      <input
        type="radio"
        name="type"
        value={BillingType.Income}
        id="type-income"
        on:click={() => (type = BillingType.Income)}
        checked={type === BillingType.Income}
      />
      <label for="type-income">INCOME</label>
      <Spacer />
      <input
        type="radio"
        name="type"
        value={BillingType.Outcome}
        id="type-outcome"
        on:click={() => (type = BillingType.Outcome)}
        checked={type === BillingType.Outcome}
      />
      <label for="type-outcome">OUTCOME</label>
    </div>
    <!-- amount -->
    <div class="formfield">
      <span>amount</span>
      <input type="number" bind:value={amount} min="0" step="0.01" />
    </div>
    <div slot="footer">
      <button on:click={onCancel}>cancel</button>
      <Spacer />
      <button disabled={!canSubmit} on:click={onOk}>OK</button>
    </div>
  </Card>
</div>

<style>
  .formfield {
    padding: 4px 28px;
    display: flex;
    align-items: center;
  }
  .formfield > span {
    display: inline-block;
    width: 80px;
  }
  input[type='radio'] {
    margin-bottom: 0;
  }
  label {
    padding: 0 4px;
  }
</style>
