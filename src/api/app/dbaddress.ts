import api from '.'

const getDBAddress = async () => await api().get('db-address')
const updateDBAddress = async (domain: string) =>
  await api().put('db-address', {
    json: {
      data: {
        domain,
      },
    },
  })

export { getDBAddress, updateDBAddress }
