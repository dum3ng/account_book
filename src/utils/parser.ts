type Formatter = (x: string) => any
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
