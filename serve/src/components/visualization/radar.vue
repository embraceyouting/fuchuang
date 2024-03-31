<template>
  <div class="chart" id="myChart" ref="myChart" style="height: 100%; width: 100%;">
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
    label: 'outer',
    legend: {
      data: ['average']
    },
    radar: {
      radius: ["0%", "50%"],
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information', max: 30000 },
        { name: 'Customer', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'average'
          },
        ]
      }
    ]
  };
  myChart.setOption(option);

  // 添加resize事件监听器，以便在窗口大小改变时重新渲染图表
  window.addEventListener('resize', () => {
    myChart.resize();
  });
})
</script>

<style scoped></style>
