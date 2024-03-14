<template>
    <div>
      <e-charts class="chart" :option="option" style="height: 360px; width: 380px; " />
    </div>
  </template>
    
  <script setup>
  import { ref, computed } from 'vue';
  
  const data = ref([
    { value: 67, name: 'A' },
    { value: 40, name: 'B' },
    { value: 100, name: 'C' },
    { value: 58, name: 'D' },
    { value: 85, name: 'E' }
  ]);
  
  const option = computed(() => {
    return {
      xAxis: {
        type: 'category',
        data: data.value.map(item => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.value.map(item => ({ value: item.value, name: item.name })),
          type: 'bar',
          label: {
            show: false, // 将标签默认隐藏
            position: 'top', // 标签位置，显示在柱子顶部
          },
        },
      ],
      tooltip: {
        trigger: 'axis', // 鼠标悬停时触发
        formatter: '{b}:{c}', // 标签格式，{b} 表示数据项的名称，{c} 表示数据项的值
      },
    };
  });
  </script>
  
  <style scoped>
  </style>
  