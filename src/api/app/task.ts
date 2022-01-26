import api from '.'

const listTasks = async () => await api().get('gi-tasks?fields=name,status')

export { listTasks }
