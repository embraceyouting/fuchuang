<template>
    <div class="chart" id="myChart12" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

// 初始化流量数据和时间点数组
const trafficData = ref([]);
const trafficData2 = ref([]);
const timeArray = ref([]);

onMounted(() => {
    const dom = document.getElementById('myChart12');
    const myChart = echarts.init(dom);
    timeArray.value = ['3-29', '3-30', '3-31', '4-1', '4-2', '4-3'];
    trafficData.value = [230, 240, 260, 220, 190, 130]
    trafficData2.value = [150, 330, 170, 280, 150, 190]
    generateInitialData()
    function generateInitialData() {
        const option = {
            textStyle: {
                color: "white"
            },
            tooltip: {
                formatter: '{b} : {c}'
            },
            legend: {
                left: '0',
                top: '10'
            },
            grid: {
                height: '70%',
                right: '5%',
                top: '22%',
                bottom: '5%',
            },
            xAxis: {
                type: 'category',
                data: timeArray.value,
                boundaryGap: false,
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
                    name: '跳出率',
                    stack: "line",
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#3C5BF3'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,77,233,0)'
                            }
                        ])
                    },
                    itemStyle: {
                        color: '#3C5BF3'
                    }
                },
                {
                    data: trafficData2.value,
                    name: '退出率',
                    type: 'line',
                    stack: "line",
                    smooth: true,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#FF573A'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 255,0)'
                            }
                        ])
                    },
                    itemStyle: {
                        color: '#FF573A'
                    }
                }
            ]
        };
        myChart.setOption(option);
    }

    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
});

</script>

<style scoped>
/* 可以添加一些局部样式 */
</style>
