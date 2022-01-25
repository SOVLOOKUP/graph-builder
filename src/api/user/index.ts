import base from '../base'
import { UserAuth, UserRegister } from '../../store/user'

const user = async () => {
  const { store } = await import('../../store')
  return base.extend({
    prefixUrl: `${store.state.serverBaseUrl}/api/auth/`,
  })
}

const userLogin = async ({ identifier, password }: UserAuth) =>
  await (
    await user()
  ).post('local', {
    json: {
      identifier,
      password,
    },
  })

const userRegister = async ({ email, username, password }: UserRegister) =>
  await (
    await user()
  ).post('local/register', {
    json: {
      email,
      username,
      password,
    },
  })

const sendEmailConfirmation = async (email: string) =>
  await (
    await user()
  ).post('send-email-confirmation', {
    json: {
      email,
    },
  })

export { userLogin, userRegister, sendEmailConfirmation }
