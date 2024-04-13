<template>
    <div class="chart" id="myChart11" style="height: 100%; width: 100%;">
    </div>
</template>

<script setup>
import { getRandom } from '@/utils';
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
    const dom = document.getElementById('myChart11');
    const myChart = echarts.init(dom); // Initialize echarts instance
    const option = {
        tooltip: {
            trigger: 'item',
            // formatter: '{b}: {d}%' // 修改tooltip的formatter，显示具体数值和比例
        },
        legend: {
            align: 'right',
            orient: 'vertical',
            left: '10',
            y: 'center',
            icon: 'circle'
        },
        series: [
            {
                padAngle: 5,
                type: 'pie',
                radius: ['100%', '160%'],
                center: ['60%', '90%'],
                startAngle: 180,
                endAngle: 360,
                data: [
                    { value: getRandom(1800, 2400), name: '优秀', itemStyle: { color:"#91CC75" } },
                    { value: getRandom(500, 800), name: '良好', itemStyle: { color:"#6F89CF" } },
                    { value: getRandom(300, 800), name: '一般', itemStyle: { color:"#FAC858" } },
                    { value: getRandom(200, 400), name: '较差', itemStyle: { color:"#FFAC00" } },
                    { value: getRandom(200, 400), name: '极差', itemStyle: { color:"#EE6666" } }
                ],
                itemStyle: {
                    borderRadius: 6
                },
                label:{
                    show:false
                }
            }
        ]
    };
    myChart.setOption(option);

    // Add resize event listener to re-render the chart when window size changes
    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
})

</script>

<style scoped></style>
