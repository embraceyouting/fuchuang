const express = require("express");
const router = express.Router();
const { createMessage } = require("../utils/message");

const list1 = [
    {
        url: "https://www.interaction-design.org/literature/article/ux-design-tools-definitive-guide",
        title: "The Top UX and UI Design Tools for 2024: A Comprehensive Guide"
    },
    {
        url: "https://www.zcool.com.cn/article/ZMTE2ODIwNA==.html",
        title: "交互设计定律和用户体验地图"
    },
    {
        url: "https://www.zcool.com.cn/article/ZOTc1MTA0.html",
        title: "如何通过设计提升banner点击率？"
    },
    {
        url: "https://www.uisdc.com/zt/ux-coffee-interview",
        title: "UX Coffee 专访 《谷歌设计师给你带来不一样的设计专访》"
    },
    {
        title: "用户体验设计定义&详细案例",
        url: "https://zhuanlan.zhihu.com/p/377701686"
    },
    {
        url: "https://www.zcool.com.cn/article/ZMTczNDY0.html",
        title: "交互设计技巧——创造好的用户体验"
    },
    {
        url: "https://www.uisdc.com/talk/121207532369.html",
        title: "UI 设计和 UX 有什么区别啊？"
    },
    {
        url: "https://www.uisdc.com/ux-basic-knowledge",
        title: "UX基础系列：写给设计师的竞品分析指南"
    },
    {
        title: "UI视觉设计与UX交互设计的区别",
        url: "https://www.zcool.com.cn/article/ZODg0MzA4.html"
    },
    {
        url: "https://www.uisdc.com/b-end-project-analysis",
        title: "B端作品集中如何做有效的项目分析？"
    }
];

const list2 = [
    {
        url: "https://www.zcool.com.cn/work/ZNjczMTQ2ODA=.html",
        title: "百度网盘「设计语言12.0升级」项目总结"
    },
    {
        url: "https://www.uisdc.com/tob-design-14",
        title: "用一个真实案例，演示B端设计框架的价值"
    },
    {
        title: "UE/UX作品合集（2020~2022）",
        url: "https://www.zcool.com.cn/work/ZNjU5MDI0MjA=.html"
    },
    {
        url: "https://www.uisdc.com/10-ui-ux-design-16",
        title: "10个产品细节剖析，看看高手是如何做设计的！"
    },
    {
        url: "https://www.uisdc.com/dingding-vision-pro-design",
        title: "钉钉 Vision Pro 版设计实践"
    },
    {
        url: "https://www.zcool.com.cn/work/ZNjUxOTg5NzY=.html",
        title: "2023年B端作品集"
    },
    {
        url: "https://www.zcool.com.cn/work/ZNDIyMTMzMjQ=.html",
        title: "2019 界面设计合集"
    },
    {
        url: "https://www.zcool.com.cn/work/ZNDQ1MzAwNTY=.html",
        title: "「WISESHOT」v3.0改版总结-证件照制作App"
    },
    {
        url: "https://www.zcool.com.cn/work/ZMzU3MTkxNzI=.html",
        title: "营销网站和网页UI和 UX的设计工作"
    },
    {
        url: "https://www.zcool.com.cn/work/ZNjY4MzQwNjg=.html",
        title: "Telefonica Dashboard UI/UX Design /网站后台"
    },
    {
        url: "https://www.zcool.com.cn/work/ZNjQ3Nzk4MzI=.html",
        title: "【网站设计】WEB3数字区块链NFT网站"
    },
    {
        title: "ofo小黄车是如何打造情感化设计的？",
        url: "https://www.zcool.com.cn/work/ZMjYzNjc5MzY=.html"
    },
];

router.get('/', (req, res) => {
    res.send(createMessage(200, "获取文章成功", [
        {
            title: "推荐文章",
            articles: [...list1, ...list2].sort(() => Math.random() - 0.5).slice(0, 5)
        },
        {
            title: "如何设计 UE/UX 友好的用户界面？",
            articles: list1.sort(() => Math.random() - 0.5).slice(0, -3)
        },
        {
            title: "最佳创意",
            articles: list2.sort(() => Math.random() - 0.5).slice(0, -3)
        }
    ]));
});

module.exports = router;