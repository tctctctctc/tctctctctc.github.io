<template>
  <div :class="['t-wrap', isDark ? 'dark' : '']">
    <div class="t-home" :style="bgStyle"></div>
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
  height: 100vh;
  position: relative;
  z-index: -1;
}

.t-wrap {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(white, var(--t-mask-bg));
}

.t-wrap.dark {
  background-image: linear-gradient(black, var(--t-mask-bg));
}
</style>