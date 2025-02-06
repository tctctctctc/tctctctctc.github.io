<template>
  <div ref="homeRef" class="t-home" :style="bgStyle">
    <!-- 遮罩 -->
    <div :class="['t-wrap', isDark ? 'dark' : '']"></div>

    <div class="t-home-info">
      <!-- 标题 -->
      <h1 class="t-site-title">{{ $frontmatter.home.title }}</h1>

      <!-- 打字机 -->
      <t-typing />
    </div>

    <!-- 底部下滑导航 -->
    <div class="t-scroll-down">
      <i @click="onScrollDown"></i>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";
import { ref } from "vue";

import TTyping from "./TTyping.vue";

const { frontmatter, isDark } = useData();

// 背景图样式
const bgStyle = {
  background: `url(${withBase(frontmatter.value?.home.homeBg)})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

// 向下滑动
const homeRef = ref();
const onScrollDown = () => {
  window.scrollTo({
    top: homeRef.value.offsetHeight + 64,
    left: 0,
    behavior: "smooth",
  });
};
</script>


<style>
@keyframes scroll-down {
  0% {
    bottom: 10px;
    opacity: 1;
  }

  50% {
    bottom: 0px;
    opacity: 0.4;
    filter: none;
  }

  100% {
    bottom: 10px;
    opacity: 1;
  }
}

.t-home {
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
}

.t-home > .t-home-info {
  position: absolute;
  top: 35%;
  padding: 0 10px;
  width: 100vw;
  text-align: center;
}

.t-home > .t-home-info > .t-site-title {
  font-size: 4rem;
  font-weight: 600;
  color: white;
  line-height: 1.5;
}

@media screen and (max-width: 640px) {
  .t-home > .t-home-info > .t-site-title {
    font-size: 3rem;
    font-weight: 600;
  }
}

.t-home > .t-scroll-down {
  width: 100%;
  position: absolute;
  bottom: 10px;
  font-weight: 900;
  line-height: 1.5;
  animation: scroll-down 1.5s infinite;
  text-align: center;
  color: #eee;
  font-size: 30px;
}

.t-home > .t-scroll-down > i::before {
  content: "";
  border-top: 10px solid #eee;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  transform: translate(-50%, -50%) rotate(45deg);
  cursor: pointer;
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