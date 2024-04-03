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
function getVirtualData() {
    const today = new Date();
    const data = [];
    for (let i = 0; i < 150; i++) { // Changed to 150 days
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        data.push([
            date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data.reverse(); // Reverse the array to display in ascending order
}
const data = getVirtualData();
onMounted(() => {
    const dom = document.getElementById('myChart3');
    const myChart = echarts.init(dom); // Initialize echarts instance
    const option = {
        backgroundColor: 'transparent',
        title: {
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '1%',
            left: 'center',
            data: ['Steps', 'Top 12'],
            textStyle: {
                color: '#fff'
            }
        },
        calendar: [
            {
                orient: 'vertical',
                left: 'center',
                range: [new Date(new Date().getTime() - 150 * 3600 * 24 * 1000), new Date()],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                yearLabel: {
                    show:false
                },
                itemStyle: {
                    color: '#323c48',
                    borderWidth: 1,
                    borderColor: '#111'
                }
            }
        ],
        series: [
            {
                name: 'Steps',
                type: 'scatter',
                coordinateSystem: 'calendar',
                data: data,
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                itemStyle: {
                    color: '#ddb926'
                }
            },
            {
                name: 'Steps',
                type: 'scatter',
                coordinateSystem: 'calendar',
                calendarIndex: 1,
                data: data,
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                itemStyle: {
                    color: '#ddb926'
                }
            },
            {
                name: 'Top 12',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                calendarIndex: 1,
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
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
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
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
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
</script>

<style scoped></style>
