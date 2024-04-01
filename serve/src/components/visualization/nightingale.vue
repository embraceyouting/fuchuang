<template>
    <div class="chart" id="myChart2" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    const dom = document.getElementById('myChart2');
    const myChart = echarts.init(dom);
    const option = {
        legend: {
            bottom: 20
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
            radius: ["10%", "60%"],
            center: ['50%', '42%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 45, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 25, name: 'rose 5' },
                { value: 16, name: 'rose 6' },
            ],
            label: {
                show: true,
                // position: 'outer',
                // alignTo: "edge",
                edgeDistance : 0,
                overflow: 'breakAll'
            }
        }]
    };
    myChart.setOption(option);
});
</script>

<style scoped>
/* 可以添加一些局部样式 */
</style>