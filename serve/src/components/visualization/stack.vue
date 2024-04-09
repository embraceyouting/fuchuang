<template>
    <div class="chart" id="myChart7" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount , ref } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
// 初始化数组
const regions = ref(['巴西', '英国', '美国', '印度', '中国', '日本', '韩国', '法国', '德国', '朝鲜', '挪威', '埃及']);
const mobile = ref([10850, 11900, 13150, 13580, 20230, 14170, 14490, 12390, 12540, 14950, 13280, 11850]);
const pc = ref([19150, 18100, 16850, 16420, 9767, 15830, 15510, 17610, 17460, 15050, 16720, 18150]);
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
                max: '20000',
                position: 'top',
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                },
                interval: 10000, //加入axisLabel字段,interval后面加你想要间隔的个数
            },
            yAxis: {
                type: 'category',
                data: ['巴西', '英国', '美国', '印度', '中国', '日本'],
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
                    data: [10850, 11900, 13150, 13580, 20230, 14170],
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
                    data: [19150, 18100, 16850, 16420, 9767, 15830],
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