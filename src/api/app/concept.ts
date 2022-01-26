import api from '.'

const createConcept = async (name: string, tags: number[]) =>
  await api().post(`gi-concepts`, {
    json: { data: { name, tag: tags.map((tag) => ({ tagid: tag })) } },
  })
const deleteConcept = async (id: number) =>
  await api().delete(`gi-concepts/${id}`)
const listConcepts = async () => await api().get('gi-concepts?fields=name')
const updateConcept = async (id: number, name: string, tags: number[]) =>
  await api().put(`gi-concepts/${id}`, {
    json: {
      data: {
        name,
        tag: tags.map((tag) => ({ tagid: tag })),
      },
    },
  })

export { createConcept, deleteConcept, listConcepts, updateConcept }
