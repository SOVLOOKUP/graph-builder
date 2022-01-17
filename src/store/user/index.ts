interface UserAuth {
  identifier: string
  password: string
}

interface UserRegister {
  email: string
  username: string
  password: string
}

interface UserState {
  jwt: string
  user: { email: string; username: string; confirmed: boolean }
}

export { UserAuth, UserState, UserRegister }
