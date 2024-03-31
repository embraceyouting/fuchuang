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
        { name: 'Sales', max: 7000 }, // 调整最大值
        { name: 'Administration', max: 17000 }, // 调整最大值
        { name: 'Information', max: 32000 }, // 调整最大值
        { name: 'Customer', max: 40000 }, // 调整最大值
        { name: 'Development', max: 54000 }, // 调整最大值
        { name: 'Marketing', max: 26000 } // 调整最大值
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
