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
    const myChart = echarts.init(dom); // 初始化echarts实例
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
                name: 'Access From',
                type: 'pie',
                radius: ['100%', '150%'],
                center: ['60%', '85%'],
                startAngle: 180,
                endAngle: 360,
                data: [
                    { value: 1048, name: '优秀' },
                    { value: 735, name: '良好' },
                    { value: 580, name: '一般' },
                    { value: 484, name: '较差' },
                    { value: 300, name: '极差' }
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

    // 添加resize事件监听器，以便在窗口大小改变时重新渲染图表
    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
})

</script>

<style scoped></style>