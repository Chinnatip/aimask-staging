import cookie from 'js-cookie'
import { tokenParser } from './token'
import { Token } from 'interfaces'

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

export const getCookieFromServer = (key: string, cookie: string): Token => {
  const rawCookie = cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return null
  }
  const useToken = rawCookie.split('=')[1]
  const response: Token = tokenParser(useToken)
  return response
}
