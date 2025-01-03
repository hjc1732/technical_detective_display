import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  '/road-map/': getRoadMapBar(),
  '/deploy-maintenance/': getDeployMaintenanceBar(),
  '/projects/': getProjectsBar(),
  '/design-pattern/': getDesignPatternBar(),
});



function getDesignPatternBar() {
  return [
    {
      text: '1、设计模式概述',
      collapsible: true,
      link:  '概述/概述'
    },
    {
      text: '2、UML图',
      collapsible: true,
      link:  '概述/UML'
    },
    {
      text: '3、设计原则',
      collapsible: true,
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
      collapsible: true,
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
      collapsible: true,
      children: [
        '结构型模式/代理模式',
        '结构型模式/适配器模式',
        '结构型模式/装饰者模式',
        '结构型模式/桥接模式',
        '结构型模式/外观模式',
        {
          text: '5.6 组合模式',
          collapsible: true,
          children: [
            '结构型模式/组合模式/组合模式实现决策树/组合模式实现规则树引擎',
          ]
        }
      ]
    },
    {
      text: '6、行为型模式',
      collapsible: true,
      children: [
        '行为型模式/策略模式',
      ]
    }
  ];
}

function getProjectsBar() {
  return [
    {
      text: '自研组件',
      collapsible: true,
      children: [
        'self-develop-component/动态线程池',
        'self-develop-component/白名单过滤starter',
        'self-develop-component/自定义starter'
      ],
    },
    {
      text: '源码分析',
      collapsible: true,
      children: [
        {
          text: 'Mybatis',
          collapsible: true,
          link: 'source-code-analysis/mybatis/mybatis源码解读'
        },
        {
          text: 'Spring',
          collapsible: true,
          children: [
            'source-code-analysis/spring/1、Spring底层核心原理解析',
            'source-code-analysis/spring/2、手写模拟Spring底层原理',
            'source-code-analysis/spring/3、Spring之底层架构核心概念解析',
            'source-code-analysis/spring/4、Spring之Bean生命周期源码解析（上）',
            'source-code-analysis/spring/5、Spring之Bean生命周期源码解析（下）',
            'source-code-analysis/spring/6、Spring之依赖注入源码解析（上）',
            'source-code-analysis/spring/7、Spring之依赖注入源码解析（下）',
            'source-code-analysis/spring/8、Spring之循环依赖底层源码解析',
            'source-code-analysis/spring/9、Spring之推断构造方法源码解析',
            'source-code-analysis/spring/10、Spring之启动过程源码解析',
            'source-code-analysis/spring/11、Spring之配置类解析源码解析',
            'source-code-analysis/spring/12、Spring之整合Mybatis底层源码解析',
            'source-code-analysis/spring/13、Spring之AOP底层源码解析（上）',
            'source-code-analysis/spring/14、Spring之AOP底层源码解析（下）',
            'source-code-analysis/spring/15、Spring之事务底层源码解析',
            'source-code-analysis/spring/16、Spring 6.0及SpringBoot 3.0新特性解析',
            'source-code-analysis/spring/17、SpringMVC启动与请求处理流程解析',
            'source-code-analysis/spring/18、SpringMVC重点功能底层源码解析',
          ],
        },
      ],
    },
    {
      text: '算法练习',
      collapsible: true,
      children: [
        'data-structures-algorithms/算法001-社会基尼系数',
        'data-structures-algorithms/算法002-二进制和位运算',
        'data-structures-algorithms/算法003-排序算法',
        'data-structures-algorithms/算法004-对数器',
        'data-structures-algorithms/算法005-二分法查找-寻找峰值',
        'data-structures-algorithms/算法006-链表反转',
        'data-structures-algorithms/算法007-合并升序链表',
        'data-structures-algorithms/算法008-链表相加',
      ],
    },
  ];
}


function getDeployMaintenanceBar() {
  return [
    {
      text: 'ELK',
      collapsible: true,
      link: 'elk/使用docker搭建ELK',
    },
    {
      text: 'Zabbix',
      collapsible: true,
      children: [
        'zabbix/监控中心Zabbix入门/监控中心Zabbix入门',
        'zabbix/监控中心Zabbix进阶/监控中心Zabbix进阶'
      ]
    },
  ];
}
function getRoadMapBar() {
  return [
    {
      text: '系统架构(2)',
      collapsible: true,
      children:  [
        {
          text: '项目搭建',
          collapsible: true,
          children: [
            '架构/项目搭建/项目搭建',
          ]
        },
        {
          text: 'DDD架构(上)',
          collapsible: true,
          children: [
            '架构/DDD架构/01-ddd是什么',
            '架构/DDD架构/02-Domain 领域层都包含什么',
            "架构/DDD架构/03-聚合、实体、值对象",
            "架构/DDD架构/04-仓储，封装持久化数据",
            "架构/DDD架构/05-适配，端口，调用外部接口",
            "架构/DDD架构/06-事件，触发异步消息",
            "架构/DDD架构/07-领域服务，实现约定",
          ]
        }
      ]
    },
    {
      text: '开发环境(6)',
      collapsible: true,
      children:  [
        {
          text: 'Git',
          collapsible: true,
          link:  'dev/git/笔记',
        },
        {
          text: 'Nginx',
          collapsible: true,
          link: 'dev/nginx/Nginx'
        },
        {
          text: 'Maven',
          collapsible: true,
          children: [
            'dev/maven/01_Maven基础',
            'dev/maven/02_Maven聚合工程',
            'dev/maven/上传maven中央仓库/上传中央仓库'
          ]
        },
        {
          text: 'Docker',
          collapsible: true,
          children: [
            'dev/docker/微服务架构演变',
            'dev/docker/docker',
            'dev/docker/docker_new',
            'dev/docker/docker使用个人阿里云镜像源'
          ]
        },
        {
          text: 'Linux',
          collapsible: true,
          children: [
            'dev/linux/01_Linux_安装',
            'dev/linux/02_Linux_简介及常用命令',
            "dev/linux/03_Linux_Vim使用",
            "dev/linux/04_Linux_软件安装及Java开发环境搭建",
            "dev/linux/05_Linux_防火墙FirewallD设置",
          ]
        },
        {
          text: 'Vm',
          collapsible: true,
          children: [
            'dev/vm/linux安装centos',
            'dev/vm/linux中网络连接的3种模式'
          ]
        },
      ]
    },
    {
      text: '开发技术(9)',
      collapsible: true,
      children:  [
        {
          text: 'Mybatis',
          collapsible: true,
          children: [
            'components/mybatis/01_MyBatis快速入门',
            'components/mybatis/02_MyBatis进阶',
            'components/mybatis/03_MybatisPlus',
          ]
        },
        {
          text: 'Spring',
          collapsible: true,
          children: [
            'components/spring/01_SpringIOC和DI',
            'components/spring/02_动态代理和SpringAOP',
            'components/spring/03_Spring整合MyBatis_声明式事务',
            'components/spring/04_Spring注解开发_整合Junit',
          ]
        },
        {
          text: 'SpringMVC',
          collapsible: true,
          children: [
            'components/springMVC/01_SpringMVC快速入门及解析',
            'components/springMVC/02_SpringMVC的响应和请求',
            'components/springMVC/03_SpringMVC文件上传下载及异常处理',
            'components/springMVC/04_SSM整合案例',
            'components/springMVC/05_SpringSecurity通用权限管理系统',
          ]
        },
        {
          text: 'SpringSecurity',
          collapsible: true,
          children: [
            'components/springSecurity/SpringSecurity',
            'components/springSecurity/1_快速入门',
            'components/springSecurity/2_认证',
            'components/springSecurity/3_授权',
            'components/springSecurity/4_自定义失败处理',
            'components/springSecurity/5_跨域',
            'components/springSecurity/6_遗留小问题',
          ]
        },
        {
          text: 'SpringBoot',
          collapsible: true,
          children:[
            'components/springBoot/01_SpringBoot_入门',
            'components/springBoot/02_SpringBoot_进阶',
            'components/springBoot/03_SpringBoot_Swagger2',
          ]
        },
        {
          text: 'SpringCloudAlibaba',
          collapsible: true,
          children:[
            'components/springCloudAlibaba/Nacos',
            'components/springCloudAlibaba/SpringCloud-Gateway',
            'components/springCloudAlibaba/Sentinel',
            'components/springCloudAlibaba/Sleuth',
            'components/springCloudAlibaba/分布式事务',
          ]
        },
        {
          text: 'Es',
          collapsible: true,
          children:[
            'components/es/elastic-search/ElasticSearch',
            'components/es/elastic-search/Elasticsearch应用',
            'components/es/easy-es/Easy-es',
          ]
        },
        {
          text: 'Redis',
          collapsible: true,
          children: [
            'components/redis/Redis笔记全',
            'components/redis/布隆过滤器',
            'components/redis/redisson',
          ]
        },
        {
          text: 'RocketMQ',
          collapsible: true,
          children: [
            'components/rocket-mq/RocketMQ',
            'components/rocket-mq/rocketMq深入',
          ]
        },
      ]
    },
    {
      text: '技术小点(5)',
      collapsible: true,
      children:  [
        {
          text: '支付',
          collapsible: true,
          children: [
            {
              text: '微信支付',
              collapsible: true,
              link: "widgets/pay/微信支付",
            },
          ]
        },
        {
          text: 'IdWorker',
          collapsible: true,
          link: "widgets/id/IdWorker",
        },
        {
          text: '单点登录',
          collapsible: true,
          link: "widgets/单点登录/单点登录SSO",
        },
        {
          text: '网页静态化',
          collapsible: true,
          link: "widgets/网页静态化技术/网页静态化技术",
        },
        {
          text: 'GoogleColab',
          collapsible: true,
          link: "widgets/google-colab/GoogleColab的使用探索",
        },
      ]
    },
    {
      text: 'Java(9)',
      collapsible: true,
      children: [
        {
          text: 'JavaSE基础',
          collapsible: true,
          expanded: false,
          children: [
            'base/java/javaSE基础/01_Java入门与开发环境搭建',
            'base/java/javaSE基础/02_Java语言基础',
            'base/java/javaSE基础/03_控制流程',
            'base/java/javaSE基础/04_方法',
            'base/java/javaSE基础/05_数组',
            'base/java/javaSE基础/06_面向对象基础',
            'base/java/javaSE基础/07_面向对象三大特征',
            'base/java/javaSE基础/08_三个修饰符',
            'base/java/javaSE基础/09_接口和内部类',
            'base/java/javaSE基础/10_常用类',
            'base/java/javaSE基础/11_集合',
            'base/java/javaSE基础/12_异常',
          ]
        },
        {
          text: 'JavaSE高级',
          collapsible: true,
          children: [
            'base/java/javaSE高级/01_IO',
            'base/java/javaSE高级/02_多线程',
            'base/java/javaSE高级/03_网络编程',
            'base/java/javaSE高级/04_反射',
            'base/java/javaSE高级/05_Java8新特性',
          ]
        },
        {
          text: 'JavaSE补充',
          collapsible: true,
          children: [
            'base/java/补充/Retrofit2',
            'base/java/补充/rxJava/rxJava',
            'base/java/补充/lua',
            'base/java/补充/JVM',
            'base/java/补充/枚举',
            'base/java/补充/线程池',
            'base/java/补充/自定义注解'
          ]
        },
        {
          text: 'JavaWeb',
          collapsible: true,
          children: [
            'base/java/javaWeb/01_Web开发基础',
            'base/java/javaWeb/02_Servlet',
            'base/java/javaWeb/03_JSP入门_Cookie_Session',
            'base/java/javaWeb/04_JSP进阶_EL_JSTL',
            'base/java/javaWeb/05_Filter',
            'base/java/javaWeb/06_文件上传',
          ]
        },
        {
          text: '响应式编程',
          collapsible: true,
          children: [
            'base/java/响应式编程/前置知识',
            'base/java/响应式编程/Reactor',
          ]
        },
        {
          text: 'Juc',
          collapsible: true,
          children: [
            'base/java/juc/1、JUC概述',
            'base/java/juc/2、Lock接口',
            'base/java/juc/3、线程间通讯与线程间定制化通讯',
            'base/java/juc/4、集合的线程不安全问题',
            'base/java/juc/5、多线程锁',
            'base/java/juc/6、callable接口',
            'base/java/juc/7、JUC中强大的辅助类',
          ]
        },
        {
          text: '日志',
          collapsible: true,
          children: [
            'base/java/日志/1_日志简介',
            'base/java/日志/2_JUL',
            'base/java/日志/3_log4j',
            'base/java/日志/4_JCL',
            'base/java/日志/5_SLF4J',
            'base/java/日志/6_Logback',
            'base/java/日志/7_Log4j2',
            'base/java/日志/8_springboot日志实现',
          ]
        },
        {
          text: 'RxJava',
          collapsible: true,
          link: 'base/java/rxJava/rxJava',
        },
        {
          text: 'Javassist',
          collapsible: true,
          link: 'base/java/javassist/javassist',
        },
      ]
    },
    {
      text: '数据库(2)',
      collapsible: true,
      children: [
        {
          text: 'JDBC',
          collapsible: true,
          children: [
            'base/db/jdbc/01_JDBC',
            'base/db/jdbc/02_数据库连接池',
            'base/db/jdbc/03_事务',
            'base/db/jdbc/04_Commons_DbUtils'
          ]
        },
        {
          text: 'MYSQL',
          collapsible: true,
          children: [
            {
              text: '基础',
              collapsible: true,
              children: [
                'base/db/mysql/Mysql基础/01_MySQL概述',
                'base/db/mysql/Mysql基础/02_MySQL安装及配置',
                'base/db/mysql/Mysql基础/03_MySQL客户端工具',
                'base/db/mysql/Mysql基础/04_SQL概述及DDL',
                'base/db/mysql/Mysql基础/05_DML',
                'base/db/mysql/Mysql基础/06_约束',
                'base/db/mysql/Mysql基础/07_DQL',
                'base/db/mysql/Mysql基础/08_DCL',
                'base/db/mysql/Mysql基础/09_TPL',
                'base/db/mysql/Mysql基础/10_视图',
                'base/db/mysql/Mysql基础/11_常用函数',
                'base/db/mysql/Mysql基础/12_变量_存储过程_函数',
              ]
            },
            {
              text: '高级',
              collapsible: true,
              children: [
                'base/db/mysql/Mysql高级/Mysql高级篇-索引优化',
              ]
            }
          ]
        }
      ]
    },
    {
      text: '前端(2)',
      collapsible: true,
      children: [
        {
          text: '前端基础',
          collapsible: true,
          children: [
            'base/前端/前端基础/01_HTML',
            'base/前端/前端基础/02_CSS',
            'base/前端/前端基础/03_JavaScript',
            'base/前端/前端基础/04_jQuery',
            'base/前端/前端基础/05_BootStrap',
            'base/前端/前端基础/06_Ajax_JSON'
          ]
        },
        {
          text: 'Vue',
          collapsible: true,
          children: [
            'base/前端/vue/01_ECMAScript6入门',
            'base/前端/vue/02_Vue入门',
            "base/前端/vue/03_Vue进阶",
            // "base/前端/vue/04_锋迷Wiki实战项目",
            // "base/前端/vue/锋迷项目梳理",
          ]
        }
      ]
    },
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
