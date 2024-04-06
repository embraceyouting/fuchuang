<template>
    <div class="chart" id="myChart11" style="height: 100%; width: 100%;">
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
    const dom = document.getElementById('myChart11');
    const myChart = echarts.init(dom); // Initialize echarts instance
    const option = {
        tooltip: {
            trigger: 'item'
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
                    { value: 1048, name: '优秀', itemStyle: { color:"#91CC75" } },
                    { value: 735, name: '良好', itemStyle: { color:"#8AA2D9" } },
                    { value: 580, name: '一般', itemStyle: { color:"#6F89CF" } },
                    { value: 484, name: '较差', itemStyle: { color:"#FAC858" } },
                    { value: 300, name: '极差', itemStyle: { color:"#EE6666" } }
                ],
                itemStyle: {
                    borderRadius: 6
                },
                label: {
                    show: false
                },
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
