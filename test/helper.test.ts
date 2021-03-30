import { groupBy } from '../src/utils/helpers'

describe('test groupby', () => {
  test('key is string ', () => {
    const objs = [
      { type: 'cat', name: 'lucy' },
      { type: 'cat', name: ' lily' },
      { type: 'dog', name: 'rock' },
      { type: 'lion', name: 'Pain' },
    ]
    const grouped = groupBy(objs, 'type')
    expect(grouped.cat).toHaveLength(2)
    expect(grouped.dog[0]).toEqual({ type: 'dog', name: 'rock' })
  })
  test('groupby function', () => {
    const objs = [
      { type: 'cat', name: 'lucy' },
      { type: 'deer', name: ' lily' },
      { type: 'dog', name: 'rock' },
      { type: 'cheetah', name: 'Pain' },
    ]
    const grouped = groupBy(objs, (v) => v.type.charAt(0))
    console.log(grouped)
    expect(grouped.c).toHaveLength(2)
    expect(grouped.c[1].type).toBe('cheetah')
  })
})
