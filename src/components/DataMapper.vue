<template>
<div  v-show="cells !== null">
<q-list bordered separator>
<q-item clickable v-ripple v-for="cell in cells">
    <q-item-section>{{ cell }}</q-item-section>
</q-item>
</q-list>
</div>

</template>

<script setup lang="ts">
import type { CellData, TaskMeta } from 'src/types'

defineProps<{
    cells: CellData[] | null
    taskMeta: TaskMeta
}>()
</script>