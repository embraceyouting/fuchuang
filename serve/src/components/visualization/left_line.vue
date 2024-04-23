<template>
    <div class="chart" id="myChart12" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
const { $t } = getCurrentInstance().proxy
// 初始化流量数据和时间点数组
const trafficData = ref([]);
const trafficData2 = ref([]);
const today = new Date();
let timeArray = [];
for (let i = 0; i < 6; i++) {
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    const formattedDate = `${previousDate.getMonth() + 1}-${previousDate.getDate()}`;
    timeArray.unshift(formattedDate); // 使用unshift方法将日期添加到数组的开头
}
onMounted(() => {
    const dom = document.getElementById('myChart12');
    const myChart = echarts.init(dom);
    trafficData.value = [23, 24, 26, 22, 19, 13]
    trafficData2.value = [15, 33, 17, 28, 15, 19]
    generateInitialData()
    function generateInitialData() {
        const option = {
            textStyle: {
                color: "white"
            },
            tooltip: {
                formatter: function (params) {
                    return `<b>${$t('visual.line.date')}</b>&emsp;${params.name}<br/><i style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params.color};"></i><b>${params.seriesName}</b>&emsp;${params.value}%`
                }
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
                data: timeArray,
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: 'white',
                    }
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
                    name: $t('visual.line.bounce_rate'),
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
                    name: $t('visual.line.exit_rate'),
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
