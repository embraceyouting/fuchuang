<template>
      <e-charts class="chart" :option="option" style="height: 360px; width: 360px;" />
  </template>
    
  <script setup>
  import { ref, computed } from 'vue';
  
  const data = ref([
    { value: 27, name: 'A' },
    { value: 16, name: 'B' },
    { value: 20, name: 'C' },
    { value: 14, name: 'D' },
    { value: 23, name: 'E' },
  ]);
  
  const option = computed(() => {
  return {
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: data.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true, // 显示标签
          formatter: '{b}:{d}%', // 标签格式，{b} 表示名称，{d} 表示数据比例
          position: 'outside', // 标签位置，显示在饼图外部
          textStyle: {
            fontSize: 12, // 标签字体大小
          },
        },
      },
    ],
  };
});
  </script>
  
  <style scoped>
  </style>
  