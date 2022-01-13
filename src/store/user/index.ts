interface UserAuth {
  identifier: string
  password: string
}

interface UserState {
  jwt: string
  info: { email: string; username: string; confirmed: boolean }
}

export { UserAuth, UserState }
