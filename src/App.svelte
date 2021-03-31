<script lang="ts">
  import {
    billingItems,
    categories,
    currentBillingItems,
    isLoading,
  } from './store'
  import BillingList from './components/BillingList.svelte'
  import PeriodSelector from './components/PeriodSelector.svelte'
  import Loading from './components/Loading.svelte'
  import * as api from './api'
  import { onMount } from 'svelte'
  import { deserialize, serialize } from './utils/parser'
  import Statistics from './components/Statistics.svelte'
  import Modal from './components/Modal.svelte'
  import AddBilling from './components/AddBilling.svelte'
  import ChartSummary from './components/CategorySummary.svelte'

  let addVisible = false

  const saver = () => {}

  onMount(async () => {
    let serialized
    try {
      $isLoading = true
      const ps = new Promise((resolve) => {
        const cats = localStorage.getItem('categories')
        const items = localStorage.getItem('items')
        const serialized = serialize([cats, items])
        setTimeout(() => {
          resolve(serialized)
        }, 1000)
      })
      serialized = await ps
      console.log(serialized)
      console.info('data loaded from localstorage.')
    } catch {
      console.info('data not exists or broken. Refetch...')
      localStorage.removeItem('categories')
      localStorage.removeItem('items')

      const [items, cats] = await Promise.all([
        api.getBillingItems(),
        api.getCategories(),
      ])
      serialized = serialize([cats, items])
    }
    $categories = serialized[0]
    $billingItems = serialized[1]

    $isLoading = false
    window.onbeforeunload = () => {
      const [cats, items] = deserialize([$categories, $billingItems])
      localStorage.setItem('categories', cats)
      localStorage.setItem('items', items)
    }
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
    <ChartSummary />
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
