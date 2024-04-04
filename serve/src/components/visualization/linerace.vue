<template>
    <div class="chart" id="myChart4" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

// 初始化流量数据和时间点数组
const trafficData = ref([]);
const timeArray = ref([]);

onMounted(() => {
    const dom = document.getElementById('myChart4');
    const myChart = echarts.init(dom);

    // 随机生成初始数据
    generateInitialData();

    // 更新数据函数
    function updateData() {
        const currentTime = new Date().getTime();
        const newTraffic = Math.floor(Math.random() * (800 - 100 + 1)) + 100;

        // 添加新的数据点
        trafficData.value.push(newTraffic);
        const time = new Date(currentTime).toISOString().substr(14, 5); // 获取时分
        timeArray.value.push(time);

        // 保持只显示最近的12个数据点
        if (trafficData.value.length > 12) {
            trafficData.value.shift();
            timeArray.value.shift();
        }

        // 动态更新图表
        const option = {
            textStyle: {
                color: "white"
            },
            xAxis: {
                data: timeArray.value,
                axisLabel: {
                    interval: 2, //加入axisLabel字段,interval后面加你想要间隔的个数
                },
                boundaryGap:false,
            },
            yAxis: {
                axisLabel: {
                    interval: 2, //加入axisLabel字段,interval后面加你想要间隔的个数
                }
            },
            series: [
                {
                    data: trafficData.value
                }
            ]
        };
        myChart.setOption(option);
    }

    // 初次渲染数据
    function generateInitialData() {
        const currentTime = new Date().getTime();
        for (let i = 11; i >= 0; i--) {
            const time = new Date(currentTime - i * 5000).toISOString().substr(14, 5);
            timeArray.value.push(time);
            const traffic = Math.floor(Math.random() * (800 - 100 + 1)) + 100;
            trafficData.value.push(traffic);
        }

        const option = {
            textStyle: {
                color: "white"
            },
            tooltip: {
                formatter: '{b} : {c}'
            },
            grid: {
                height: '80%',
                right: '5%',
                top: '10',
                bottom: '0',
            },
            xAxis: {
                type: 'category',
                data: timeArray.value,
                axisLabel: {
                    interval: 2, //加入axisLabel字段,interval后面加你想要间隔的个数
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 2, //加入axisLabel字段,interval后面加你想要间隔的个数
                }
            },
            series: [
                {
                    data: trafficData.value,
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(58,77,233,0.8)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,77,233,0.3)'
                            }
                        ])
                    },
                }
            ]
        };
        myChart.setOption(option);
    }

    // 每5秒更新数据
    setInterval(updateData, 5000);

    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
});

onBeforeUnmount(() => {
    if (myChart) {
        myChart.dispose();
    }
});
</script>

<style scoped>
/* 可以添加一些局部样式 */
</style>
