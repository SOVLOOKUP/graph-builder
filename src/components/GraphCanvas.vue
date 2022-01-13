<template>
  <div class="layout">
    <div ref="container" class="cavs" style="flex: 1" />
  </div>
</template>

<script lang="ts" setup>
import { Graph } from '@antv/x6'
import { onMounted, ref } from 'vue'
import worker from '../lib/workers'

const r = 60
const container = ref(undefined)
let graph: Graph

onMounted(async () => {
  graph = new Graph({
    container: container.value,
    autoResize: true,
    selecting: {
      enabled: true,
      rubberband: true, // 启用框选
    },
    // 网格
    grid: true,
    // 异步渲染
    async: true,
    translating: {
      // 不能超出画布
      restrict: true,
    },
    connecting: {
      snap: {
        radius: 30,
      },
      allowBlank: false,
    },
  })

  // 双击添加节点
  graph.on('blank:dblclick', (e) => addNode(e.x, e.y))

  graph.on('blank:dblclick', async (e) => {
    console.time('运行时间')

    const sum = await worker.add(2, 3)

    console.log(`2 + 3 = ${sum}`)

    console.timeEnd('运行时间')
  })

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
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  // box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  .cavs {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(175, 175, 175, 0.767);
  }
}
</style>