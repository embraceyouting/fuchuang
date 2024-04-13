<template>
  <div class="bar" ref="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { getRandom } from '@/utils';

const chart = ref(null);
const getRandomCount = () => getRandom(300, 1500)
let countries = ["中国", "日本", "美国", "英国", "法国", "德国", "澳大利亚", "印度", "巴西", "加拿大"].map(item => ({ name: item, in: getRandomCount(), out: getRandomCount() }));
const COUNT = 8;
let start = ref(0)
let currentList = computed(() => countries.slice(start.value, COUNT + start.value).concat(countries.slice(0, Math.max(0, start.value + COUNT - countries.length))));
let timer = null

onMounted(() => {
  const myChart = echarts.init(chart.value);
  myChart.setOption({
    grid: {
      top: "0%",
      left: "15%",
      right: "20%",
      bottom: "10%",
    },
    xAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      inverse: true,
    },
    yAxis: {
      type: "category",
      position: "right",
      data: currentList.value.map(item => item.name),
      inverse: true,
      axisLabel: {
        show: true,
        color: "#fff"
      },
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        z: 0,
      }
    },
    series: [
      {
        name: "访问量",
        type: "bar",
        label: {
          show: true,
          position: "left",
        },
        itemStyle: {
          color: "#aaac",
        },
        data: currentList.value.map(item => item.in),
      },
      {
        name: "出流量",
        type: "bar",
        label: {
          show: true,
          position: "left",
        },
        itemStyle: {
          color: "#5f86eadd",
        },
        data: currentList.value.map(item => item.out),
      },
    ],
  });

  timer = setInterval(() => {
    countries[start.value].in = getRandomCount()
    countries[start.value].out = getRandomCount()
    start.value = (start.value + 1) % countries.length
    myChart.setOption({
      yAxis: {
        data: currentList.value.map(item => item.name),
      },
      series: [
        {
          data: currentList.value.map(item => item.in),
        },
        {
          data: currentList.value.map(item => item.out),
        },
      ],
    });
  }, 3000)
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped lang="scss">
.bar {
  width: 100%;
  height: 100%;
}
</style>