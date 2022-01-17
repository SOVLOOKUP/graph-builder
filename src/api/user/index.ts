import base from '../base'
import { UserAuth, UserRegister } from '../../store/user'
import config from '../../config'

const user = base.extend({
  prefixUrl: `${config.serverBaseUrl}/api/auth/`,
})

const userLogin = async ({ identifier, password }: UserAuth) =>
  await user.post('local', {
    json: {
      identifier,
      password,
    },
  })

const userRegister = async ({ email, username, password }: UserRegister) =>
  await user.post('local/register', {
    json: {
      email,
      username,
      password,
    },
  })

const sendEmailConfirmation = async (email: string) =>
  await user.post('send-email-confirmation', {
    json: {
      email,
    },
  })
export { userLogin, userRegister, sendEmailConfirmation }
