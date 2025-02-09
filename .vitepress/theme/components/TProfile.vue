<template>
  <div v-if="theme.profile" :class="['t-profile', isDark ? 'dark' : '']">
    <!-- 头像 -->
    <div class="head">
      <img :src="withBase(theme.logo)" />
    </div>
    <!-- 个人简介 -->
    <h2>{{ theme.profile.name }}</h2>
    <div class="profile">
      {{ theme.profile.slogan }}
    </div>
    <!-- 数据 -->
    <div class="blog-info" v-if="theme.blogs">
      <div class="blog-info-item">
        <span>文章</span>
        <span>{{ theme.blogs.blogInfos.length }}</span>
      </div>
      <div class="blog-info-item">
        <span>标签</span>
        <span>{{ Object.keys(theme.blogs.tags).length }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";

const { theme, isDark } = useData();
</script>

<style>
.t-profile {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

.t-profile.dark {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-profile > .head {
  margin: 20px;
}

.t-profile > .head > img {
  width: 50%;
  border-radius: 50%;
  margin: 0 auto;
  transition: all 0.3s linear;
}

.t-profile > .head > img:hover {
  transform: rotate(360deg);
  transition: all 0.3s linear;
}

.t-profile > h2 {
  font-size: 1.5em;
  font-weight: 600;
}

.t-profile > .profile {
  margin: 10px 0;
}

.t-profile > .blog-info {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.t-profile > .blog-info > .blog-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.t-profile > .blog-info > .blog-info-item > span:nth-child(2) {
  font-size: 1.1em;
}
</style>