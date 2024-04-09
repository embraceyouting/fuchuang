<template>
    <div class="chart" id="myChart2" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount, computed, watch  } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
const { $t } = getCurrentInstance().proxy
const datalist = computed(()=>{
    return[
        { value: 45, name: $t("nightgale.value1") },
        { value: 38, name: $t("nightgale.value2") },
        { value: 32, name: $t("nightgale.value3") },
        { value: 30, name: $t("nightgale.value4") },
        { value: 25, name: $t("nightgale.value5") },
        { value: 16, name: $t("nightgale.value6") },
        { value: 16, name: $t("nightgale.value7") },
        { value: 16, name: $t("nightgale.value8") },
    ]
})
onMounted(() => {
    const dom = document.getElementById('myChart2');
    const myChart = echarts.init(dom);
    const option = {
        legend: {
            bottom: "1.8%"
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
            }
        },
        series: [{
            name: 'Nightingale Chart',
            type: 'pie',
            radius: ["10%", "55%"],
            center: ['50%', '42%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: datalist.value, // 记得在使用计算属性时要使用 .value
            label: {
                show: true,
                position: 'outer',
                alignTo: "edge",
                edgeDistance: 0,
                overflow: 'breakAll'
            }
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        setTimeout(() => {
            myChart.resize();
        }, 10);
    });
    // 监听datalist的变化，并重新渲染图表
    watch(datalist, (newVal, oldVal) => {
        myChart.setOption({
            series: [{
                data: newVal
            }]
        });
    });
});

</script>

<style scoped>
/* 可以添加一些局部样式 */
</style>
