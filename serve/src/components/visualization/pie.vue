<template>
    <div class="chart" id="myChart6" style="height: 100%; width: 100%;">
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
    const dom = document.getElementById('myChart6');
    const myChart = echarts.init(dom); // 初始化echarts实例
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            align: 'left',
            orient: 'vertical',
            right: 0,
            icon: 'circle',
            y: 'center',
            type: 'scroll',
            x: 'right',
            bottom: 10,
            data: (function () {
                var list = [];
                for (var i = 1; i <= 5; i++) {
                    list.push(i + 2019 + '');
                }
                return list;
            })()
        },
        radar: {
            radius: ["0%", "70%"],
            center: ["36%", "54%"],
            indicator: [
                { text: 'IE8-', max: 200 },
                { text: 'IE9+', max: 200 },
                { text: 'Safari', max: 200 },
                { text: 'Firefox', max: 200 },
                { text: 'Chrome', max: 200 }
            ]
        },
        textStyle: {
            color: 'white'
        },
        series: (function () {
            var series = [];
            for (var i = 1; i <= 5; i++) {
                series.push({
                    type: 'radar',
                    symbol: 'none',
                    lineStyle: {
                        width: 2
                    },
                    emphasis: {
                        areaStyle: {
                            color: '#b0e5e1'
                        }
                    },
                    data: [
                        {
                            value: [
                                (10 - i) * 20,
                                (10 - i) * 4 + 60,
                                i * 20 + 10,
                                i * 30,
                                (i * 40) / 2
                            ],
                            name: i + 2019 + ''
                        }
                    ]
                });
            }
            return series;
        })()
    };
    myChart.setOption(option);

    // 添加resize事件监听器，以便在窗口大小改变时重新渲染图表
    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
})

onBeforeUnmount(() => {
    if (myChart) {
        myChart.dispose();
    }
});
</script>

<style scoped></style>