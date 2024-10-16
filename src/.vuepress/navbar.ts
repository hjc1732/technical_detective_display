import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/portfolio",
  // "/demo/",
  // {
  //   text: "指南",
  //   icon: "lightbulb",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  {
    text: '基础',
    // icon: "lightbulb",
    children: [
      // {text: 'javaSE', link: "/java/javaSE基础/01_Java入门与开发环境搭建"},
      {text: 'java', children:[
          {text: 'javaSE', link: "/java/javaSE基础/01_Java入门与开发环境搭建"},
          {text: 'javaWeb', link: "/java/javaWeb/01_Web开发基础"},
          {text: 'JUC', link: "/java/JUC/1、JUC概述"},
          {text: '响应式编程', link: "/java/响应式编程/前置知识"},
          {text: '设计模式', link: "/设计模式/概述/概述"},
          {text: '日志', link: "/java/日志/1_日志简介"},
        ]},
      // {text: '数据库', link: "/db/mysql/Mysql基础/01_MySQL概述"},
      {text: '数据库', children:[
          {text: 'jdbc', link: "/db/jdbc/01_JDBC"},
          {text: 'mysql', link: "/db/mysql/Mysql基础/01_MySQL概述"},
        ]},
      {text: '补充',
        children: [
          {text: 'Retrofit2', link: "/java/补充/Retrofit2"},
          {text: 'rxJava', link: "/java/补充/rxJava/rxJava"},
          {text: 'lua', link: "/java/补充/lua"},
          {text: 'jvm', link: "/java/补充/JVM"},
          {text: '枚举', link: "/java/补充/枚举"},
          {text: '线程池', link: "/java/补充/线程池"},
          {text: '自定义注解', link: "/java/补充/自定义注解"},
        ]},
      {text: '前端',
        children: [
          {text: '前端基础', link: "/前端/前端基础/01_HTML"},
          {text: 'vue', link: "/前端/vue/01_ECMAScript6入门"},
        ]},
    ]
  },
  {
    text: '框架',
    children: [
      {text: '架构',
        children: [
          {text: '项目搭建', link: "/框架/架构/项目搭建/项目搭建"},
          {text: 'DDD', link: "/框架/架构/DDD架构/01-ddd是什么"},
        ]
      },
      {text: 'ORM',
        children: [
          {text: 'Mybatis', link: "/框架/Mybatis/01_MyBatis快速入门"},
        ]
      },
      {text: 'Spring全家桶',
        children: [
          {text: 'Spring', link: "/框架/Spring全家桶/Spring/01_SpringIOC和DI"},
          {text: 'SpringMVC', link: "/框架/Spring全家桶/SpringMVC/01_SpringMVC快速入门及解析"},
          {text: 'SpringBoot', link: "/框架/Spring全家桶/SpringBoot/01_SpringBoot_入门"},
          {text: 'SpringSecurity', link: "/框架/Spring全家桶/SpringSecurity/SpringSecurity"},
          {text: 'SpringCloudAlibaba', link: "/框架/Spring全家桶/SpringCloudAlibaba/Nacos"},
        ]
      },
    ]
  },
  {text: '中间件 | 自研轮子', link: "/中间件/ElasticSearch/ElasticSearch"},
  {text: '部署|运维', link: "/部署/linux/01_Linux_安装"},
  {text: '更新日志', link: "/更新日志/更新日志.md"},
  //     children: [
  // {text: '中间件',
  //         {text: '官方中间件', link: "/中间件/ElasticSearch/ElasticSearch"},
  //         {text: '自定义starter', link: "/中间件/自定义Starter/自定义starter"},
  //     ]
  // },
  // {
  //   text: '项目练手',
  //   children: [
  //     {text: '营销抽奖', link: "https://cj.hjcwzx.top"},
  //     {text: '动态线程池', link: "https://dynamic.hjcwzx.top"},
  //     {text: '研究生工作平台', link: "http://520.hjcwzx.top"},
  //     {text: '实用工具类', link: "/实战/实用工具类/DocUtils"},
  //     {text: '锋迷铺子', link: "/实战/商城/项目笔记"},
  //   ]
  // },
  // {text: '网站迁移', link: "https://www.hjcwzx.top/"},
  // {
  //     text: '实用工具类',
  //     children: [
  //       {text: 'DocUtils.md', link: "/实用工具类/DocUtils"},
  //     ]
  // },
  // {text: '实验相关', link: "/实验/基于偕二硼酸酯催化反应模式创新，构建非环状、1,3-立体中心的手性1,2-双硼酸酯"},
  // {
  //     text: '编程',
  //     children: [
  //         {
  //             text: 'java学习',
  //             children: [
  //                 {text: 'java', link: "/java/"},
  //             ]
  //         },
  //
  //     ]
  // }
]);