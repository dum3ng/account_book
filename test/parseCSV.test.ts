import Category from '../src/model/category'
import { csvify, parseCSV } from '../src/utils/parser'

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
    expect(str.split('\n')).toHaveLength(3)
    expect(str.split('\n')[0]).toBe('id,name,type')
  })
})
