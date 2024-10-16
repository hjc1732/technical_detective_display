import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "技术侦探",
  description: "技术并不是我们所追求的目的,而是技术创新世界",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
