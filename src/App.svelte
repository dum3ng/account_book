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
  import BillingItem from './components/BillingItem.svelte'
  import Category from './model/category'

  export let name: string

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
  <p>{$currentYear}</p>
  <PeriodSelector />
  <BillingList items={$currentBillingItems} />
</main>

<style>
  main {
    text-align: center;
    max-width: 100%;
    margin: 0 auto;
  }
  header {
    background: url(/assets/bg.png) repeat;
    height: 160px;
    padding-top: 80px;
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
  }
</style>
