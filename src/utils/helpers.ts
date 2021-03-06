export function groupBy<T extends { [k: string]: any }>(
  objs: T[],
  key: string | ((v: any) => any),
) {
  const group: { [k: string]: T[] } = {}
  objs.forEach((obj) => {
    const k = typeof key === 'string' ? obj[key] : key(obj)
    if (k in group) {
      group[k].push(obj)
    } else {
      group[k] = [obj]
    }
  })
  return group
}

export function range(start: number, end: number, include = false) {
  return Array(end - start + (include ? 1 : 0))
    .fill(0)
    .map((_, i) => i + start)
}

export function formatTime(t: Date) {
  const p = (x: number) => x.toString().padStart(2, '0')
  return `${p(t.getMonth() + 1)}/${p(t.getDate())} ${p(t.getHours())}:${p(
    t.getSeconds(),
  )}`
}

export function isDate(a) {
  const d = new Date(a)
  return !isNaN(d.getDate())
}

/**
 * format a Date to shape of `yyyy-MM-ddTHH:mm` to use in input html element.
 * @param d a Date
 */
export function formatDateTime(d: Date) {
  const p = (x: number, n: number = 2) => x.toString().padStart(n, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(
    d.getHours(),
  )}:${p(d.getMinutes())}`
}
