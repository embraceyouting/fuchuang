<template>
  <div class="chart" id="myChart2" ref="myChart2" style="height: 100%; width: 100%;">
  </div>
</template>

<script setup>

import { getCurrentInstance, onMounted } from 'vue';

// 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
  const dom = document.getElementById('myChart2');
  const myChart = echarts.init(dom); // 初始化echarts实例
  const option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'Fly View',
          fontSize: 80,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'black'
              }
            }
          ]
        }
      }
    ]
  }
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
