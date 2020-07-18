import { Token } from 'interfaces'
import { profileData } from 'static'

// Mock
export const tokenParser = (token: string): Token => {
  let response: Token
  response = {
    ...profileData,
    login: true,
    token,
  }
  return response
}
