<template>
    <main>
        <h1>如何设计 UE/UX 友好的用户界面？</h1>
        <div class="grid">
            <ProjectCard v-for="item in list1" :key="item.url" v-bind="item" :in-cover="true"></ProjectCard>
        </div>

        <h1>最佳创意</h1>
        <div class="waterfall" ref="waterfall">
            <ProjectCard v-for="item in list2" :key="item.url" v-bind="item" :in-cover="true" :auto-height="true"
                @loaded="layout">
            </ProjectCard>
        </div>
    </main>
</template>

<script setup>
import ProjectCard from '@/components/project/project-card.vue'
import waterFall from '@/utils/waterfallLayout';
import { onBeforeUnmount } from 'vue';
import { nextTick } from 'vue';
import { ref, onMounted } from 'vue';
import { debounce } from '@/utils/debounce';

defineOptions({
    name: 'ue'
})
const list1 = [
    {
        title: "作为一个UX设计师我常用的6个网站",
        url: "https://zhuanlan.zhihu.com/p/359187137"
    },
    {
        title: "UI、UE和UX三者之间的区别？",
        url: "https://www.zhihu.com/question/27928975"
    },
    {
        title: "2022年13个UX/UI/UE最佳创意灵感网站",
        url: "https://cloud.tencent.com/developer/article/2098052"
    },
    {
        title: "史上最全的25个UX/UI设计灵感类网站",
        url: "https://www.mockplus.cn/blog/post/1090"
    },
    {
        title: "如何设计出优秀的用户界面：遵循五大原则",
        url: "https://zhuanlan.zhihu.com/p/657886970"
    },
    {
        title: "用户体验设计定义&详细案例",
        url: "https://zhuanlan.zhihu.com/p/377701686"
    },
    {
        title: "什么是用户界面和体验设计",
        url: "https://zhuanlan.zhihu.com/p/36813805"
    },
    {
        title: "APP开发中的UI/UX设计：如何打造用户友好的界面和流程",
        url: "https://zhuanlan.zhihu.com/p/625758012"
    },
    {
        title: "UI、UE、UX 到底有什么区别？",
        url: "https://zhuanlan.zhihu.com/p/165014751"
    }
];

const list2 = [{
    url: "https://www.zcool.com.cn/work/ZMzU3MTkxNzI=.html",
    title: "营销网站和网页UI和 UX的设计工作"
}, {
    title: "UI、UE、UX 到底有什么区别？",
    url: "https://zhuanlan.zhihu.com/p/165014751"
}, {
    url: "https://www.zcool.com.cn/work/ZNjY4MzQwNjg=.html",
    title: "Telefonica Dashboard UI/UX Design /网站后台"
}, {
    url: "https://www.zcool.com.cn/work/ZNjQ3Nzk4MzI=.html",
    title: "【网站设计】WEB3数字区块链NFT网站"
}, {
    url: "https://www.zcool.com.cn/work/ZNjIzNjY2MDQ=.html",
    title: "UX/UE/UI设计作品集-Google UX设计"
},
{
    title: "UI、UE和UX三者之间的区别？",
    url: "https://www.zhihu.com/question/27928975"
},
{
    title: "2022年13个UX/UI/UE最佳创意灵感网站",
    url: "https://cloud.tencent.com/developer/article/2098052"
},
{
    title: "史上最全的25个UX/UI设计灵感类网站",
    url: "https://www.mockplus.cn/blog/post/1090"
},
{
    title: "什么是用户界面和体验设计",
    url: "https://zhuanlan.zhihu.com/p/36813805"
},
{
    title: "APP开发中的UI/UX设计：如何打造用户友好的界面和流程",
    url: "https://zhuanlan.zhihu.com/p/625758012"
},
{
    title: "UI、UE、UX 到底有什么区别？",
    url: "https://zhuanlan.zhihu.com/p/165014751"
}]

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
        grid-gap: 16px;

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