<template>
  <div class="t-subtitle" :style="typingStyle">{{ words }}</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useData } from "vitepress";

const { frontmatter } = useData();

const words = ref("");
const index = ref(-1);

// 内容
const typingWords = frontmatter.value.home.typings;

// 样式
const typingStyle = reactive({
  width: "0",
  animation: "",
});

// 计算样式
const computeStyle = () => {
  index.value++;
  if (index.value === typingWords.length) {
    index.value = 0;
  }
  words.value = typingWords[index.value];
  const wordsLength = words.value.length;
  typingStyle.animation =
    "typing 5s steps(" + wordsLength + ") infinite, caret 1s steps(1) infinite";
  typingStyle.width = wordsLength + "em";
  typingStyle["--t-typing-width"] = wordsLength + "em";
};

// 打字
const typing = () => {
  if (!typingWords.length) return;
  computeStyle();
  setInterval(computeStyle, 5005);
};
typing();
</script>

<style>
@keyframes typing {
  0% {
    width: 0;
  }

  60% {
    width: var(--t-typing-width);
  }

  80% {
    width: var(--t-typing-width);
  }

  100% {
    width: 0;
  }
}

@keyframes caret {
  50% {
    border-color: transparent;
  }
}

.t-subtitle {
  margin: 0 auto;
  font-size: 1.7em;
  line-height: 1.2;
  font-family: monospace;
  color: #eee;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.1em solid;
}
</style>