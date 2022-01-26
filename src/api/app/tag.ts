import api from '.'

const createTag = async (name: string, type: string) =>
  await api().post(`gi-tags`, {
    json: { data: { name, type } },
  })
const deleteTag = async (id: number) => await api().delete(`gi-tags/${id}`)
const listTags = async () => await api().get('gi-tags?fields=name,type')
const updateTag = async (id: number, name?: string, type?: string) =>
  await api().put(`gi-tags/${id}`, {
    json: {
      data: {
        name,
        type,
      },
    },
  })

export { createTag, deleteTag, listTags, updateTag }
