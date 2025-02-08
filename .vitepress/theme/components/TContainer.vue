<template>
  <div class="t-container">
    <!-- 左侧内容区，如文章列表 -->
    <div class="t-main-container">
      <t-blog-lists />
    </div>
    <!-- 右侧信息，如profile -->
    <div class="t-aside-container"></div>
  </div>
</template>

<script setup>
import TBlogLists from "./TBlogLists.vue";
</script>

<style>
.t-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 15px;
  display: flex;
}

.t-container > .t-main-container {
  width: 74%;
}

.t-container > .t-aside-container {
  width: 26%;
}

@media screen and (max-width: 768px) {
  .t-container {
    flex-direction: column;
  }

  .t-container > .t-main-container {
    width: 100%;
  }

  .t-container > .t-aside-container {
    width: 100%;
  }
}
</style>