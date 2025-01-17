// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TLayout from './components/TLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: TLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
