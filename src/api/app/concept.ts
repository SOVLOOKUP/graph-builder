import api from '.'

const createConcept = async (
  name: string,
  tags: number[],
  jsonldurl?: string
) =>
  await api().post(`gi-concepts`, {
    json: {
      data: { name, jsonldurl, tag: tags.map((tag) => ({ tagid: tag })) },
    },
  })
const deleteConcept = async (id: number) =>
  await api().delete(`gi-concepts/${id}`)
const listConcepts = async () =>
  await api().get('gi-concepts?fields=name&populate=tag')
const updateConcept = async (
  id: number,
  name: string,
  tags: number[],
  jsonldurl?: string
) =>
  await api().put(`gi-concepts/${id}`, {
    json: {
      data: {
        name,
        jsonldurl,
        tag: tags.map((tag) => ({ tagid: tag })),
      },
    },
  })

export { createConcept, deleteConcept, listConcepts, updateConcept }
