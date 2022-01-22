import { AuthedKy } from '../base'
import config from '../../config'

const api = AuthedKy.extend({
  prefixUrl: `${config.serverBaseUrl}/api/`,
})

const listTags = async () => await api.get('gi-tags')
const listDataSources = async () => await api.get('gi-data-sources')
const listTasks = async () => await api.get('gi-tasks')
const listModels = async () => await api.get('gi-models')
const deleteModel = async (id: number) => await api.delete(`gi-models/${id}`)
const createModel = async (name: string) =>
  await api.post(`gi-models`, {
    json: { data: { name, data: {} } },
  })

export {
  listTags,
  listDataSources,
  listTasks,
  listModels,
  deleteModel,
  createModel,
}
