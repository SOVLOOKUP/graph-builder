import api from '.'
import qs from 'qs'

const query = qs.stringify({
  fields: ['name', 'jsonldurl'],
  populate: {
    tag: {
      populate: {
        gi_tag: {
          fields: ['name', 'description'],
        }
      },
    }
  }
}, {
  encodeValuesOnly: true,
});


const createConcept = async (
  name: string,
  tags: number[],
  jsonldurl?: string
) =>
  await api().post(`gi-concepts`, {
    json: {
      data: { name, jsonldurl, tag: tags.map((tag) => ({ gi_tag: tag })) },
    },
  })

const deleteConcept = async (id: number) =>
  await api().delete(`gi-concepts/${id}`)

const listConcepts = async () => await api().get(`gi-concepts?${query}`)

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
        tag: tags.map((tag) => ({ gi_tag: tag })),
      },
    },
  })

export { createConcept, deleteConcept, listConcepts, updateConcept }
