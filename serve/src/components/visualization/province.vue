<template>
  <div id="chinaMap" ref="chinaMap"></div>
</template>

<script setup lang="js">
import { onMounted, onBeforeUnmount, ref  } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import { useRoute } from 'vue-router';
let route = useRoute()
let sichuan;
const chinaMap = ref();
let myChart = null;

onMounted(() => {
  axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${route.params.adcode}_full.json`).then((res) => {
    sichuan = res.data
    initEchartMap();
  });
});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});

function initEchartMap() {
  echarts.registerMap('sichuan', sichuan); // 注册四川地图
  myChart = echarts.init(chinaMap.value);

  const options = {
    tooltip: {
      trigger: 'item',
    },
    geo: {
      layoutCenter: ['50%', '50%'],
      zoom: 1.23,
      roam: false,
      map: "sichuan",
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          areaColor: "#d5e8f3",
          borderColor: "#fcfdfe",
          borderWidth: 1,
        }
      }
    },
    series: [
      {
        name: "地图",
        type: "map",
        map: "sichuan", // 使用 'sichuan' 地图
        geoIndex: 0,
      }
    ]
  };
  myChart.setOption(options);
  window.addEventListener('resize', () => {
    setTimeout(() => {
      myChart.resize();
    }, 10);
  });
}
</script>

<style scoped lang="scss">
#chinaMap {
  width: 100%;
  height: 100%;
}
</style>
