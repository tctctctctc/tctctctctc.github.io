<template>
  <div class="t-list-container">
    <!-- 列表 -->
    <div class="t-lists">
      <ul :class="isDark ? 'isDark' : ''">
        <li
          v-for="(blog, index) in blogInfos"
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
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";

const { theme, isDark } = useData();

// 博客数据
const blogInfos = theme.value.blogs;
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
    height: 100%;
  }
}
</style>