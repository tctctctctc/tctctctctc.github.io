<template>
  <div class="t-lists">
    <!-- 列表 -->
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
    <t-pagination :blogInfos="blogInfos" @getBlogs="getBlogs" />
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { ref } from "vue";

import TPagination from "./TPagination.vue";

const { theme, isDark } = useData();

// 文章数据
const blogInfos = theme.value.blogs;

// DOM
const blogListRef = ref(null);

// 计算后的每页文章
const blogs = ref([]);

const getBlogs = (data) => {
  // DOM渲染后每次更新文章再添加过渡效果
  if (blogListRef.value) {
    blogListRef.value.style.opacity = 0;
    setTimeout(() => {
      blogs.value = data;
      blogListRef.value.style.opacity = 1;
      blogListRef.value.firstElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }, 600);
  } else {
    blogs.value = data;
  }
};
</script>

<style>
.t-lists {
  width: 100%;
  height: 100%;
}

.t-lists > ul {
  display: flex;
  flex-direction: column;
  transition: all 0.6s ease;
}

.t-lists > ul > li {
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin-bottom: 30px;
  height: 12em;
  display: flex;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

.t-lists > ul > li.reverse-cover {
  flex-direction: row-reverse;
}

.t-lists > ul.isDark > li {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-lists > ul > li > .t-blog-info {
  width: 65%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.t-lists > ul > li > .t-blog-info > .t-blog-meta {
  margin: 10px 0;
  font-size: 0.9em;
}

.t-lists > ul > li > .t-blog-info > h2 > a {
  font-size: 1.55em;
  line-height: 1.4;
  cursor: pointer;
}

.t-lists > ul > li > .t-blog-cover {
  width: 35%;
  height: 100%;
  overflow: hidden;
  border-radius: 0 8px 8px 0;
}

.t-lists > ul > li.reverse-cover > .t-blog-cover {
  border-radius: 8px 0 0 8px;
}

.t-lists > ul > li > .t-blog-cover > a > img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.5s ease;
}

.t-lists > ul > li > .t-blog-cover > a > img:hover {
  transform: scale(1.2);
}

@media screen and (max-width: 768px) {
  .t-lists > ul > li {
    display: flex;
    flex-direction: column-reverse !important;
    height: auto;
  }

  .t-lists > ul > li > .t-blog-info {
    width: 100%;
    padding: 20px 20px 30px;
  }

  .t-lists > ul > li > .t-blog-cover {
    width: 100%;
    height: 230px;
    border-radius: 8px 8px 0 0 !important;
  }
}
</style>