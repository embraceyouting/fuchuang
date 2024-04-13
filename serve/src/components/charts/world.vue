<template>
    <div class="world" ref="world">
        <div ref="chart" class="chart"></div>
        <div class="title">
            <span>网站服务器来源</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;&nbsp;访问来源</span>
        </div>
        <div class="desc top">
            <Bar></Bar>
        </div>
        <div class="icon">
            WebSite & BigData
            <div class="fullscreen">
                <el-icon :size="32" @click="fullscreen" color="white">
                    <FullScreen v-if="!isFullScreen" />
                    <Close v-else />
                </el-icon>
                <div class="text">
                    <span>
                        {{ isFullScreen ? 'Exit' : 'Enter' }} </span>
                    <span>Full Screen</span>
                </div>
            </div>
        </div>
        <div class="desc bottom">
            数据展示了监控网站的全球服务器分布及请求来源。数据基于大数据、数据集推理得出，反映了最新的网站流量预测情况。
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import WorldImage from './image/world.jpg';
import StarImage from './image/star.jpg';
import RoutesJson from './data/routes.json';
import Bar from './bar.vue';
import 'echarts-gl';
import { debounce } from '@/utils/debounce';
import { ElIcon } from 'element-plus';
import { FullScreen, Close } from '@element-plus/icons-vue';

const chart = ref(null);
const world = ref(null);
const isFullScreen = ref(!!document.fullscreenElement);
let myChart = null;

function getAirportCoord(idx) {
    return [RoutesJson.airports[idx][3], RoutesJson.airports[idx][4]];
}

const routes = RoutesJson.routes.map((airline) => {
    return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
});

const option = {
    backgroundColor: '#0000',
    globe: {
        baseTexture: WorldImage,
        heightTexture: WorldImage,
        displacementScale: 0.04,
        shading: 'realistic',
        environment: StarImage,
        realisticMaterial: {
            roughness: 0.9
        },
        postEffect: {
            enable: true
        },
        viewControl: {
            autoRotate: true,
            autoRotateSpeed: 3,
            distance: 200
        },
        light: {
            main: {
                intensity: 5,
                shadow: true
            },
            ambientCubemap: {
                exposure: 2,
                diffuseIntensity: 2,
                specularIntensity: 2
            }
        }
    },
    series: {
        type: 'lines3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.15,
            trailOpacity: 1,
            trailColor: 'rgb(30, 30, 60)'
        },
        lineStyle: {
            width: 1,
            color: 'rgb(50, 50, 150)',
            opacity: 0.1
        },
        data: routes
    }
};

function handleResize(myChart) {
    myChart.resize()
}

onMounted(() => {
    const chartDom = chart.value
    myChart = echarts.init(chartDom)
    option && myChart.setOption(option);
    const resizeFn = debounce(() => handleResize(myChart), 100)
    window.addEventListener('resize', resizeFn)

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeFn)
    })
})

function fullscreen() {
    if (!isFullScreen.value) {
        world.value?.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
    isFullScreen.value = !isFullScreen.value
}
</script>

<style scoped lang="scss">
.world {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    .chart {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .title {
        position: absolute;
        left: 10%;
        top: 10%;
        color: white;
        font-size: 3vmin;
        writing-mode: vertical-lr;
        z-index: 9;
        display: flex;
        flex-direction: column;

        &::after {
            content: "";
            position: absolute;
            height: 90%;
            width: 100%;
            top: 20%;
            left: 20%;
            background-color: $dark-color-transparent;
            z-index: -1;
        }
    }

    .desc {
        position: absolute;
        color: white;
        font-size: 16px;
        z-index: 9;

        &::before {
            content: "";
            position: absolute;
            height: 100%;
            width: 100%;
            background-color: $dark-color-transparent;
            z-index: -1;
            left: 10%;
            top: 10%;
        }

        &.top {
            top: 10%;
            right: 2%;
            height: 400px;
            max-height: 50%;
            width: 400px;

            &::before {
                display: none;
            }
        }

        &.bottom {
            bottom: 10%;
            right: 5%;
            max-width: 280px;
        }
    }

    .icon {
        position: absolute;
        height: 100px;
        width: 100px;
        left: 10%;
        bottom: 10%;
        z-index: 9;
        font-size: 20px;
        color: white;
        font-family: "Paytone One", "PingFangSC", sans-serif;
        font-weight: 200;

        .fullscreen {
            margin-top: 12px;
            display: flex;

            .el-icon{
                cursor: pointer;
                
                svg{
                    color: white;
                }
            }

            .text {
                display: flex;
                flex-direction: column;
                margin-left: 8px;
                font-size: 14px;
                line-height: 1.2;
                width: fit-content;

                span {
                    white-space: nowrap;
                    font-family: "Paytone One", "PingFangSC", sans-serif;
                }
            }
        }
    }
}
</style>