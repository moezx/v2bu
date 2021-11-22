export const loginPath = '/login'
export const registerPath = '/register'
export const notFoundPath = '/404'
export const forgetPath = '/forget'
const noFetcnUserPaths: string[] = [loginPath, registerPath, notFoundPath, forgetPath]
const noLayoutPaths: RegExp[] = [
  /^\/forget$/,
  /^\/register$/,
  /^\/login$/,
  /^\/ticket\/.+/,
  /^\/404$/,
]

export const isNoLaooutPath = (path: string): boolean => {
  let result = false
  for (let i = 0; i < noLayoutPaths.length; i += 1) {
    const regexPath: RegExp = noLayoutPaths[i]
    if (path.match(regexPath)) {
      result = true
      break
    }
  }
  return result
}

export const isNoFetchUserPath = (path: string): boolean => {
  return noFetcnUserPaths.includes(path)
}

export const title = window.settings?.title ?? 'v2board'
export const description = window.settings?.description ?? 'v2board is best'
export const version = window.settings?.version
  ? window.settings?.version?.split('.').slice(0, 3).join('.')
  : process.env.VERSION
export const backgroundUrl = window.settings?.background_url ?? undefined
export const sidebarTheme = window.settings?.theme?.sidebar ?? 'light'
export const headerTheme = window.settings?.theme?.header ?? 'dark'
export const colorTheme = window.settings?.theme?.color ?? 'default'
export const apiHost = window.settings?.host ?? ''
export const apiContentType = 'application/json'
export const isStandAlone = process.env.STANDALONE !== undefined
export const isProduction = process.env.NODE_ENV === 'production'

export const currencyFormatter = new Intl.NumberFormat(process.env.CURRENCY_LOCALE, {
  style: 'currency',
  currency: process.env.CURRENCY_UNIT,
  maximumFractionDigits: Number(process.env.CURRENCY_MAX_DIGITS).valueOf()
})
