import BillingItem from '../src/model/billing_item'
import Category from '../src/model/category'
import { csvify, deserialize, parseCSV } from '../src/utils/parser'

describe('test parse data', () => {
  test('', () => {
    const rawData = `id  ,  name,  amount
    3, a,2.3
    4,b,3.6 `
    const data: any[] = parseCSV(rawData, { id: (x) => parseInt(x) })
    expect(data).toHaveLength(2)
    expect(data[0]['id']).toBe(3)
  })
})

describe('test csvify', () => {
  test('csvify should transform categories to valid csv string', () => {
    const cats = [
      new Category({ id: '2342l', type: 0, name: '交通' }),
      new Category({ id: '2342m', type: 1, name: '工资' }),
    ]
    const str = csvify(cats)
    const rows = str.split('\n')
    expect(rows).toHaveLength(3)
    expect(rows[0]).toBe('id,name,type')
    expect(rows[1]).toBe('2342l,交通,0')
  })

  test('csvify should transform billingItems to valid csv string', () => {
    const now = new Date()
    const items = [
      new BillingItem({ amount: 3000, type: 0, time: now, category: 'abcd' }),
    ]
    const str = csvify(items, {
      time: (x) => x.getTime(),
      amount: (x) => x.toFixed(2).toString(),
    })
    const rows = str.split('\n')
    expect(rows).toHaveLength(2)
    expect(rows[1]).toBe(`0,${now.getTime()},3000.00,abcd`) // the order is the same with in the constructor
  })
})

// describe('test deserilize', () => {
//   test('deserialize should form correct csv format', () => {
//     const cats = [
//       new Category({ id: '2342l', type: 0, name: '交通' }),
//       new Category({ id: '2342m', type: 1, name: '工资' }),
//     ]
//     const [rawC, rawI] = deserialize([cats, []])
//     const rows = rawC.split('\n')
//     expect(rows[0]).toBe('id,name,type')
//     expect(rows[1]).toBe('2342l,0,交通')
//   })
// })
