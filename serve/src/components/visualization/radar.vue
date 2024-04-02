<template>
  <div class="chart" id="myChart" style="height: 100%; width: 100%;">
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
  const dom = document.getElementById('myChart');
  const myChart = echarts.init(dom); // 初始化echarts实例
  const option = {
    tooltip: {
      trigger:'item'
    },
    label: {
    },
    legend: {
      top: "3%",
      data: ['average'],
      textStyle: {
        color: 'white'
      }
    },
    textStyle: {
      color: 'white',
      fontweight: 'bold'
    },
    radar: {
      radius: ["0%", "60%"],
      center: ["50%", "55%"],
      indicator: [
        { name: '无响应', max: 100 }, // 调整最大值
        { name: '高跳出率', max: 100 }, // 调整最大值
        { name: '重复点击', max: 100 }, // 调整最大值
        { name: '页面加载慢', max: 100 }, // 调整最大值
        { name: '网络反馈慢', max: 100 }, // 调整最大值
        { name: '点击错误', max: 100 }, // 调整最大值
        { name: '加载错误', max: 100 }, // 调整最大值
        { name: '白屏', max: 100 }, // 调整最大值
      ],
      itemStyle: {
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [82, 30, 70, 35, 50, 68, 50, 70],
            name: 'average',
          },
        ]
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
