import api from '.'

const createDataSource = async (name: string, type: string) =>
  await api().post(`gi-data-sources`, {
    json: { data: { name, type } },
  })
const deleteDataSource = async (id: number) =>
  await api().delete(`gi-data-sources/${id}`)
const listDataSources = async () =>
  await api().get('gi-data-sources?fields=name&populate=metadata')

export { createDataSource, deleteDataSource, listDataSources }
