import { Token } from 'interfaces'

// Mock
export const tokenParser = (token: string): Token => {
  let response: Token
  response = {
    login: true,
    token,
    username: 'Chinnatip',
    picture: '',
    userId: 112,
  }
  return response
}
