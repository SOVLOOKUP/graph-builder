<template>
  <div class="builder">
    <div class="container">
      <Container ref="childRef" />
    </div>
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

    <DragCard title="实体/边编辑" :show="true">
      <template #top><Icon icon="logos:graphene" /></template>
      <q-input
        label="名称"
        type="text"
        v-model="newNodeName"
        variant="outlined"
        hide-details="auto"
      />
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
    </DragCard>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import { onMounted, Ref, ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { listConcepts } from '../api'
const DragCard = defineAsyncComponent(() => import('@/components/DragCard.vue'))
const Container = defineAsyncComponent(
  () => import('@/components/GraphCanvas.vue')
)

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

// todo 选中显示并加载 取消选中关闭
// todo 点击确定保存到云端
const newNodeName = ref('')
const concept = ref<Ref<Concept>>()

const toast = useToast()
const childRef = ref('childRef')
const options = ref<Ref<Concept[]>>([] as any)

let builder: any
let cache: Concept[] = []
cache = (await (await listConcepts()).json()).data
options.value = cache

onMounted(async () => {
  builder = childRef.value
})

// 筛选
const fillter = (v: string) =>
  (options.value = cache.filter((concept: Concept) =>
    concept.attributes.name.includes(v)
  ))

// 放大
const fd = () => builder.fd()
// 缩小
const sx = () => builder.sx()
// 缩放到全屏
const rf = () => builder.rf()
// 保存
const sv = async () => {
  const res = await builder.sv()
  if (res.status === 200) toast.success('保存成功')
}
</script>

<style lang="scss" scoped>
.builder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

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

  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
