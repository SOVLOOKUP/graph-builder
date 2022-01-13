import base from '..'
import { UserAuth, UserState } from '../../store/user'
import config from '../../config'

const user = base.extend({
  prefixUrl: `${config.serverBaseUrl}/api/auth/`,
})

const userLogin = async ({
  identifier,
  password,
}: UserAuth): Promise<UserState> =>
  await user
    .post('local', {
      json: {
        identifier: identifier,
        password: password,
      },
    })
    .json()

export { userLogin }
