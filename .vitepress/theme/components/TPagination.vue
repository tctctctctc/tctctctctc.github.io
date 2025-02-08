<template>
  <div class="t-pagination">
    <button
      :class="isDark ? 'dark' : ''"
      :disabled="currentPage === 1"
      @click="subPage"
    >
      {{ "<" }}
    </button>
    <span class="t-page-info">{{ currentPage }} / {{ maxPage }}</span>
    <button
      :class="isDark ? 'dark' : ''"
      :disabled="currentPage === maxPage"
      @click="addPage"
    >
      {{ ">" }}
    </button>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { watch, onMounted, ref } from "vue";

const { theme, isDark } = useData();

const props = defineProps({
  /** 文章 */
  blogInfos: {
    type: Array,
  },
});

const emits = defineEmits(["getBlogs"]);

// 当前页
const currentPage = ref(1);

// 每页文章数
const pageSize = theme.value.pageSize ?? 5;

// 最大页码
const maxPage = Math.ceil(props.blogInfos.length / pageSize);

watch(
  currentPage,
  () => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const blogs = props.blogInfos.slice(startIndex, endIndex);
    emits("getBlogs", blogs);
  },
  { immediate: true }
);

// 页码减
const subPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 页码加
const addPage = () => {
  if (currentPage.value < maxPage) {
    currentPage.value++;
  }
};
</script>

<style>
.t-pagination {
  display: flex;
  justify-content: space-evenly;
  line-height: 2.5em;
}

.t-pagination > button {
  font-size: 1.25em;
  font-weight: 600;
  background: var(--vp-c-bg);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  border-radius: 8px;
  width: 3.5em;
  height: 2.5em;
  transition: all 0.2s linear;
}

.t-pagination > button:hover {
  background: var(--vp-c-bg-alt);
}

.t-pagination > button.dark {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-pagination > button:disabled {
  cursor: not-allowed;
  color: #999;
  background: var(--vp-c-bg);
}

.t-pagination > .t-page-info {
  font-size: 1.25em;
  height: 2.5em;
  line-height: 2.5em;
}
</style>