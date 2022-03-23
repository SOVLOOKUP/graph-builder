<template>
  <div class="full">
    <div
      class="dragger"
      v-show="showDragger"
      @mousemove="(e) => move && move(e)"
      @mouseup="() => up && up()"
    />
    <div ref="win" v-show="show" class="win">
      <q-card>
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
        <q-card-actions align="right">
          <q-btn flat @click="show = false"> 取消 </q-btn>
          <q-btn color="primary" flat @click="ok"> 确认 </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { store, Draggable } from '@dflex/draggable'

withDefaults(
  defineProps<{
    title?: string
    show?: boolean
    initPositionX: number
    initPositionY: number
    ok: () => void
  }>(),
  {
    show: false,
    ok: () => {},
  }
)

let move: Ref<((e: MouseEvent | TouchEvent) => void) | undefined> =
  ref(undefined)
let up: Ref<(() => void) | undefined> = ref(undefined)
let draggableEvent: Draggable
let defaultOverflow = ''
const win = ref()
const showDragger = ref(false)
const id = 'win'

const start = (x: number, y: number) => {
  draggableEvent = new Draggable(id, { x, y })

  move.value = (e: MouseEvent | TouchEvent) => {
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
    document.body.style.overflow = defaultOverflow
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
  defaultOverflow = document.body.style.overflow
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
  position: fixed;

  .dragger {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: auto;
  }

  .win {
    position: fixed;
    top: v-bind(initPositionY);
    left: v-bind(initPositionX);
    width: auto;
    height: auto;
  }
}
</style>
