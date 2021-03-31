import BillingItem from '../model/billing_item'
import Category from '../model/category'

type Formatter = (x: string) => any
type Stringify = (x: any) => string
/**
 * parse a csv string to an array.
 * example:
 *    [{"id": 3, name: "a", "type": 0}]
 */
export function parseCSV(
  rawData: string,
  formatter?: { [k: string]: Formatter },
) {
  try {
    const rows = rawData.split(/\n|\r\n/)
    const headers = rows[0]
    const keys = headers.split(',').map((x) => x.trim())
    const data = rows.slice(1).map((row) =>
      row
        .trim()
        .split(/\s*,\s*/)
        .reduce((pre, c, i) => {
          const key = keys[i]
          let value = c
          if (formatter?.[key]) {
            value = formatter[key](c)
          }
          return { ...pre, [key]: value }
        }, {}),
    )
    return data
  } catch (e) {
    throw new Error(`parse csv data failed: ${e}`)
  }
}

/**
 * parse string to category and billingItem object.
 */
export function serialize([rawCategories, rawItems]: [string, string]) {
  const categories = parseCSV(rawCategories, { type: (x) => parseInt(x) }).map(
    (x) => new Category(x),
  )
  const items = parseCSV(rawItems, {
    type: (x) => parseInt(x),
    time: (x) => new Date(parseInt(x)),
    amount: (x) => parseFloat(x),
  }).map((x) => new BillingItem(x))

  return [categories, items] as [Category[], BillingItem[]]
}

export function csvify(objs: any[], formatter?: { [k: string]: Stringify }) {
  const keys = Object.keys(objs[0])
  const header = keys.join(',')
  const rows = objs
    .map((o) =>
      keys
        .map((k) =>
          formatter && formatter[k] ? formatter[k](o[k]) : o[k].toString(),
        )
        .join(','),
    )
    .join('\n')
  return header + '\n' + rows
}
/**
 * deserialize object into csv text.
 */
export function deserialize([categories, items]: [Category[], BillingItem[]]) {
  let rawCategories = ''
  let rawItems = ''
  if (categories.length) {
    rawCategories = csvify(categories)
  }
  if (items.length) {
    rawItems = csvify(items, {
      time: (x) => x.getTime(),
      amount: (x) => x.toFixed(2).toString(),
    })
  }

  return [rawCategories, rawItems]
}
