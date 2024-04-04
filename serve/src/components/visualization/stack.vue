<template>
    <div class="chart" id="myChart7" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    setTimeout(() => {
        const dom = document.getElementById('myChart7');
        const myChart = echarts.init(dom);
        const today = new Date();
        const dateList = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            if (i === 0) {
                dateList.push('今天');
            } else {
                date.setDate(today.getDate() - i);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const formattedDate = `${month}-${day}`;
                dateList.push(formattedDate);
            }
        }
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                top: '20',
                containLabel: true
            },
            xAxis: {
                max: '30000',
                position: 'top',
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                },
                interval: 10000, //加入axisLabel字段,interval后面加你想要间隔的个数
            },
            yAxis: {
                type: 'category',
                data: ['巴西', '英国', '美国', '印度', '中国', '日本'],
                axisLine: {
                    lineStyle: {
                        color: 'white',
                    }
                }
            },
            textStyle: {
                color: 'white',
            },
            series: [
                {
                    name: 'mobile',
                    type: 'bar',
                    data: [18000, 23000, 29000, 4000, 30000],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {
                                offset: 0,
                                color: 'rgba(58,77,233,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,77,233,0.2)'
                            }
                        ])
                    },
                    barCategoryGap: "40%"
                },
                {
                    name: 'pc',
                    type: 'bar',
                    data: [18000, 23000, 29000, 4000, 30000],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {
                                offset: 0,
                                color: '#91cc75'
                            },
                            {
                                offset: 1,
                                color: '#91cc7566'
                            }
                        ])
                    },
                    barCategoryGap: "40%"
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', () => {
            setTimeout(() => {
                myChart.resize();
            }, 10);
        });
    }, 10);
});
</script>

<style scoped>
/* 可以添加一些局部样式 */
</style>