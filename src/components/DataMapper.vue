<template>
  <div v-show="cells !== null && cells.length > 0">
    <div class="row">
      <div class="col-4">
        <div class="q-pb-lg" v-for="cell in cells">
          <q-card :class="cells?.indexOf(cell) === 0 ? 'shadow-10' : ''">
            <q-card-section horizontal class="row">
              <q-img height="130px" src="/favicon.svg">
                <div class="absolute-bottom text-body text-center">
                  {{ cell.concept.attributes.name }}
                </div>
              </q-img>
              <div class="q-ma-md col-6">
                <q-chip
                  :color="`${
                    cell.from !== undefined ? 'secondary' : 'primary'
                  } text-white`"
                  >{{ cell.from !== undefined ? '关系' : '实体' }}</q-chip
                >
                <q-chip>{{ cell.concept.attributes.tag.length }}个字段</q-chip>
                <q-select
                  clearable
                  v-model="dataCollection"
                  label="数据集"
                  v-show="cells?.indexOf(cell) === 0"
                  :options="dataCollectionOptions"
                  :option-label="(opt: DataCollection) => opt.attributes.name"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"
                        >无可用数据集</q-item-section
                      >
                    </q-item>
                  </template>
                  <template v-slot:option="{ itemProps, opt }">
                    <q-item v-bind="itemProps">
                      <q-item-section>
                        <q-item-label
                          v-html="(opt as DataCollection).attributes.name"
                        />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-space />
      <div class="col-7">
        <div v-if="dataCollection === null">请选择数据集</div>
        <div v-else>
          <q-select
            class="q-pb-md"
            v-for="tag in getMapTags(cells?.at(0))"
            clearable
            v-model="dataMap[(tag as string)]"
            :options="dataCollection.attributes.metadata"
            :label="tag"
            :option-label="(opt: MetaData) => opt.name"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">无可用数据集</q-item-section>
              </q-item>
            </template>
            <template v-slot:option="{ itemProps, opt }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label v-html="(opt as MetaData).name" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-card-actions align="right">
            <q-btn color="primary" @click="dataMapperOK">确认</q-btn>
          </q-card-actions>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  CellData,
  DataCollection,
  TaskMeta,
  MetaData,
  TagField,
  NodeTask,
  EdgeTask,
Concept,
} from 'src/types'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()

const dataCollection = ref<DataCollection | null>(null)
const dataMap = ref<{
  [to: string]: MetaData
}>({})

const doneCells: CellData[] = []
const taskMeta: TaskMeta = {
  // 所有的概念类
  categories: [],
  // 数据映射, 数据集 id 和其字段的映射
  nodeTasks: [],
  edgeTasks: [],
}

const props = defineProps<{
  cells: CellData[] | null
  dataCollectionOptions: DataCollection[]
}>()

const emits = defineEmits<{
  (e: 'done', taskMeta: TaskMeta): void
}>()

const getMapTags = (cells?: CellData) =>
  cells === undefined
    ? []
    : cells.concept.attributes.tag.map(
        (t) => t.gi_tag.data?.attributes.name as string,
      )

const dataMapperOK = () => {
  const cell = props.cells?.at(0) as CellData
  const fieldNumber = Object.keys(dataMap.value).length
  const category = cell.concept.attributes.name
  const id = dataCollection.value?.id ?? null
  const uuid = cell.id
  let task: NodeTask | EdgeTask

  // 验证
  if (fieldNumber < cell.concept.attributes.tag.length) {
    toast.info(
      `还有 ${cell.concept.attributes.tag.length - fieldNumber} 个字段未选择`,
    )
    return
  }

  // 解析 cell 以创建 task
  if (cell.from !== undefined && cell.to !== undefined) {
    if (
      doneCells.filter((v) => v.id === cell.from?.id || v.id === cell.to?.id)
        .length !== 2
    ) {
      toast.error(
        `边 ${cell.concept.attributes.name} 是无效边, 请检查本体模型的概念是否齐全`,
      )
    }

    // edge
    task = {
      uuid,
      id,
      category,
      from: {
        uuid: cell.from.id,
        field: cell.from.tag.attributes.name,
        category: doneCells.find(item => item.id === cell.from?.id)?.concept.attributes.name as string
      },
      to: {
        uuid: cell.to.id,
        field: cell.to.tag.attributes.name,
        category: doneCells.find(item => item.id === cell.from?.id)?.concept.attributes.name  as string
      },
      map: [],
    }
  } else {
    // node
    task = {
      uuid,
      id,
      category,
      map: [],
    }
  }

  // 添加概念类
  if (!taskMeta.categories.some((c) => c.name === category)) {
    taskMeta.categories.push({
      name: category,
      jsonldurl: cell.concept.attributes.jsonldurl,
      tags: cell.concept.attributes.tag
        .map((t) => t.gi_tag.data?.attributes)
        .filter((i) => i !== undefined) as TagField[],
    })
  }

  // 添加数据映射
  for (const toField of Object.keys(dataMap.value)) {
    task.map.push({
      fromField: dataMap.value[toField].name,
      toField,
      type: dataMap.value[toField].type,
    })
  }

  // push 结果
  if (cell.from !== undefined && cell.to !== undefined) {
    taskMeta.edgeTasks.push(task as EdgeTask)
  } else {
    taskMeta.nodeTasks.push(task)
  }

  // 结束本条处理
  const doneCell = props.cells?.splice(0, 1)
  // 放到垃圾堆
  doneCell && doneCells.push(doneCell[0])
  dataCollection.value = null
  dataMap.value = {}

  if (props.cells !== null) {
    // 如果全部完毕则调用 done
    if (props.cells.length === 0) {
      emits('done', taskMeta)
    }

    if (props.cells.at(0)?.concept.attributes.tag.length === 0) {
      dataMapperOK()
    }
  }
}
</script>
