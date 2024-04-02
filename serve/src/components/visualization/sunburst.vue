<template>
    <div class="chart" id="myChart5" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
var data = [
    {
        name: 'Grandpa',
        children: [
            {
                name: 'Uncle Leo',
                value: 15,
                children: [
                    {
                        name: 'Cousin Jack',
                        value: 2
                    },
                    {
                        name: 'Cousin Mary',
                        value: 5,
                        children: [
                            {
                                name: 'Jackson',
                                value: 2
                            }
                        ]
                    },
                    {
                        name: 'Cousin Ben',
                        value: 4
                    }
                ]
            },
            {
                name: 'Father',
                value: 10,
                children: [
                    {
                        name: 'Me',
                        value: 5
                    },
                    {
                        name: 'Brother Peter',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        name: 'Nancy',
        children: [
            {
                name: 'Uncle Nike',
                children: [
                    {
                        name: 'Cousin Betty',
                        value: 1
                    },
                    {
                        name: 'Cousin Jenny',
                        value: 2
                    }
                ]
            }
        ]
    }
];
onMounted(() => {
    const dom = document.getElementById('myChart5');
    const myChart = echarts.init(dom); // 初始化echarts实例
    const option = {
        series: {
            type: 'sunburst',
            data: data,
            radius: ['20%', '90%'],
            itemStyle: {
                borderRadius: 7,
                borderWidth: 1
            },
            label: {
                show: false,
            },
            tooltip: {
                formatter: '{c}'
            }
        }
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
