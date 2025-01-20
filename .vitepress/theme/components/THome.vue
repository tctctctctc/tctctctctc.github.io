<template>
  <div class="t-home" :style="bgStyle">
    <!-- 遮罩 -->
    <div :class="['t-wrap', isDark ? 'dark' : '']"></div>

    <div class="t-home-info">
      <!-- 标题 -->
      <h1 class="t-site-title">{{ $frontmatter.home.title }}</h1>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";

const { frontmatter, isDark } = useData();

// 背景图样式
const bgStyle = {
  background: `url(${frontmatter.value?.home.homeBg})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
</script>


<style>
.t-home {
  width: 100vw;
  height: calc(100vh - 64px);
  position: relative;
}

.t-home > .t-home-info {
  position: absolute;
  top: 35%;
  padding: 0 10px;
  width: 100%;
  text-align: center;
}

.t-home > .t-home-info > .t-site-title {
  font-size: 4rem;
  font-weight: 600;
  color: white;
}

.t-wrap {
  position: absolute;
  width: 100%;
  height: calc(100vh - 64px);
  background-image: linear-gradient(#e1e1e1, var(--t-mask-bg));
}

.t-wrap.dark {
  background-image: linear-gradient(#1b1b1f, var(--t-mask-bg));
}
</style>