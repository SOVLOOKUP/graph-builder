import type { AdapterNames } from 'src/lib/adapter'
import api from '.'
const createGraphConfig = async (
  name: string,
  type: AdapterNames,
  config: object,
) =>
  await api().post(`gi-graph-db-configs`, {
    json: { data: { name, type, config } },
  })

const updateGraphConfig = async (
  id: number,
  name: string,
  type: AdapterNames,
  config: object,
) =>
  await api().put(`gi-models/${id}`, {
    json: {
      data: { name, type, config },
    },
  })

const deleteGraphConfig = async (id: number) =>
  await api().delete(`gi-graph-db-configs/${id}`)

const listGraphConfigs = async () =>
  await api().get('gi-graph-db-configs?fields=name,type,config')

export {
  createGraphConfig,
  deleteGraphConfig,
  listGraphConfigs,
  updateGraphConfig,
}
