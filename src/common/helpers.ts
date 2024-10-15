const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/

export const anyCheckFields = <F extends string[]>(
  checkedFields: string[],
  validField: F
): string[] | null => {
  const anyFields = checkedFields.reduce<string[]>((acc, el) => {
    if (!validField.includes(el)) {
      acc.push(el)
    }
    return acc
  }, [])

  return anyFields.length ? anyFields : null
}

export const createDateToIsoString = (initialDate?: string, daysToAdd: number = 0) => {
  const date = initialDate ? new Date(initialDate) : new Date()

  date.setDate(date.getDate() + daysToAdd)

  return date.toISOString()
}

export const createIdNumber = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

export const isDateIsoString = (date: string) => {
  return isoDatePattern.test(date)
}
