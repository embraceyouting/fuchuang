<template>
    <div class="chart" id="myChart2" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    const dom = document.getElementById('myChart2');
    const myChart = echarts.init(dom);
    const option = {
        legend: {
            bottom: "1.8%"
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
            }
        },
        series: [{
            name: 'Nightingale Chart',
            type: 'pie',
            radius: ["10%", "65%"],
            center: ['50%', '42%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 45, name: '无响应' },
                { value: 38, name: '高跳出率' },
                { value: 32, name: '重复点击' },
                { value: 30, name: '页面加载慢' },
                { value: 25, name: '网络反馈慢' },
                { value: 16, name: '点击错误' },
                { value: 16, name: '加载错误' },
                { value: 16, name: '白屏' },
            ],
            label: {
                show: true,
                // position: 'outer',
                // alignTo: "edge",
                edgeDistance: 0,
                overflow: 'breakAll'
            }
        }]
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