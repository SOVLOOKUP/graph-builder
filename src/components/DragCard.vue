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
        <q-bar @mousedown="startDrag" class="bg-primary text-white">
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

let move: Ref<((e: MouseEvent) => void) | undefined> = ref(undefined)
let up: Ref<(() => void) | undefined> = ref(undefined)
let draggableEvent: Draggable
const win = ref()
const showDragger = ref(false)
const id = 'win'

const startDrag = (e: MouseEvent) => {
  if (e.button === 0) {
    draggableEvent = new Draggable(id, { x: e.clientX, y: e.clientY })

    // 设置初始位置
    props.initPosition &&
      draggableEvent.dragAt(props.initPosition.x, props.initPosition.y)

    move.value = (e: MouseEvent) => {
      draggableEvent.dragAt(e.clientX, e.clientY)
    }

    up.value = () => {
      draggableEvent.endDragging()
      showDragger.value = false
      move.value = undefined
      up.value = undefined
    }

    showDragger.value = true
  }
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

<style lang="scss" setup>
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
