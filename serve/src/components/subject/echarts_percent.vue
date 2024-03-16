<template>
  <e-charts class="chart" :option="option" style="height: 380px; width: 380px;" @click="handleClick" />
</template>
  
<script setup>
import { ref, computed ,defineEmits } from 'vue';

const data = ref([
  { value: 25, name: 'nihao' },
  { value: 15, name: 'nihao3' },
  { value: 20, name: 'nihao4' },
  { value: 14, name: 'nihao1' },
  { value: 26, name: 'nihao2' },
]);

const option = computed(() => {
  return {
    tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['20%', '60%'], // 环形图，设置内外半径
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true, // 一直显示比例
          position: 'outer',
          margin: 0,
          formatter: '{d}%', // 显示名称和比例
          fontSize: 12, // 标签字体大小
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '13',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: data.value,
      },
      // 中间的小圆
      {
        type: 'pie',
        radius: ['0%', '20%'], // 控制小圆的大小，减小半径
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true, // 一直显示文字
          position: 'center',
          formatter: '修改比重', // 设置显示的文字内容
          fontSize: 14, // 设置文字大小
        },
        emphasis: {
          label: {
            show: true, // 悬停时也显示文字
          },
        },
        labelLine: {
          show: false,
        },
        data: [{ value: 0, name: '修改比重' }], // 中间小圆的数据
      },
    ],
  };
});

const emits=defineEmits(['change_percent'])
const handleClick = (params) => {
  if(params.name == "修改比重") {
    emits('change_percent', data.value); // 传递事件名称和数据
  }
};
</script>

<style scoped>
</style>
