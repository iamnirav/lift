export function formatDate(ms: number) {
  return new Date(ms).toISOString().slice(14, -5)
}