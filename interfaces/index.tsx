export type User = {
  id: number
  name: string
}

export type Token = {
  login: boolean
  token: string
  username: string
  picture: string
  userId: number
} | null
