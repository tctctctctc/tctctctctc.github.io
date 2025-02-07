<template>
  <div class="t-list-container">
    <!-- 列表 -->
    <div class="t-lists">
      <ul ref="blogListRef" :class="isDark ? 'isDark' : ''">
        <li
          v-for="(blog, index) in blogs"
          :key="blog.path"
          :class="index % 2 ? '' : 'reverse-cover'"
        >
          <div class="t-blog-info">
            <h2>
              <a :href="blog.path">{{ blog.frontmatter.title }}</a>
            </h2>
            <div class="t-blog-meta">
              📅 发表于
              <span>{{ blog.frontmatter.date }}</span>
              | 🔖
              <span>{{ blog.frontmatter.categories[0] }}</span>
            </div>
            <p>{{ blog.frontmatter.description }}</p>
          </div>
          <div class="t-blog-cover">
            <a :href="blog.path">
              <img :src="blog.frontmatter.cover" />
            </a>
          </div>
        </li>
      </ul>

      <!-- 分页 -->
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
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { ref, computed } from "vue";

const { theme, isDark } = useData();

// 博客数据
const blogInfos = theme.value.blogs;

// 当前页
const currentPage = ref(1);

// 每页文章数
const pageSize = theme.value.pageSize ?? 5;

// 最大页码
const maxPage = Math.ceil(blogInfos.length / pageSize);

const blogs = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return blogInfos.slice(startIndex, endIndex);
});

const blogListRef = ref(null);

// 页码减
const subPage = () => {
  if (currentPage.value > 1) {
    blogListRef.value.style.opacity = 0;
    setTimeout(() => {
      currentPage.value--;
      blogListRef.value.style.opacity = 1;
    }, 300);
    blogListRef.value.firstElementChild.scrollIntoView({ behavior: "smooth" });
  }
};

// 页码加
const addPage = () => {
  blogListRef.value.style.opacity = 0;
  if (currentPage.value < maxPage) {
    setTimeout(() => {
      currentPage.value++;
      blogListRef.value.style.opacity = 1;
    }, 300);
    blogListRef.value.firstElementChild.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style>
.t-list-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 15px;
}

.t-list-container > .t-lists {
  width: 74%;
}

@media screen and (max-width: 900px) {
  .t-list-container > .t-lists {
    width: 100%;
  }
}

.t-list-container > .t-lists > ul {
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.t-list-container > .t-lists > ul > li {
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin-bottom: 30px;
  height: 12em;
  display: flex;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

.t-list-container > .t-lists > ul > li.reverse-cover {
  flex-direction: row-reverse;
}

.t-list-container > .t-lists > ul.isDark > li {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-list-container > .t-lists > ul > li > .t-blog-info {
  width: 65%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.t-list-container > .t-lists > ul > li > .t-blog-info > .t-blog-meta {
  margin: 10px 0;
  font-size: 0.9em;
}

.t-list-container > .t-lists > ul > li > .t-blog-info > h2 > a {
  font-size: 1.55em;
  line-height: 1.4;
  cursor: pointer;
}

.t-list-container > .t-lists > ul > li > .t-blog-cover {
  width: 35%;
  height: 100%;
  overflow: hidden;
  border-radius: 0 8px 8px 0;
}

.t-list-container > .t-lists > ul > li.reverse-cover > .t-blog-cover {
  border-radius: 8px 0 0 8px;
}

.t-list-container > .t-lists > ul > li > .t-blog-cover > a > img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.5s ease;
}

.t-list-container > .t-lists > ul > li > .t-blog-cover > a > img:hover {
  transform: scale(1.2);
}

@media screen and (max-width: 768px) {
  .t-list-container > .t-lists > ul > li {
    display: flex;
    flex-direction: column-reverse !important;
    height: auto;
  }

  .t-list-container > .t-lists > ul > li > .t-blog-info {
    width: 100%;
    padding: 20px 20px 30px;
  }

  .t-list-container > .t-lists > ul > li > .t-blog-cover {
    width: 100%;
    height: 230px;
    border-radius: 8px 8px 0 0 !important;
  }
}

.t-list-container > .t-lists > .t-pagination {
  display: flex;
  justify-content: space-evenly;
  line-height: 2.5em;
}

.t-list-container > .t-lists > .t-pagination > button {
  font-size: 1.25em;
  font-weight: 600;
  background: var(--vp-c-bg);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  border-radius: 8px;
  width: 3.5em;
  height: 2.5em;
  transition: all 0.2s linear;
}

.t-list-container > .t-lists > .t-pagination > button:hover {
  background: var(--vp-c-bg-alt);
}

.t-list-container > .t-lists > .t-pagination > button.dark {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-list-container > .t-lists > .t-pagination > button:disabled {
  cursor: not-allowed;
  color: #999;
  background: var(--vp-c-bg);
}

.t-list-container > .t-lists > .t-pagination > .t-page-info {
  font-size: 1.25em;
  height: 2.5em;
  line-height: 2.5em;
}
</style>