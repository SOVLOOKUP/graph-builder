import ky from 'ky'

// todo 处理 jwt 续期
const base = ky.create({
  mode: 'cors',
  throwHttpErrors: false,
})

export default base

export const AuthedKy = async () => {
  const { store } = await import('../store')
  return base.extend({
    headers: {
      Authorization: `Bearer ${store.state.user?.jwt}`,
    },
  })
}
