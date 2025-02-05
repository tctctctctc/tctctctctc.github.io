<template>
  <layout>
    <template #home-hero-before>
      <t-home></t-home>
    </template>

    <template #home-features-after>
      <t-blog-lists />
    </template>
  </layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import THome from "./THome.vue";
import TBlogLists from "./TBlogLists.vue";

const { Layout } = DefaultTheme;
</script>


