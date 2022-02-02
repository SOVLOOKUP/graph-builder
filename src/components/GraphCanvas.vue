<template>
  <div class="layout">
    <div ref="container" class="cavs" style="flex: 1" />
    <DragWindow
      title="编辑"
      :show="show"
      :initPositionX="initPosition.x + 60"
      :initPositionY="initPosition.y - 100"
      :ok="editCell"
    >
      <template #top><Icon icon="logos:graphene" /></template>

      <q-select
        v-model="fromTag"
        v-show="isEditEdge"
        label="from"
        hint="关系引出字段标签"
        use-input
        @input-value="fillterTag"
        :options="fromOptions"
        :option-label="(opt) => opt.attributes.name"
      >
        <!-- <template v-slot:option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.attributes.name" />
            </q-item-section>
          </q-item>
        </template> -->

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> 无可用标签 </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        v-model="toTag"
        v-show="isEditEdge"
        label="to"
        hint="关系到达字段标签"
        use-input
        @input-value="fillterTag"
        :options="toOptions"
        :option-label="(opt) => opt.attributes.name"
      >
        <!-- <template v-slot:option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.attributes.name" />
            </q-item-section>
          </q-item>
        </template> -->

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> 无可用标签 </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        v-model="concept"
        label="概念"
        hint="键入以筛选概念"
        use-input
        @input-value="fillter"
        :options="options"
        :option-label="(opt) => opt.attributes.name"
      >
        <template v-slot:option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.attributes.name" />
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> 无可用概念 </q-item-section>
          </q-item>
        </template>
      </q-select>
      <slot />
    </DragWindow>

    <div class="toolbar" align="center">
      <q-btn class="q-pa-md q-mx-xs" round @click="fd">
        <Icon icon="mdi-plus"
      /></q-btn>
      <q-btn class="q-pa-md q-mx-xs" round @click="sx">
        <Icon icon="mdi-minus"
      /></q-btn>
      <q-btn class="q-pa-md q-mx-xs" round @click="rf">
        <Icon icon="mdi-scan-helper"
      /></q-btn>
      <q-btn class="q-pa-md q-mx-xs" round @click="sv">
        <Icon icon="mdi-content-save"
      /></q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Edge, Graph } from '@antv/x6'
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { getModelJson, updateModelJson } from '../api'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import DragWindow from '@/components/DragCard.vue'
import { listConcepts } from '../api'
const toast = useToast()

interface TagID {
  id: number
  tagid: number
}
interface Concept {
  id: number
  attributes: {
    name: string
    jsonldurl: string
    tag: TagID[]
  }
}

const options = ref<Ref<Concept[]>>([] as any)
let cache: Concept[] = []
cache = (await (await listConcepts()).json()).data
options.value = cache
const router = useRouter()
const initPosition = ref({ x: 0, y: 0 })
const isEditEdge = ref(false)
const show = ref(false)
const r = 60
const container = ref(undefined)
let graph: Graph
const concept = ref<Concept>()
const fromTag = ref<TagID>()
const toTag = ref<TagID>()

const editCell = () => {
  // 取得当前选中的节点和其属性
  const cell = graph.getSelectedCells()[0]
  const newText = concept.value?.attributes?.name
  const newFromTag = fromTag.value?.tagid
  const newToTag = toTag.value?.tagid

  const isEditEdge = cell.shape === 'edge'

  // 校验
  if (newText === '' || newText === undefined) {
    toast.info('请选择概念')
    return
  }

  // 设置概念
  cell.setData({
    concept: concept.value,
  })

  if (isEditEdge) {
    // 校验
    if (newFromTag === undefined) {
      toast.info('请选择引出标签')
      return
    }

    if (newToTag === undefined) {
      toast.info('请选择到达标签')
      return
    }

    // 设置边属性
    ;(cell as Edge).setData({
      from: fromTag.value?.tagid,
      to: toTag.value?.tagid,
    })
    // 设置边名称
    ;(cell as Edge).setLabels([newText])
  } else {
    // 设置节点名称
    cell.setAttrs({
      text: {
        text: newText,
      },
    })
  }

  show.value = false
  graph.unselect(cell)
}

onMounted(async () => {
  graph = new Graph({
    container: container.value,
    autoResize: true,
    panning: true,
    selecting: {
      multiple: false,
      enabled: true,
      rubberband: false, // 启用框选
    },
    // 网格
    grid: true,
    // 异步渲染
    async: true,
    translating: {
      // 不能超出画布
      restrict: false,
    },
    connecting: {
      snap: {
        radius: 30,
      },
      allowBlank: false,
    },
  })

  const res = await getModelJson(router.currentRoute.value.params.id as string)
  const dataInit = (await res.json()).data
  graph.fromJSON(dataInit.attributes.data)
  toast.success(`${dataInit.id} 号本体数据已同步`)

  // 双击添加节点
  graph.on('blank:dblclick', (e) => addNode(e.x, e.y))

  // 鼠标进入显示叉叉
  graph.on('cell:mouseenter', ({ cell }) => {
    cell.addTools([
      {
        name: 'button-remove',
        args: {
          x: r,
          y: 0,
          offset: { x: -8, y: 8 },
        },
      },
    ])
  })

  // 鼠标离开移除叉叉
  graph.on('cell:mouseleave', ({ cell }) => {
    cell.removeTool('button-remove')
  })

  graph.on('cell:click', (a) => {
    graph.select(a.cell)

    // 设置编辑窗口初始位置
    initPosition.value = { x: a.e.clientX, y: a.e.clientY }
    // 是否在编辑边
    isEditEdge.value = a.cell.shape === 'edge'
    // 载入节点概念
    concept.value = a.cell.getData()?.concept
    // 载入边引出/目标标签
    if (isEditEdge.value) {
      fromTag.value = a.cell.getData()?.from
      toTag.value = a.cell.getData()?.to

      // todo 载入边引出/目标标签选项
    }

    // 显示编辑窗口
    show.value = true
  })

  graph.on('cell:selected', ({ cell }) => {
    cell.addTools([
      {
        name: 'boundary',
        args: {
          padding: 5,
          attrs: {
            stroke: '#333',
            'stroke-width': 1,
            'fill-opacity': 0.2,
          },
        },
      },
    ])
  })

  graph.on('cell:unselected', ({ cell }) => {
    cell.removeTool('boundary')
    show.value = false
  })
})

const addNode = (x: number, y: number) => {
  const halfr = r / 2
  console.log(
    graph.addNode({
      label: 'Node',
      x: x - halfr,
      y: y - halfr,
      width: r,
      height: r,
      shape: 'circle',
      attrs: {
        body: {
          magnet: true,
          fill: '#efdbff',
          stroke: '#9254de',
        },
        label: {
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
      },
    })
  )
}

// 筛选
const fillter = (v: string) =>
  (options.value = cache.filter((concept: Concept) =>
    concept.attributes.name.includes(v)
  ))

const fillterTag = (v: string) => {}

const fd = () => {
  graph.zoomTo(graph.zoom() + 1)
}
const sx = () => {
  graph.zoomTo(graph.zoom() - 1)
}
const rf = () => {
  graph.zoomToFit()
}
const sv = async () => {
  const res = await updateModelJson(
    router.currentRoute.value.params.id as string,
    graph.toJSON()
  )
  if (res.status === 200) toast.success('保存成功')
}

// 禁止移动端拖拽刷新
onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  .cavs {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(175, 175, 175, 0.767);
  }

  .toolbar {
    position: fixed;
    bottom: 6px;
    left: 10px;
    right: 10px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid rgba(175, 175, 175, 0.767);
    background-color: rgb(243, 243, 243);
  }
}
</style>
