<template>
  <v-app-bar density="compact">
    <img
      src="https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg"
      alt=""
    />
    <v-app-bar-title>知智 · 图谱一体化构建工具</v-app-bar-title>

    <v-spacer />

    <v-btn>
      <v-icon center icon="mdi-database" />
      <span>数据源</span>
    </v-btn>

    <v-btn>
      <v-icon center icon="mdi-tag" />
      <span>标签</span>
    </v-btn>

    <v-divider inset vertical></v-divider>

    <v-btn class="mr-4 ml-5" color="primary">
      <v-icon center icon="mdi-google-ads" />
      <span>开始构建</span>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts"></script>
