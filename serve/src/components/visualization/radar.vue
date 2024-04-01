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
    label: 'outer',
    legend: {
      top: 30,
      data: ['average'],
      textStyle: {
        color: 'white'
      }
    },
    textStyle: {
      color: '#7884FF',
      fontweight: 'bold'
    },
    radar: {
      radius: ["0%", "50%"],
      indicator: [
        { name: 'Sales', max: 100 }, // 调整最大值
        { name: 'Administration', max: 100 }, // 调整最大值
        { name: 'Information', max: 100 }, // 调整最大值
        { name: 'Customer', max: 100 }, // 调整最大值
        { name: 'Development', max: 100 }, // 调整最大值
        { name: 'Marketing', max: 100 } // 调整最大值
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [82, 30, 70, 35, 50, 68],
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
