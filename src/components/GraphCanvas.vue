<template>
  <div class="layout">
    <div ref="container" class="cavs" style="flex: 1" @mousewheel="rollScroll" />
    <DragWindow
      :title="`编辑${isEditEdge ? '关系' : '实体'}集合`"
      :show="show"
      :initPositionX="initPosition.x + 60"
      :initPositionY="initPosition.y - 100"
      :ok="editCell"
    >
      <template #top>
        <Icon icon="logos:graphene" />
      </template>

      <div v-show="isEditEdge" class="text-body2 q-my-md" style="text-align: center">
        <span>关系从&nbsp;</span>
        <span class="concept">{{ edgeEditTip.from }}</span>
        <span>&nbsp;的&nbsp;</span>
        <span class="tag">{{ fromTag?.attributes.name ?? '?' }}</span>
        <span>&nbsp;指向&nbsp;</span>
        <span class="concept">{{ edgeEditTip.to }}</span>
        <span>&nbsp;的&nbsp;</span>
        <span class="tag">{{ toTag?.attributes.name ?? '?' }}&nbsp;</span>
      </div>

      <q-select
        v-model="fromTag"
        v-show="isEditEdge"
        label="from"
        use-input
        @input-value="filterFromTag"
        :options="fromOptions"
        :option-label="(opt: Tag) => opt.attributes.name"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">无可用标签</q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        v-model="toTag"
        v-show="isEditEdge"
        label="to"
        use-input
        @input-value="filterToTag"
        :options="toOptions"
        :option-label="(opt: Tag) => opt.attributes.name"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">无可用标签</q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        v-model="concept"
        label="对应概念"
        hint="键入以筛选"
        use-input
        @input-value="filter"
        :options="options"
        :option-label="(opt: Concept) => opt.attributes.name"
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
            <q-item-section class="text-grey">无可用概念</q-item-section>
          </q-item>
        </template>
      </q-select>
      <slot />
    </DragWindow>

    <div class="toolbar">
      <!-- <div align="left">
        <q-btn class="q-pa-md q-mx-xs" round @click="build">
          <q-tooltip>开始构建🚀</q-tooltip>
          <Icon icon="codicon:debug-start" />
        </q-btn>
      </div>-->
      <q-space />
      <div align="center">
        <q-btn class="q-pa-md q-mx-xs" round @click="fd">
          <q-tooltip>放大(鼠标滚轮+)</q-tooltip>
          <Icon icon="mdi-plus" />
        </q-btn>
        <q-btn class="q-pa-md q-mx-xs" round @click="sx">
          <q-tooltip>缩小(鼠标滚轮-)</q-tooltip>
          <Icon icon="mdi-minus" />
        </q-btn>
        <q-btn class="q-pa-md q-mx-xs" round @click="rf">
          <q-tooltip>缩放至全屏</q-tooltip>
          <Icon icon="mdi-scan-helper" />
        </q-btn>
        <q-btn class="q-pa-md q-mx-xs" round @click="sv">
          <q-tooltip>保存</q-tooltip>
          <Icon icon="mdi-content-save" />
        </q-btn>
      </div>
      <q-space />
      <!-- <div align="right">
      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Edge, Graph } from '@antv/x6'
import { onMounted, onUnmounted, ref } from 'vue'
import { getModelJson, updateModelJson, listConcepts } from '../api'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import DragWindow from '@/components/DragCard.vue'
import type { Concept, EdgeData, NodeData, Tag, GiTag } from 'src/types'
const toast = useToast()

const options = ref<Concept[]>([] as any)
const fromOptions = ref<Tag[]>([] as any)
const toOptions = ref<Tag[]>([] as any)
let concepts: Concept[] = []

concepts = (await (await listConcepts()).json()).data as Concept[]
options.value = concepts

const router = useRouter()
const initPosition = ref({ x: 0, y: 0 })
const isEditEdge = ref(false)
const show = ref(false)
const r = 60
const container = ref(undefined)
let graph: Graph
const concept = ref<Concept>()
const fromTag = ref<Tag>()
const toTag = ref<Tag>()
let fromTagCache: Tag[] = []
let toTagCache: Tag[] = []
const edgeEditTip = ref({
  from: '概念A',
  to: '概念B',
})

const editCell = () => {
  // 取得当前选中的节点和其属性
  const cell = graph.getSelectedCells()[0]
  const newText = concept.value?.attributes?.name
  const newFromTag = fromTag.value
  const newToTag = toTag.value

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
    ; (cell as Edge).setData({
      from: fromTag.value,
      to: toTag.value,
    })
      // 设置边名称
      ; (cell as Edge).setLabels([newText])
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
    const cellData: EdgeData | undefined = a.cell.getData()
    concept.value = cellData?.concept

    // 载入边引出/目标标签
    if (isEditEdge.value) {
      fromTag.value = cellData?.from
      toTag.value = cellData?.to

      // 载入边的引出标签选项
      const sourceNodeData: NodeData | undefined = graph.getCellById(
        ((a.cell as Edge).source as { cell: string }).cell
      ).getData()
      fromTagCache = sourceNodeData?.concept.attributes.tag.map((t: GiTag) => t.gi_tag.data).filter(i => i !== null) as Tag[] ?? []
      fromOptions.value = fromTagCache
      edgeEditTip.value.from =
        sourceNodeData?.concept.attributes.name ?? '?'

      // 载入边的目标标签选项
      const targetNodeData: NodeData | undefined  = graph.getCellById(
        ((a.cell as Edge).target as { cell: string }).cell
      ).getData()

      toTagCache = targetNodeData?.concept.attributes.tag.map((t: GiTag) => t.gi_tag.data).filter(i => i !== null) as Tag[] ?? []
      toOptions.value = toTagCache
      edgeEditTip.value.to =
        targetNodeData?.concept.attributes.name ?? '?'
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

}

const rollScroll = (e: WheelEvent) => {
  if (e.deltaY < 0) {
    fd()
  } else {
    sx()
  }

}

// 筛选
const filter = (v: string) =>
(options.value = concepts.filter((concept: Concept) =>
  concept.attributes.name.includes(v)
))

const filterFromTag = (v: string) =>
(fromOptions.value = fromTagCache.filter((tag: Tag) =>
  tag.attributes.name.includes(v)
))

const filterToTag = (v: string) =>
(toOptions.value = toTagCache.filter((tag: Tag) =>
  tag.attributes.name.includes(v)
))

const fd = () => {
  graph.zoomTo(graph.zoom() + 1)
}

const sx = () => {
  if (graph.zoom() >= 2) { graph.zoomTo(graph.zoom() - 1) } else {
    toast.info('已经是最小缩放级别')
  }
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

  .concept {
    color: $primary;
    font-weight: bold;
  }

  .tag {
    color: $secondary;
    font-weight: bold;
  }

  .cavs {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(175, 175, 175, 0.767);
  }

  .toolbar {
    display: flex;
    flex-direction: row;
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
