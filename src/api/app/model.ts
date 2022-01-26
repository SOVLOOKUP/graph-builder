import api from '.'

const createModel = async (name: string) =>
  await api().post(`gi-models`, {
    json: { data: { name, data: {} } },
  })
const deleteModel = async (id: number) => await api().delete(`gi-models/${id}`)
const listModels = async () => await api().get('gi-models?fields=name')
const getModelJson = async (id: string) =>
  await api().get(`gi-models/${id}?fields=data`)
const updateModelJson = async (id: string, json: object) =>
  await api().put(`gi-models/${id}`, {
    json: {
      data: {
        data: json,
      },
    },
  })

export { createModel, deleteModel, listModels, getModelJson, updateModelJson }
