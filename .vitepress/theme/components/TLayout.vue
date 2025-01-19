<template>
  <layout>
    <template #layout-top>
      <t-home></t-home>
    </template>
  </layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import THome from "./THome.vue";

const { Layout } = DefaultTheme;
</script>


