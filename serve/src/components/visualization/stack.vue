<template>
    <div class="chart" id="myChart7" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
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
        title: {
            text: '用户访问量', // 设置标题为用户访问量
            left: 'center',
            top: '2.5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            bottom: '0'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dateList
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'pc',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'mobile',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
        ]
    };
    myChart.setOption(option);
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