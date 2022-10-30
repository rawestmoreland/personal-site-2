export const getAdminUrl = (path) =>
  `${
    process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090/api'
  }${path}`

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

export async function fetchAPI({ path }) {
  const defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(getAdminUrl(path), defaultOptions)

  if (!response.ok) {
    const { code, message } = await response.json()
    return { status: 'error', code, message }
  }
  return await response.json()
}

export async function fetchStrapi(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }

  // Build request URL
  const queryString = new URLSearchParams(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
