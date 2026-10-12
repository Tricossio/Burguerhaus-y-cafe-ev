export function publicAssetUrl(filename) {
  return `${import.meta.env.BASE_URL}${encodeURIComponent(filename)}`
}
