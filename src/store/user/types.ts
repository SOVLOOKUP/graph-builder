interface UserAuth {
  identifier: string
  password: string
}

interface UserRegister {
  email: string
  username: string
  password: string
}

interface UserLoginResp {
  jwt: string
  user: {
    blocked: boolean
    confirmed: boolean
    createdAt: string
    email: string
    id: number
    provider: string
    updatedAt: string
    username: string
  }
}

interface UserStore extends UserLoginResp {
  // null is not login
  logintime?: number
}

export { UserAuth, UserStore, UserRegister, UserLoginResp }
