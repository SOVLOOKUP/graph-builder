import api from '.'

const createConcept = async (name: string, tags: number[]) =>
  await api().post(`gi-concepts`, {
    json: { data: { name, tag: tags.map((tag) => ({ tagid: tag })) } },
  })
const deleteConcept = async (id: number) =>
  await api().delete(`gi-concepts/${id}`)
const listConcepts = async () => await api().get('gi-concepts?fields=name')

export { createConcept, deleteConcept, listConcepts }
