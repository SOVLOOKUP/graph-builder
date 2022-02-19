<template>
    <div v-show="cells !== null">
        <div class="row">
            <div class="col-3">
                <!-- <q-list bordered separator > -->
                <div class="q-pb-md" v-for="cell in cells">
                    <q-card :class="cells?.indexOf(cell) === 0 ? 'shadow-24' : ''">
                        <q-card-section horizontal class="row">
                            <q-img height="120px" class="col-5" src="/favicon.svg">
                                <div
                                    class="absolute-bottom text-body text-center"
                                >{{ cell.concept.attributes.name }}</div>
                            </q-img>
                            <div class="q-ma-md col-6">
                                <q-chip
                                    :color="`${cell.from !== undefined ? 'secondary' : 'primary'} text-white`"
                                >{{ cell.from !== undefined ? '关系' : '实体' }}</q-chip>
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
                                            <q-item-section class="text-grey">无可用数据集</q-item-section>
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
                <!-- </q-list> -->
            </div>
            <q-space @click="printres"/>
            <!-- 2 + 6 < 12, so next element is placed on same line -->
            <div class="col-8">
                <div v-if="dataCollection === null">请选择数据集</div>
                <div
                    v-else
                    class="q-pb-md q-pr-lg"
                    v-for="tag in (cells as CellData[])[0].concept.attributes.tag.filter(t => t.gi_tag.data !== null).map(t => t.gi_tag.data?.attributes.name)"
                >
                    <q-select
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CellData, DataCollection, TaskMeta, MetaData, DataMap } from 'src/types'
import { ref } from 'vue'

const dataCollection = ref<DataCollection | null>(null)
const dataMap = ref<{
    [to:string]:MetaData
}>({})

const printres = ()=>{
    console.log(dataMap.value);
    // todo 确定后校验并转换数据
    // celldata => Map<string, Category>
    // metadata => DataMap =>  Map<number, DataMap[]>
    // 删掉 cells[0]
    dataCollection.value = null
    dataMap.value = {}
}

defineProps<{
    cells: CellData[] | null
    taskMeta: TaskMeta
    dataCollectionOptions: DataCollection[]
}>()
</script>
