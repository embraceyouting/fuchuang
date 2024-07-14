<template>
    <main>
        <el-carousel v-if="list[0]?.articles?.length" :interval="4000" type="card" motion-blur :height="isMobile ? '240px' : '300px'" class="carousel" loop>
            <el-carousel-item v-for="item in list[0].articles" :key="item.url">
                <ProjectCard :height="isMobile ? '240px' : '300px'" :url="item.url" in-cover is-cover-click></ProjectCard>
            </el-carousel-item>
        </el-carousel>

        <h1>{{ list[1]?.title }}</h1>
        <div class="grid" v-if="list[1]?.articles?.length">
            <ProjectCard v-for="item in list[1].articles" :key="item.url" v-bind="item" in-cover is-mask></ProjectCard>
        </div>

        <h1>{{ list[2]?.title }}</h1>
        <div class="waterfall" ref="waterfall" v-if="list[2]?.articles?.length">
            <ProjectCard v-for="item in list[2].articles.slice(0, end)" :key="item.url" v-bind="item" in-cover auto-height
                @loaded="layout" is-mask is-enter>
            </ProjectCard>
        </div>

        <DataStatus @more="getMore" :isDataEnd :length="list[2]?.articles?.length"></DataStatus>
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
import { useMobileStore } from '@/store/mobile';
import { storeToRefs } from 'pinia';
import service from '@/service';

const { isMobile } = storeToRefs(useMobileStore())

defineOptions({
    name: 'ue'
})

const list = ref([])

service.get("/article").then((res) => {
    list.value = res.data
})

const end = ref(5)
function getMore() {
    end.value += 5
}

const isDataEnd = computed(() => end.value >= list.value[2]?.articles?.length)

const waterfall = ref(null)

function layout() {
    nextTick(() => {
        waterFall(waterfall.value, isMobile ? 2 : 3, 20);
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

        .el-carousel {
            :deep(.el-carousel-container) {
                .el-carousel__item {
                    width: 75%;
                }
            }
        }
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

    .waterfall {

        .list-enter-active,
        .list-leave-active {
            transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .list-enter-from,
        .list-leave-to {
            opacity: 0;
            transform: scale(0.1);
        }

    }

    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 24px;

        .el-carousel {
            margin: 12px 0;

            :deep(.el-carousel__container) {
                .el-carousel__item {
                    &.is-active {
                        width: 80% !important;
                        left: -15%;
                    }
                }
            }

            :deep(.el-carousel__indicators) {
                width: 100%;
                text-align: center;
            }
        }

        .grid {
            grid-template-columns: repeat(2, 1fr);

            .card {
                &:nth-child(2) {
                    grid-area: 1/2/2/3;
                }

                &:nth-child(3) {
                    grid-area: 2/1/3/3;
                }

                &:nth-child(6) {
                    grid-area: 4/1/6/3;
                }

                &:nth-child(7) {
                    grid-area: 7/1/8/3;
                }
            }
        }
    }
}
</style>