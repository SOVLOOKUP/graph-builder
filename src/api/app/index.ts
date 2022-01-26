import { AuthedKy } from '../base'

const api = async () => {
  const { store } = await import('../../store')
  return (await AuthedKy()).extend({
    prefixUrl: `${store.state.serverBaseUrl}/api/`,
  })
}

const listTags = async () => await (await api()).get('gi-tags?fields=name,type')
const listDataSources = async () =>
  await (await api()).get('gi-data-sources?fields=name,type')
const listConcepts = async () =>
  await (await api()).get('gi-concepts?fields=name')
const listTasks = async () =>
  await (await api()).get('gi-tasks?fields=name,status')
const listModels = async () => await (await api()).get('gi-models?fields=name')
const getDBAdress = async () => await (await api()).get('db-address')

const getModelJson = async (id: string) =>
  await (await api()).get(`gi-models/${id}?fields=data`)

const createConcept = async (name: string, tags: number[]) =>
  await (
    await api()
  ).post(`gi-concepts`, {
    json: { data: { name, tag: tags.map((tag) => ({ tagid: tag })) } },
  })
const createModel = async (name: string) =>
  await (
    await api()
  ).post(`gi-models`, {
    json: { data: { name, data: {} } },
  })

const createTag = async (name: string, type: string) =>
  await (
    await api()
  ).post(`gi-tags`, {
    json: { data: { name, type } },
  })

const createDataSource = async (name: string, type: string) =>
  await (
    await api()
  ).post(`gi-data-sources`, {
    json: { data: { name, type } },
  })

const removeConcepts = async (id: number) =>
  await (await api()).delete(`gi-concepts/${id}`)
const deleteModel = async (id: number) =>
  await (await api()).delete(`gi-models/${id}`)
const deleteTag = async (id: number) =>
  await (await api()).delete(`gi-tags/${id}`)
const deleteDataSource = async (id: number) =>
  await (await api()).delete(`gi-data-sources/${id}`)

const updateModelJson = async (id: string, json: object) =>
  await (
    await api()
  ).put(`gi-models/${id}`, {
    json: {
      data: {
        data: json,
      },
    },
  })

const updateDBAdress = async (domain: string) =>
  await (
    await api()
  ).put('db-address', {
    json: {
      data: {
        domain,
      },
    },
  })

const updateTag = async (id: number, name?: string, type?: string) =>
  await (
    await api()
  ).put(`gi-tags/${id}`, {
    json: {
      data: {
        name,
        type,
      },
    },
  })

export {
  listTags,
  listDataSources,
  listTasks,
  listModels,
  deleteModel,
  createModel,
  updateModelJson,
  getModelJson,
  listConcepts,
  removeConcepts,
  createConcept,
  deleteTag,
  createTag,
  deleteDataSource,
  createDataSource,
  getDBAdress,
  updateDBAdress,
  updateTag,
}
