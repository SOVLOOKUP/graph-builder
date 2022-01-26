import API from '../base'
import { UserAuth, UserRegister } from '../../store/user'

const userLogin = async ({ identifier, password }: UserAuth) =>
  await API().post('auth/local', {
    json: {
      identifier,
      password,
    },
  })

const userRegister = async ({ email, username, password }: UserRegister) =>
  await API().post('auth/local/register', {
    json: {
      email,
      username,
      password,
    },
  })

const sendEmailConfirmation = async (email: string) =>
  await API().post('auth/send-email-confirmation', {
    json: {
      email,
    },
  })

export { userLogin, userRegister, sendEmailConfirmation }
