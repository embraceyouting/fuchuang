<template>
    <div class="chart" id="myChart6" style="height: 100%; width: 100%;">
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
    const dom = document.getElementById('myChart6');
    const myChart = echarts.init(dom); // 初始化echarts实例
    const option = {
        title: {
            text: '用户分布',
            left: 'center',
            top: '2.5%'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0'
        },
        textStyle: {
            color: 'white',
            fontweight: 'bold',
        },
        series: [
            {
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                data: [
                    { value: 1048, name: '北方' },
                    { value: 735, name: '港澳台' },
                    { value: 580, name: '南方' },
                    { value: 484, name: '国外' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    overflow: 'breakAll',
                    color: 'black'
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