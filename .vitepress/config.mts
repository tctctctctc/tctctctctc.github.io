import { defineConfigWithTheme } from 'vitepress'
import { getMDFilesWithFrontmatter } from './theme/utils'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
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
    /** 个人简介 */
    profile: {
      name: 'Tang',
      slogan: '言念君子，温其如玉'
    },
    /** 博客 */
    blogs: getMDFilesWithFrontmatter('blogs'),
    /** 最后更新-文本 */
    lastUpdatedText: '最后更新于',
    /** 博客列表pageSize */
    pageSize: 6,
    /** 大纲级别 */
    outline: [2, 5],
    /** 深浅主题切换显示文本 */
    darkModeSwitchLabel: '主题',
    /** 悬停到深色模块开关显示的标题 */
    lightModeSwitchTitle: '切换到浅色模式',
    /** 悬停到浅色额模块开关显示的标题 */
    darkModeSwitchTitle: '切换到深色模式',
    /** 回到顶部文本 */
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local'
    }
  },
  /** 设置head标签 */
  head: [['link', { rel: 'icon', href: '/docs/images/head.jpg' }]],
  /** 站点根url */
  base: '/docs/',
  /** 文档底部最后更新于 */
  lastUpdated: true
})
