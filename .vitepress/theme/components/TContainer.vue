<template>
  <div class="t-container">
    <!-- 左侧内容区，如文章列表 -->
    <div class="t-main-container">
      <t-blog-lists v-if="layout === 'home'" />
      <t-archives v-if="layout === 'archives'" />
    </div>
    <!-- 右侧信息，如profile -->
    <div class="t-aside-container">
      <t-profile />
    </div>
  </div>
</template>

<script setup>
import TBlogLists from "./TBlogLists.vue";
import TProfile from "./TProfile.vue";
import TArchives from "./TArchives.vue";

const props = defineProps({
  /** home or archives */
  layout: {
    type: String,
    default: "home",
  },
});
</script>

<style>
.t-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 15px;
  display: flex;
  justify-content: space-around;
}

.t-container > .t-main-container {
  width: 70%;
}

.t-container > .t-aside-container {
  width: 25%;
}

@media screen and (max-width: 768px) {
  .t-container {
    flex-direction: column;
  }

  .t-container > .t-main-container {
    width: 100%;
  }

  .t-container > .t-aside-container {
    margin-top: 40px;
    width: 100%;
  }
}
</style>