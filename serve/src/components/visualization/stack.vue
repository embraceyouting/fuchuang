<template>
    <div class="chart" id="myChart7" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getRandom } from '@/utils';
import { getCurrentInstance, onMounted, onBeforeUnmount , ref } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
// 初始化数组
const regions = ref(["浙江", "江苏", "湖南", "湖北", "广东", "广西", "贵州", "云南", "陕西", "山西", "山东", "河南", "河北", "福建", "辽宁", "吉林", "新疆", "青海", "甘肃", "四川", "重庆", "宁夏", "西藏", "安徽", "北京", "天津", "上海", "江西", "海南", "香港", "澳门", "台湾"]);
const mobile = ref(Array.from({ length: regions.value.length }, () => getRandom(1000, 2000)));
const pc = ref(Array.from({ length: regions.value.length }, () => getRandom(1000, 2000)));
// 每次拿6个元素
const batchSize = 6;
// 当前索引
let currentIndexRegions = 0;
let currentIndexMobile = 0;
let currentIndexPc = 0;
// 用于存放每次拿到的批次
const batchesRegions = ref([]);
const batchesMobile = ref([]);
const batchesPc = ref([]);
// 每隔2秒拿一次批次

onMounted(() => {
    setTimeout(() => {
        const dom = document.getElementById('myChart7');
        const myChart = echarts.init(dom);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                top: '10',
                containLabel: true
            },
            xAxis: {
                max: '2000',
                position: 'top',
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                },
                interval: 1000, //加入axisLabel字段,interval后面加你想要间隔的个数
            },
            yAxis: {
                type: 'category',
                data: regions.value.slice(currentIndexRegions, currentIndexRegions + batchSize),
                axisLine: {
                    lineStyle: {
                        color: 'white',
                    }
                }
            },
            textStyle: {
                color: 'white',
            },
            series: [
                {
                    name: 'mobile',
                    type: 'bar',
                    data: mobile.value.slice(currentIndexMobile, currentIndexMobile + batchSize),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {
                                offset: 0,
                                color: 'rgba(58,77,233,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,77,233,0.2)'
                            }
                        ])
                    },
                    barCategoryGap: "40%"
                },
                {
                    name: 'pc',
                    type: 'bar',
                    data: pc.value.slice(currentIndexPc, currentIndexPc + batchSize),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {
                                offset: 0,
                                color: '#91cc75'
                            },
                            {
                                offset: 1,
                                color: '#91cc7566'
                            }
                        ])
                    },
                    barCategoryGap: "40%"
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', () => {
            setTimeout(() => {
                myChart.resize();
            }, 10);
        });

        setInterval(() => {
            // 处理 regions 数组
            const endIndexRegions = currentIndexRegions + batchSize;
            batchesRegions.value = [];
            for (let i = currentIndexRegions; i < endIndexRegions; i++) {
                const index = i % regions.value.length;
                batchesRegions.value.push(regions.value[index]);
            }
            currentIndexRegions = (currentIndexRegions + 1) % regions.value.length;

            // 处理 mobile 数组
            const endIndexMobile = currentIndexMobile + batchSize;
            batchesMobile.value = [];
            for (let i = currentIndexMobile; i < endIndexMobile; i++) {
                const index = i % mobile.value.length;
                batchesMobile.value.push(mobile.value[index]);
            }
            currentIndexMobile = (currentIndexMobile + 1) % mobile.value.length;

            // 处理 pc 数组
            const endIndexPc = currentIndexPc + batchSize;
            batchesPc.value = [];
            for (let i = currentIndexPc; i < endIndexPc; i++) {
                const index = i % pc.value.length;
                batchesPc.value.push(pc.value[index]);
            }
            currentIndexPc = (currentIndexPc + 1) % pc.value.length;

            const option = {
                yAxis:{
                    data:batchesRegions.value
                },
                series:[
                    {
                        data:batchesMobile.value
                    },
                    {
                        data:batchesPc.value
                    }
                ]
            }

            myChart.setOption(option)
        }, 2000);
        
    }, 10);
});
</script>

<style scoped>
/* 可以添加一些局部样式 */
</style>