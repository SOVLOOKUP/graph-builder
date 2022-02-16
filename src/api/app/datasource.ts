import api from '.'

const createDataSource = async (name: string, data: object[], metadata: object[]) =>
  await api().post(`gi-data-sources`, {
    json: { data: { name, data, metadata } },
  })

const updateDataSource = async (id: number, name: string, data: object[], metadata: object[]) =>
  await api().put(`gi-data-sources/${id}`, {
    json: { data: { name, data, metadata } },
  })

const deleteDataSource = async (id: number) =>
  await api().delete(`gi-data-sources/${id}`)

const listDataSources = async () =>
  await api().get('gi-data-sources?fields=name&populate=metadata')

export { createDataSource, deleteDataSource, listDataSources, updateDataSource }
