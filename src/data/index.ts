import BillingItem from '../model/billing_item'

export const data = {
  billingItems: [
    new BillingItem({
      time: new Date(),
      amount: 4000,
      category: 'eating',
      type: 0,
    }),
    new BillingItem({
      time: new Date(),
      amount: 300,
      category: 'shop',
      type: 0,
    }),
  ],
}
