import api from '.'

const createTag = async (name: string, description: string) =>
  await api().post(`gi-tags`, {
    json: { data: { name, description } },
  })
const deleteTag = async (id: number) => await api().delete(`gi-tags/${id}`)
const listTags = async () => await api().get('gi-tags?fields=name,description')
const updateTag = async (id: number, name: string, description: string) =>
  await api().put(`gi-tags/${id}`, {
    json: {
      data: {
        name,
        description,
      },
    },
  })
const getTag = async (id: number) =>
  await api().get(`gi-tags/${id}?fields=name,description`)
// const getTagType = async () =>
//   await api().get(`content-type-builder/content-types/api::gi-tag.gi-tag`)

export { createTag, deleteTag, listTags, updateTag, getTag }
