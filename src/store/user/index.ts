interface UserAuth {
  identifier: string
  password: string
}

interface UserRegister {
  email: string
  username: string
  password: string
  backendURL: string
}

interface UserState {
  jwt: string
  user: {
    email: string
    username: string
    confirmed: boolean
    backendURL: string
  }
}

export { UserAuth, UserState, UserRegister }
