import { derived, readable, writable } from 'svelte/store'
import type BillingItem from '../model/billing_item'
import type Category from '../model/category'

export const isLoading = writable(true)
export const currentYear = writable(new Date().getFullYear())
export const currentMonth = writable(new Date().getMonth() + 1)
export const billingItems = writable<BillingItem[]>([])
export const categories = writable<Category[]>([])

export const currentBillingItems = derived(
  [currentYear, currentMonth, billingItems],
  ([$y, $m, $items]) => {
    return $items.filter(
      (b) => b.time.getFullYear() === $y && b.time.getMonth() === $m - 1,
    )
  },
)

export const range = derived(billingItems, ($items) => {
  if (!$items.length) return { start: undefined, end: undefined }
  const sorted = [...$items].sort((a, b) => a.time.getMilliseconds())
  return { start: sorted[0].time, end: sorted[sorted.length - 1].time }
})

// export function initCurrent(y: number,m: number) {
//   currentYear.update(_ => )
//   currentMonth.update(_ =>m)
// }
