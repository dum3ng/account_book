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
