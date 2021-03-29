<script lang="ts">
  import {
    billingItems,
    categories,
    currentYear,
    currentBillingItems,
    isLoading,
  } from './store'
  import BillingItemModel from './model/billing_item'
  import BillingList from './components/BillingList.svelte'
  import PeriodSelector from './components/PeriodSelector.svelte'
  import Loading from './components/Loading.svelte'
  import * as api from './api'
  import { onMount } from 'svelte'
  import { parseCSV } from './utils/parser'
  import Statistics from './components/Statistics.svelte'
  import Modal from './components/Modal.svelte'
  import AddBilling from './components/AddBilling.svelte'
  import Category from './model/category'

  let addVisible = false

  onMount(async () => {
    $isLoading = true
    const [items, cats] = await Promise.all([
      api.getBillingItems(),
      api.getCategories(),
    ])

    $billingItems = parseCSV(items, {
      type: (x) => parseInt(x),
      time: (x) => new Date(parseInt(x)),
      amount: (x) => parseFloat(x),
    }).map((x) => new BillingItemModel(x))

    $categories = parseCSV(cats, { type: (x) => parseInt(x) }).map(
      (x) => new Category(x),
    )

    $isLoading = false
  })
</script>

<main>
  <Loading />
  <header>
    <h1>Account Book</h1>
  </header>
  <div class="book">
    <div class="infobar">
      <button on:click={() => (addVisible = !addVisible)}>add</button>
      <PeriodSelector />
    </div>
    <Statistics />
    <BillingList items={$currentBillingItems} />
  </div>
  <Modal visible={addVisible}>
    <AddBilling on:close={() => (addVisible = false)} />
  </Modal>
</main>

<style>
  main {
    text-align: center;
    max-width: 100%;
    margin: 0 auto;
  }
  header {
    background: url(/assets/bg.png) repeat;
    height: 180px;
    padding-top: 30px;
  }
  .book {
    width: 90%;
    margin: 0 auto;
  }
  .infobar {
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }

  h1 {
    color: white;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
    h1 {
      font-size: 4em;
    }
    /* .book {
			max-width: 90%;
		} */
  }
  @media (min-width: 960px) {
    .book {
      max-width: 640px;
    }
  }
</style>
