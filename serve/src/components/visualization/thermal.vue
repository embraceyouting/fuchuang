<template>
    <div class="chart" id="myChart3" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, defineProps, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
const prop = defineProps({
    thermaldata: Array
})
function getVirtualData() {
    const today = new Date();
    const data = [];
    for (let i = 0; i < 200; i++) { // Changed to 150 days
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        data.push([
            date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data.reverse(); // Reverse the array to display in ascending order
}
const data = getVirtualData();
let myChart; // Declare myChart variable outside of the setup function
onMounted(() => {
    const dom = document.getElementById('myChart3');
    myChart = echarts.init(dom); // Initialize echarts instance
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item'
        },
        calendar: [
            {
                left: 'center',
                top: '45',
                range: [new Date(new Date().getTime() - 200 * 3600 * 24 * 1000), new Date()],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'transparent',
                        width: 2,
                        type: 'solid'
                    }
                },
                yearLabel: {
                    show: false,
                },
                itemStyle: {
                    color: 'transparent',
                    borderWidth: 5,
                    borderColor: 'transparent',
                    margin: ['5px', '5px'],
                },
                cellSize: ['21', '21'],
                dayLabel: {
                    show: false
                },
                monthLabel: {
                    show: false
                }
            }
        ],
        visualMap: {
            min: 0,
            max: 10000,
            color: ["#6681cc", "#c7dbee"],
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            bottom: "55"
        },
        series: [
            {
                name: 'PageView',
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: data,
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                itemStyle: {
                    color: '#ddb926',
                    borderRadius: 5,
                }
            },

            // {
            //     name: 'Steps',
            //     type: 'scatter',
            //     coordinateSystem: 'calendar',
            //     calendarIndex: 1,
            //     data: data,
            //     symbolSize: function (val) {
            //         return val[1] / 500;
            //     },
            //     itemStyle: {
            //         color: '#fff',
            //         borderRadius: 5,
            //     }
            // },

            {
                name: 'Top 12',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data
                    .sort(function (a, b) {
                        return b[1] - a[1];
                    })
                    .slice(0, 12),
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                itemStyle: {
                    color: 'blue',
                    shadowBlur: 10,
                    shadowColor: '#fff'
                },
                zlevel: 1
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

onBeforeUnmount(() => {
    if (myChart) {
        myChart.dispose();
    }
});
</script>

<style scoped></style>
