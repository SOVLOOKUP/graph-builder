import type { UserAuth, UserRegister } from 'src/types'
import API from '../base'

const CloudEntry = API()

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
