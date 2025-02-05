import { defineConfig } from 'vitepress'
import { getMDFilesWithFrontmatter } from './theme/utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  /** 站名 */
  title: "Tang's Blog",
  /** 网站描述 */
  description: "工作、生活、学习记录",
  /** 主题配置 */
  themeConfig: {
    /** 顶部导航 */
    nav: [
      { text: '🏡首页', link: '/' }
    ],
    /** 社交链接 */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tctctctctc' }
    ],
    /** logo-位于站点标题前 */
    logo: '/images/head.jpg',
    /** 页脚配置 */
    footer: {
      message: '<a href="https://beian.miit.gov.cn/">湘ICP备2023000741号-1</a>',
      copyright: 'Copyright © 2024-2025 By Tang'
    },
    /** 博客 */
    blogs: getMDFilesWithFrontmatter('docs')
  },
  /** 设置head标签 */
  head: [['link', { rel: 'icon', href: 'images/head.jpg' }]],
  base: '/blogs/'
})
