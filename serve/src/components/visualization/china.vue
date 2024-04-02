<template>
  <div id="chinaMap" ref="chinaMap"></div>
</template>

<script setup lang="js">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';
import china from "@/assets/china.json";  // 中国地图

const chinaMap = ref();
let myChart = null;

onMounted(() => {
  initEchartMap();
});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});

// 初始化地图
function initEchartMap() {
  echarts.registerMap('china', china); // 注册中国地图
  myChart = echarts.init(chinaMap.value);

  const options = {
    tooltip: {}, // 如果不需要鼠标悬浮提示信息，可以为空对象
    geo: {
      layoutCenter: ['50%', '50%'],
      zoom: 1.23, //视觉比例大小,1.2即为原有大小的1.2倍
      roam: false, //缩放开启
      map: "china",
      label: {
        show: false // 不显示省份名称
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
        geoIndex: 0,
        data: [] // 不需要数据
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