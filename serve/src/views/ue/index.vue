<template>
    <main>
        <el-carousel :interval="4000" type="card" motion-blur height="300px" class="carousel" loop>
            <el-carousel-item v-for="item in list2.slice(0, 5)" :key="item.url">
                <ProjectCard height="300px" :url="item.url" in-cover is-cover-click></ProjectCard>
            </el-carousel-item>
        </el-carousel>

        <h1>如何设计 UE/UX 友好的用户界面？</h1>
        <div class="grid">
            <ProjectCard v-for="item in list1" :key="item.url" v-bind="item" in-cover is-mask></ProjectCard>
        </div>

        <h1>最佳创意</h1>
        <div class="waterfall" ref="waterfall">
            <ProjectCard v-for="item in list2.slice(0, end)" :key="item.url" v-bind="item" in-cover auto-height
                @loaded="layout" is-mask>
            </ProjectCard>
        </div>

        <DataStatus @more="getMore" :isDataEnd :length="list2.length"></DataStatus>
    </main>
</template>

<script setup>
import ProjectCard from '@/components/project/project-card.vue'
import DataStatus from '@/components/data-status/DataStatus.vue'
import waterFall from '@/utils/waterfallLayout';
import { onBeforeUnmount } from 'vue';
import { nextTick } from 'vue';
import { ref, onMounted } from 'vue';
import { debounce } from '@/utils/debounce';
import { computed } from 'vue';
import { ElCarousel } from 'element-plus';

defineOptions({
    name: 'ue'
})

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
].sort(() => Math.random() - 0.5);

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
        url: "https://www.zcool.com.cn/work/ZNjIzNjY2MDQ=.html",
        title: "UX/UE/UI设计作品集-Google UX设计"
    },
    {
        title: "ofo小黄车是如何打造情感化设计的？",
        url: "https://www.zcool.com.cn/work/ZMjYzNjc5MzY=.html"
    },
].sort(() => Math.random() - 0.5);

const end = ref(5)
function getMore() {
    end.value += 5
}

const isDataEnd = computed(() => end.value >= list2.length)

const waterfall = ref(null)

function layout() {
    nextTick(() => {
        waterFall(waterfall.value, 3, 20);
    })
}

const debouncedLayout = debounce(layout, 100)

onMounted(() => {
    window.addEventListener('resize', debouncedLayout)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedLayout)
})
</script>

<style lang="scss" scoped>
main {
    width: 80%;
    max-width: 928px;
    margin: auto;
    color: $white;

    .carousel {
        margin: 36px 0;
    }

    h1 {
        font-style: normal;
        margin: 36px 0 24px;
        font-family: "Paytone One", "PingFangSC", sans-serif;
        background: linear-gradient(45deg, #ffffff, #7285ff 50%, #c7a7ff 80%);
        background-size: 200%;
        background-clip: text;
        color: transparent;
        width: fit-content;
        animation: gradient 15s ease infinite;

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;

        .card {

            :deep(.cover) {
                min-height: 100%;
            }

            &:nth-child(2) {
                grid-area: 1/2/2/4;
            }

            &:nth-child(3) {
                grid-area: 2/1/4/3;
            }

            &:nth-child(6) {
                grid-area: 4/1/5/3;
            }

            &:nth-child(7) {
                grid-area: 4/3/6/4;
            }
        }
    }
}
</style>