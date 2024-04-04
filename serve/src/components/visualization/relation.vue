<template>
    <div class="chart" id="myChart8" style="height: 100%; width: 100%;">
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref , onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
    const dom = document.getElementById('myChart8');
    const myChart = echarts.init(dom); // 初始化echarts实例
    const webkitDep = {
        nodes: [
            { name: '用户A', category: 0 },
            { name: '用户B', category: 0 },
            { name: '用户C', category: 0 },
            { name: '用户D', category: 0 },
            { name: '评分1', category: 1 },
            { name: '评分2', category: 1 },
            { name: '评分3', category: 1 },
            { name: '评分4', category: 1 },
            { name: '页面加载性能', category: 2 }, // 新增页面加载性能节点
            { name: '文本输入', category: 3 }, // 新增文本输入节点
            { name: '点击Get Started', category: 4 }, // 新增点击Get Started节点
            { name: '用户E', category: 0 }, // 模拟新增用户
            { name: '评分5', category: 1 }, // 模拟新增评分
            { name: '页面渲染性能', category: 2 }, // 模拟新增页面渲染性能节点
            { name: '鼠标点击事件', category: 4 }, // 模拟新增鼠标点击事件节点
        ],
        categories: [
            { name: '用户' },
            { name: '评分' },
            { name: '页面加载性能' }, // 新增页面加载性能类别
            { name: '文本输入' }, // 新增文本输入类别
            { name: '点击事件' }, // 新增点击事件类别
            { name: '用户F', category: 0 },
            { name: '评分6', category: 1 },
            { name: '页面渲染性能2', category: 2 },
            { name: '鼠标点击事件2', category: 4 },
            { name: '用户F', category: 0 },
            { name: '用户G', category: 0 },
            { name: '用户H', category: 0 },
            { name: '用户I', category: 0 },
            { name: '用户J', category: 0 },
            { name: '用户K', category: 0 },
            { name: '用户L', category: 0 },
            { name: '用户M', category: 0 },
            { name: '用户N', category: 0 },
            { name: '用户O', category: 0 },
            { name: '用户P', category: 0 },
            { name: '用户Q', category: 0 },
            { name: '用户R', category: 0 },
            { name: '用户S', category: 0 },
            { name: '用户T', category: 0 },
            { name: '用户U', category: 0 },
            { name: '用户V', category: 0 },
            { name: '用户W', category: 0 },
            { name: '用户X', category: 0 },
            { name: '用户Y', category: 0 },
            { name: '用户Z', category: 0 },
            { name: '评分6', category: 1 },
        ],
        links: [
            { source: 0, target: 4, value: 90 }, // 用户A 对应索引 0，评分1 对应索引 4
            { source: 0, target: 5, value: 85 }, // 用户A 对应索引 0，评分2 对应索引 5
            { source: 1, target: 4, value: 70 }, // 用户B 对应索引 1，评分1 对应索引 4
            { source: 1, target: 6, value: 95 }, // 用户B 对应索引 1，评分3 对应索引 6
            { source: 2, target: 5, value: 80 }, // 用户C 对应索引 2，评分2 对应索引 5
            { source: 2, target: 6, value: 75 }, // 用户C 对应索引 2，评分3 对应索引 6
            { source: 3, target: 7, value: 88 }, // 用户D 对应索引 3，评分4 对应索引 7
            { source: 8, target: 4, value: 1910.7 }, // 页面加载性能 对应索引 8，评分1 对应索引 4
            { source: 8, target: 5, value: 1910.7 }, // 页面加载性能 对应索引 8，评分2 对应索引 5
            { source: 8, target: 6, value: 1910.7 }, // 页面加载性能 对应索引 8，评分3 对应索引 6
            { source: 8, target: 7, value: 1910.7 }, // 页面加载性能 对应索引 8，评分4 对应索引 7
            { source: 9, target: 10, value: 5162 }, // 文本输入 对应索引 9，文本输入 对应索引 10
            { source: 11, target: 10, value: 2.9 }, // 点击Get Started 对应索引 11，文本输入 对应索引 10
            { source: 12, target: 13, value: 1000 }, // 模拟新增连接
            { source: 12, target: 8, value: 1500 }, // 模拟新增连接
            { source: 4, target: 8, value: 80 }, // 评分1 对应索引 4，页面加载性能 对应索引 8
            { source: 5, target: 9, value: 75 }, // 评分2 对应索引 5，页面加载性能2 对应索引 9
            { source: 6, target: 10, value: 88 }, // 评分3 对应索引 6，页面加载性能2 对应索引 10
            { source: 7, target: 11, value: 95 }, // 评分4 对应索引 7，鼠标点击事件2 对应索引 11
            { source: 9, target: 12, value: 85 }, // 页面加载性能2 对应索引 9，用户F 对应索引 12
            { source: 10, target: 13, value: 70 }, // 页面加载性能2 对应索引 10，用户F 对应索引 13
            { source: 11, target: 14, value: 95 }, // 鼠标点击事件2 对应索引 11，用户F 对应索引 14
            { source: 4, target: 8, value: 80 }, // 评分1 对应索引 4，页面加载性能 对应索引 8
            { source: 5, target: 9, value: 75 }, // 评分2 对应索引 5，页面加载性能2 对应索引 9
            { source: 6, target: 10, value: 88 }, // 评分3 对应索引 6，页面加载性能2 对应索引 10
            { source: 7, target: 11, value: 95 }, // 评分4 对应索引 7，鼠标点击事件2 对应索引 11
            { source: 9, target: 12, value: 85 }, // 页面加载性能2 对应索引 9，用户F 对应索引 12
            { source: 10, target: 13, value: 70 }, // 页面加载性能2 对应索引 10，用户F 对应索引 13
            { source: 11, target: 14, value: 95 }, // 鼠标点击事件2 对应索引 11，用户F 对应索引 14
        ]
    };
    const option = {
        legend: {
            data: ['用户', '评分', '页面加载性能', '文本输入', '点击事件'],
            top: '5%'
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                animation: false,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                draggable: true,
                data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                force: {
                    edgeLength: 5,
                    repulsion: 20,
                    gravity: 0.2
                },
                edges: webkitDep.links,
                lineStyle: {
                    color: 'white' // 设置连线的颜色为天蓝色
                }
            },
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

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});
</script>

<style scoped></style>
