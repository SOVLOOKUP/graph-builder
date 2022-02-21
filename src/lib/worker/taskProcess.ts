import { TaskMeta } from "src/types"
import { strapi } from '.'

async function getTaskMeta(id: number) {
    return (await strapi.findOne<{ attributes: { taskMeta: TaskMeta } }>("gi-tasks", id, {
        fields: ['taskMeta']
    })).data.attributes.taskMeta
}

const startTask = async (id: number) => {
    return await getTaskMeta(id)
}

export default {
    startTask
}