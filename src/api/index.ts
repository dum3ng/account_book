export async function getCategories() {
  const resp = await fetch(
    'https://cdn.jsdelivr.net/gh/xmindltd/hiring@master/frontend-1/categories.csv',
  )
  return await resp.text()
}

export async function getBillingItems() {
  const resp = await fetch(
    'https://cdn.jsdelivr.net/gh/xmindltd/hiring@master/frontend-1/bill.csv',
  )
  return await resp.text()
}
