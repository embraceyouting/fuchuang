<template>
    <div class="chart" id="myChart4" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    const dom = document.getElementById('myChart4');
    const myChart = echarts.init(dom);
    const option = {
        tooltip: {
            formatter: '{b} : {c}'
        },
        grid: {
            left: '14%',
            height: '70%',
            top: '15%',
            right: '5%'
        },
        xAxis: {
            type: 'category',
            data: ['无响应', '高跳出率', '重复点击', '页面加载慢', '网络慢', '点击错误', '加载错误','白屏']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320,1460],
                type: 'line',
                smooth: true
            }
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