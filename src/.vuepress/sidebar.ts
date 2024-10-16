import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  '/部署/':getBuShuBar(),
  '/实战/商城/':getShopBar(),
  '/实战/实用工具类/':getUtilsBar(),
  '/框架/架构/':getJiaGouBar(),
  '/框架/Spring全家桶/SpringCloudAlibaba/':getSpringCloudAlibabaBar(),
  '/框架/Spring全家桶/SpringBoot/':getSpringBootBar(),
  '/框架/Spring全家桶/SpringSecurity/':getSpringSecurityBar(),
  '/框架/Spring全家桶/SpringMVC/':getSpringMVCBar(),
  '/框架/Spring全家桶/Spring/':getSpringBar(),
  '/框架/Mybatis/':getMyBatisBar(),
  '/前端/vue/':getVueBar(),
  '/前端/前端基础/':getQianDuanBar(),
  '/java/日志/': getLoggingBar(),
  '/java/JUC/': getJUCBar(),
  '/java/响应式编程/': getReactorBar(),
  '/java/javaWeb/': getJavaWebBar(),
  '/java/补充/': getBuChongBar(),
  '/java/': getJavaBar(),
  '/db/jdbc/': getDBJdbcBar(),
  '/db/mysql/': getDBMysqlBar(),
  // '/中间件/自定义Starter/':getStarterBar(),
  '/中间件/':getMiddleBar(),
  '/实验/':getShiYanBar(),
  '/设计模式/':getDesign(),
});





function getBuChongBar() {
  return [
    {
      text: '补充',
      collapsible: false,
      children: [
        'Retrofit2',
        'rxJava/rxJava',
        'lua',
        'JVM',
        '枚举',
        '线程池',
        '自定义注解'
      ]
    }
  ]
}

function getJUCBar() {
  return [
    {
      text: 'JUC并发编程',
      collapsible: false,
      children: [
        '1、JUC概述',
        '2、Lock接口',
        '3、线程间通讯与线程间定制化通讯',
        '4、集合的线程不安全问题',
        '5、多线程锁',
        '6、callable接口',
        '7、JUC中强大的辅助类',
      ]
    }
  ]
}
function getReactorBar() {
  return [
    {
      text: 'Springboot3响应式编程',
      collapsible: false,
      children: [
        '前置知识',
        'Reactor',
      ]
    }
  ]
}

function getShopBar() {
  return [
    {
      text: '商城项目',
      collapsible: false,
      children: [
        '项目笔记',
        '网页静态化技术',
        "微信支付",
        "单点登录SSO",
        "IdWorker",
      ]
    }
  ]
}

function getSpringCloudAlibabaBar() {
  return [
    {
      text: '服务中心',
      collapsible: false,
      children: [
        'Nacos'
      ]
    },
    {
      text: '网关',
      collapsible: false,
      children: [
        'SpringCloud-Gateway'
      ]
    },
    {
      text: '流控',
      collapsible: false,
      children: [
        'Sentinel'
      ]
    },
    {
      text: '链路追踪',
      collapsible: false,
      children: [
        'Sleuth'
      ]
    },
    {
      text: '分布式事务',
      collapsible: false,
      children: [
        '分布式事务'
      ]
    },
  ]
}

function getJiaGouBar() {
  return [
    {
      text: '项目搭建',
      collapsible: false,
      children: [
        '项目搭建/项目搭建',
      ]
    },
    {
      text: 'DDD架构(上)',
      collapsible: false,
      children: [
        'DDD架构/01-ddd是什么',
        'DDD架构/02-Domain 领域层都包含什么',
        "DDD架构/03-聚合、实体、值对象",
        "DDD架构/04-仓储，封装持久化数据",
        "DDD架构/05-适配，端口，调用外部接口",
        "DDD架构/06-事件，触发异步消息",
        "DDD架构/07-领域服务，实现约定",
      ]
    }
  ]
}
function getVueBar() {
  return [
    {
      text: 'Vue',
      collapsible: false,
      children: [
        '01_ECMAScript6入门',
        '02_Vue入门',
        "03_Vue进阶",
        "04_锋迷Wiki实战项目",
        "锋迷项目梳理",
      ]
    }
  ]
}

function getDesign(){
  return [
    {
      text: '1、设计模式概述',
      collapsible: false,
      children: [
        '概述/概述'
      ]
    },
    {
      text: '2、UML图',
      collapsible: false,
      children: [
        '概述/UML',
      ]
    },
    {
      text: '3、设计原则',
      collapsible: false,
      children: [
        '设计原则/开闭原则',
        '设计原则/依赖倒转原则',
        '设计原则/单一原则',
        '设计原则/接口隔离原则',
        '设计原则/迪米特法则',
        '设计原则/里氏替换原则',
        '设计原则/合成复用原则',
      ]
    },
    {
      text: '4、创建型模式',
      collapsible: false,
      children: [
        '创建型模式/单例模式',
        '创建型模式/工厂模式',
        '创建型模式/原型模式',
        '创建型模式/建造者模式',
        '创建型模式/创建型模式比对',
      ]
    },
    {
      text: '5、结构型模式',
      collapsible: false,
      children: [
        '结构型模式/代理模式',
        '结构型模式/适配器模式',
        '结构型模式/装饰者模式',
        '结构型模式/桥接模式',
        '结构型模式/外观模式',
        {
          text: '5.6 组合模式',
          collapsible: false,
          children: [
            '结构型模式/组合模式/组合模式实现决策树/组合模式实现规则树引擎',
          ]
        }
      ]
    },
    {
      text: '6、行为型模式',
      collapsible: false,
      children: [
        '行为型模式/策略模式',
      ]
    }
  ]
}

function getBuShuBar() {
  return [
    {
      text: 'Zabbix',
      collapsible: false,
      children: [
        'zabbix/监控中心Zabbix入门/监控中心Zabbix入门',
        'zabbix/监控中心Zabbix进阶/监控中心Zabbix进阶'
      ]
    },
    {
      text: 'Nginx',
      collapsible: false,
      children: [
        'nginx/Nginx'
      ]
    },
    {
      text: 'Docker',
      collapsible: false,
      children: [
        'docker/微服务架构演变',
        'docker/docker',
        'docker/docker_new',
        'docker/docker使用个人阿里云镜像源'
      ]
    },
    {
      text: 'Linux',
      collapsible: false,
      children: [
        'linux/01_Linux_安装',
        'linux/02_Linux_简介及常用命令',
        "linux/03_Linux_Vim使用",
        "linux/04_Linux_软件安装及Java开发环境搭建",
        "linux/05_Linux_防火墙FirewallD设置",
      ]
    },
    {
      text: 'Vm',
      collapsible: false,
      children: [
        'vm/linux安装centos',
        'vm/linux中网络连接的3种模式'
      ]
    },
  ]
}

function getUtilsBar() {
  return [
    {
      text: '实用工具类',
      collapsible: false,
      children: [
        'DocUtils'
      ]
    }
  ]
}

function getSpringSecurityBar() {
  return [
    {
      text: 'SpringSecurity',
      collapsible: false,
      children: [
        'SpringSecurity',
        '1_快速入门',
        '2_认证',
        '3_授权',
        '4_自定义失败处理',
        '5_跨域',
        '6_遗留小问题',
      ]
    }
  ]
}
function getLoggingBar() {
  return [
    {
      text: '日志',
      collapsible: false,
      children: [
        '1_日志简介',
        '2_JUL',
        '3_log4j',
        '4_JCL',
        '5_SLF4J',
        '6_Logback',
        '7_Log4j2',
        '8_springboot日志实现',
      ]
    }
  ]
}
function getSpringBootBar() {
  return [
    {
      text: 'SpringBoot',
      collapsible: false,
      children: [
        '01_SpringBoot_入门',
        '02_SpringBoot_进阶',
        '03_SpringBoot_Swagger2',
      ]
    }
  ]
}
function getSpringMVCBar() {
  return [
    {
      text: 'SpringMVC',
      collapsible: false,
      children: [
        '01_SpringMVC快速入门及解析',
        '02_SpringMVC的响应和请求',
        '03_SpringMVC文件上传下载及异常处理',
        '04_SSM整合案例',
        '05_SpringSecurity通用权限管理系统',
      ]
    }
  ]
}
function getSpringBar() {
  return [
    {
      text: 'Spring',
      collapsible: false,
      children: [
        '01_SpringIOC和DI',
        '02_动态代理和SpringAOP',
        '03_Spring整合MyBatis_声明式事务',
        '04_Spring注解开发_整合Junit',
      ]
    }
  ]
}
function getMyBatisBar() {
  return [
    {
      text: 'Mybatis',
      collapsible: false,
      children: [
        '01_MyBatis快速入门',
        '02_MyBatis进阶'
      ]
    },
    {
      text: 'Mybatis-Plus',
      collapsible: false,
      children: [
        '03_MybatisPlus'
      ]
    }
  ]
}
function getQianDuanBar() {
  return [
    {
      text: '前端基础',
      collapsible: false,
      children: [
        '01_HTML',
        '02_CSS',
        '03_JavaScript',
        '04_jQuery',
        '05_BootStrap',
        '06_Ajax_JSON'
      ]
    }
  ]
}
function getDBJdbcBar() {
  return [
    {
      text: 'JDBC',
      collapsible: false,
      children: [
        '01_JDBC',
        '02_数据库连接池',
        '03_事务',
        '04_Commons_DbUtils'
      ]
    }
  ]
}
function getJavaWebBar() {
  return [
    {
      text: 'javaWeb',
      collapsible: false,
      children: [
        '01_Web开发基础',
        '02_Servlet',
        '03_JSP入门_Cookie_Session',
        '04_JSP进阶_EL_JSTL',
        '05_Filter',
        '06_文件上传',
      ]
    }
  ]
}
function getJavaBar() {
  return [
    {
      text: 'javaSE基础',
      collapsible: false,
      children: [
        'javaSE基础/01_Java入门与开发环境搭建',
        'javaSE基础/02_Java语言基础',
        'javaSE基础/03_控制流程',
        'javaSE基础/04_方法',
        'javaSE基础/05_数组',
        'javaSE基础/06_面向对象基础',
        'javaSE基础/07_面向对象三大特征',
        'javaSE基础/08_三个修饰符',
        'javaSE基础/09_接口和内部类',
        'javaSE基础/10_常用类',
        'javaSE基础/11_集合',
        'javaSE基础/12_异常',
      ]
    },
    {
      text: 'JavaSE高级',
      collapsible: false,
      children: [
        'JavaSE高级/01_IO',
        'JavaSE高级/02_多线程',
        'JavaSE高级/03_网络编程',
        'JavaSE高级/04_反射',
        'JavaSE高级/05_Java8新特性',
      ]
    }
  ]
}
function getDBMysqlBar() {
  return [
    {
      text: 'mysql基础',
      collapsible: false,
      children: [
        'Mysql基础/01_MySQL概述',
        'Mysql基础/02_MySQL安装及配置',
        'Mysql基础/03_MySQL客户端工具',
        'Mysql基础/04_SQL概述及DDL',
        'Mysql基础/05_DML',
        'Mysql基础/06_约束',
        'Mysql基础/07_DQL',
        'Mysql基础/08_DCL',
        'Mysql基础/09_TPL',
        'Mysql基础/10_视图',
        'Mysql基础/11_常用函数',
        'Mysql基础/12_变量_存储过程_函数',
      ]
    },
    {
      text: 'mysql高级',
      collapsible: false,
      children: [
        'Mysql高级/Mysql高级篇-索引优化',
      ]
    }
  ]
}

function getStarterBar() {
  return [
    {
      text: '自定义starter',
      collapsible: false,
      children: [
        '自定义starter',
        '白名单过滤starter',
      ]
    },
    {
      text: '上传maven中央仓库',
      collapsible: false,
      children: [
        '上传中央仓库',
      ]
    }
  ]
}

function getMiddleBar() {
  // return [
  //     {
  //         text: 'ElasticSearch',
  //         collapsible: false,
  //         children: [
  //             'ElasticSearch/ElasticSearch',
  //             'EasyES/Easy-es',
  //         ]
  //     },
  //     {
  //         text: 'Redis',
  //         collapsible: false,
  //         children: [
  //             'redis/Redis笔记全',
  //             'redis/布隆过滤器'
  //         ]
  //     },
  //     {
  //         text: 'RocketMq',
  //         collapsible: false,
  //         children: [
  //             'rocketMq/RocketMQ'
  //         ]
  //     },
  //     {
  //         text: 'Git',
  //         collapsible: false,
  //         children: [
  //             'git/笔记'
  //         ]
  //     },
  //     {
  //         text: 'Maven',
  //         collapsible: false,
  //         children: [
  //             'maven/01_Maven基础',
  //             'maven/02_Maven聚合工程'
  //         ]
  //     }
  // ]
  return [
    {
      text: '中间件',
      collapsible: false,
      children: [
        'ElasticSearch/ElasticSearch',
        'EasyES/Easy-es',
        'ELK/使用docker搭建ELK',
        {
          text: 'Redis',
          collapsible: false,
          children: [
            'redis/Redis笔记全',
            'redis/布隆过滤器',
            'redis/redisson',
          ]
        },
        {
          text: 'RocketMQ',
          collapsible: false,
          children: [
            'rocketMq/RocketMQ',
            'rocketMq/rocketMq深入',
          ]
        },
        'git/笔记',
        {
          text: 'maven',
          collapsible: false,
          children: [
            'maven/01_Maven基础',
            'maven/02_Maven聚合工程',
            'maven/上传maven中央仓库/上传中央仓库'
          ]
        }
      ]
    },
    {
      text: '自定义starter',
      collapsible: false,
      children: [
        '自定义Starter/自定义starter',
        '自定义Starter/白名单过滤starter',
        '自定义Starter/动态线程池',
      ]
    }
  ]
}

function getShiYanBar() {
  return [
    {
      text: '案例',
      collapsible: false,
      children: [
        '基于偕二硼酸酯催化反应模式创新，构建非环状、1,3-立体中心的手性1,2-双硼酸酯',
        '芳香酮与偕二氟烯烃的羰基烯烃复分解与脱氢环化',
      ]
    }
  ]
}





const old = {
  "/": [
    "",
    "portfolio",
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
};
