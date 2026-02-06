export function matchString(str: string, search?: string) {
  if (!search) return true

  return str.toLowerCase().includes(search.toLowerCase())
}
