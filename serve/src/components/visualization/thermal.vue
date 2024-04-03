<template>
    <div class="chart" id="myChart3" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, defineProps } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
const prop = defineProps({
    thermaldata: Array
})
// prettier-ignore
const prob = [
    'prob1', 'prob2', 'prob3', 'prob4', 'prob5', 'prob6'
];
// prettier-ignore
const score = [
    '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'
];
// prettier-ignore
const data = prop.thermaldata.map(function (item) { return [item[1], item[0], item[2] || '-']; });
onMounted(() => {
    const dom = document.getElementById('myChart3');
    const myChart = echarts.init(dom); // 初始化echarts实例
    const option = {
        tooltip: {
            position: 'top'
        },
        grid: {
            right: '2%',
            height: '62%',
            top: '8%'
        },
        xAxis: {
            type: 'category',
            data: prob,
            splitArea: {
                show: true
            },
            offset: 5
        },
        yAxis: {
            type: 'category',
            data: score,
            splitArea: {
                show: true
            },
            offset: 5

        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '2%'
        },
        series: [
            {
                name: 'Punch Card',
                type: 'heatmap',
                data: data,
                label: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
})
</script>

<style scoped></style>