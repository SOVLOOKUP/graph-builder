<template>
  <div class="full">
    <div
      class="dragger"
      v-show="showDragger"
      @mousemove="(e) => move && move(e)"
      @mouseup="() => up && up()"
    />
    <div ref="win" v-show="show">
      <q-card class="win">
        <q-bar
          @mousedown="startDrag"
          @touchstart="startDragMobile"
          @touchmove="(e) => move && move(e)"
          @touchend="() => up && up()"
          class="bg-primary text-white"
        >
          <Icon
            :icon="move === undefined ? 'entypo:pin' : 'mdi:drag-variant'"
          />
          <q-toolbar-title>
            <span>{{ title }}</span>
          </q-toolbar-title>
          <slot name="top" />
        </q-bar>
        <div class="q-pa-lg">
          <slot />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { store, Draggable } from '@dflex/draggable'

const props = withDefaults(
  defineProps<{
    title?: string
    show?: boolean
    initPosition?: { x: number; y: number }
  }>(),
  {
    show: false,
  }
)

let move: Ref<((e: MouseEvent | TouchEvent) => void) | undefined> =
  ref(undefined)
let up: Ref<(() => void) | undefined> = ref(undefined)
let draggableEvent: Draggable
const win = ref()
const showDragger = ref(false)
const id = 'win'

const start = (x: number, y: number) => {
  draggableEvent = new Draggable(id, { x, y })

  // 设置初始位置
  props.initPosition &&
    draggableEvent.dragAt(props.initPosition.x, props.initPosition.y)

  move.value = (e: MouseEvent | TouchEvent) => {
    e.type === 'mousemove'
    switch (e.type) {
      case 'mousemove':
        e = e as MouseEvent
        draggableEvent.dragAt(e.clientX, e.clientY)
        break
      case 'touchmove':
        e = e as TouchEvent
        draggableEvent.dragAt(
          e.changedTouches[0].clientX,
          e.changedTouches[0].clientY
        )
        break
      default:
        throw new Error('unexpected device type')
    }
  }

  up.value = () => {
    draggableEvent.endDragging()
    showDragger.value = false
    document.body.style.overflow = 'auto'
    move.value = undefined
    up.value = undefined
  }
}

const startDrag = (e: MouseEvent) => {
  if (e.button === 0) {
    start(e.clientX, e.clientY)
    showDragger.value = true
  }
}

const startDragMobile = (e: TouchEvent) => {
  document.body.style.overflow = 'hidden'
  start(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
}

onMounted(() => {
  store.register({
    id: id,
    ref: win.value as unknown as HTMLElement,
  })
})

onUnmounted(() => {
  store.unregister(id)
})
</script>

<style lang="scss" scoped>
.full {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .dragger {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
  }

  .win {
    width: auto;
    height: auto;
  }
}
</style>
