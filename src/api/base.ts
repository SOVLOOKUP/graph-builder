import ky from 'ky'

// todo 处理 jwt 续期

const defaultKy = ky.create({
  mode: 'cors',
  throwHttpErrors: false,
})

export default defaultKy

export const AuthedKy = async () => {
  const { store } = await import('../store')
  return defaultKy.extend({
    headers: {
      Authorization: `Bearer ${store.state.user?.jwt}`,
    },
  })
}
