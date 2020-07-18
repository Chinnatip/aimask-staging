import cookie from 'js-cookie'

export const setCookie = (key: string, value: string) => {
  cookie.set(key, value, {
    expires: 1,
    path: '/',
  })
}

export const removeCookie = (key: string) => {
  cookie.remove(key, {
    expires: 1,
  })
}

export const getCookieFromServer = (key: string, cookie: string) => {
  const rawCookie = cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return null
  }
  return rawCookie.split('=')[1]
}
