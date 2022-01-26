import api from '.'

const createTag = async (name: string, type: string) =>
  await api().post(`gi-tags`, {
    json: { data: { name, type } },
  })
const deleteTag = async (id: number) => await api().delete(`gi-tags/${id}`)
const listTags = async () => await api().get('gi-tags?fields=name,type')
const updateTag = async (id: number, name: string, type: string) =>
  await api().put(`gi-tags/${id}`, {
    json: {
      data: {
        name,
        type,
      },
    },
  })
const getTag = async (id: number) =>
  await api().get(`gi-tags/${id}?fields=name,type`)
const getTagType = async () =>
  await api().get(`content-type-builder/content-types/api::gi-tag.gi-tag`)

export { createTag, deleteTag, listTags, updateTag, getTag, getTagType }
