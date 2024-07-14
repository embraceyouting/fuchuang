<template>
    <div class="chart" id="myChart3" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, defineProps, onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
const { $t } = getCurrentInstance().proxy
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
const date = new Date();
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
                top: '50',
                range: [new Date(new Date().getTime() - (200 - new Date().getDay() + 1) * 3600 * 24 * 1000), new Date()],
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
                    show: true,
                    firstDay: 1,
                    nameMap: [$t('visual.day.sun'), $t('visual.day.mon'), $t('visual.day.tue'), $t('visual.day.wed'), $t('visual.day.thu'), $t('visual.day.fri'), $t('visual.day.sat')],
                    margin: 5
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
            bottom: "6%"
        },
        series: [
            {
                name: '每日访问量',
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: data,
                tooltip: {
                    formatter: function (params) {
                        return '<i style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params.color + ';"></i>' + `<b>${$t('visual.day.date')}</b>&emsp;&emsp;` + params.value[0] + '<br/>' + '<i style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params.color + ';"></i>' + `<b>${$t('visual.day.views')}</b>&emsp;` + params.value[1];
                    }
                },
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                itemStyle: {
                    color: '#ddb926',
                    borderRadius: 5,
                }
            },
            {
                name: 'Top 12',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                tooltip: {
                    formatter: function (params) {
                        return `<b>Top 12</b><br/>${params.marker}<b>${$t('visual.day.date')}</b>&emsp;&emsp;${params.data[0]} <br/>${params.marker}<b>${$t('visual.day.views')}</b>&emsp; ${params.data[1]}`
                    }
                },
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


</script>

<style scoped></style>
