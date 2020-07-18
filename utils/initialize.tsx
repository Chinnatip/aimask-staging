// import Router from 'next/router'
import { getCookieFromServer } from './cookie'

export default function (ctx: any) {
  const cookie_get = ctx.req.headers.cookie
  if (ctx.req.headers.cookie) {
    const getToken = getCookieFromServer('token', cookie_get)
    return getToken
  }
}
