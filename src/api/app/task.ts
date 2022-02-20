import { TaskMeta } from 'src/types'
import api from '.'

const listTasks = async () => await api().get('gi-tasks?fields=name,status')
const createTask = async (name: string, taskMeta: TaskMeta) =>
    await api().post(`gi-tasks`, {
        json: { data: { name, taskMeta } },
    })
const deleteTask = async (id: number) => await api().delete(`gi-tasks/${id}`)

export { listTasks, deleteTask, createTask }
