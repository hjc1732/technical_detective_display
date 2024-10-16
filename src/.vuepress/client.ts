import { defineClientConfig } from "vuepress/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import  LockArticle  from "./components/LockArticle.vue";


export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        // app.component("LockArticle", LockArticle);

        // 注册路由守卫
        router.afterEach((to) => {
            //上报
            // report();
        });
    },
    setup: () => {
        setupTransparentNavbar({ type: "homepage" });
        //下雪效果
        // setupSnowFall();
        //获取站点运行时间
        // setupRunningTimeFooter(
        //     new Date("2024-10-15"),
        //     {
        //         "/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
        //         "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
        //     },
        //     true,
        // );
    },
});

//上报访客信息
const report = () =>{
    fetch('https://bj.hjcwzx.top/api/report',{
        method:'POST'
    }).catch(err=>{})
}
