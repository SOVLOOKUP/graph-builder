import type { UserAuth, UserRegister } from 'src/types'
import ky from 'ky'

const CloudEntry = ky.create({
  mode: 'cors',
  // throwHttpErrors: false,
  prefixUrl: "http://localhost:1337/api",
})

const userLogin = async ({ identifier, password }: UserAuth) =>
  await CloudEntry.post('auth/local', {
    json: {
      identifier,
      password,
    },
  })

const userRegister = async ({ email, username, password }: UserRegister) =>
  await CloudEntry.post('auth/local/register', {
    json: {
      email,
      username,
      password,
    },
  })

const sendEmailConfirmation = async (email: string) =>
  await CloudEntry.post('auth/send-email-confirmation', {
    json: {
      email,
    },
  })

export { userLogin, userRegister, sendEmailConfirmation }
