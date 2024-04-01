<template>
    <div class="leftCard">
      <div id="chinaMap" ref="chinaMap"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import * as echarts from 'echarts';
  import china from "@/assets/china.json";  // 中国地图
  
  const chinaMap = ref();
  let myChart: echarts.ECharts | null = null;
  
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
    
    const options: echarts.EChartOption = {
      tooltip: {}, // 如果不需要鼠标悬浮提示信息，可以为空对象
      geo: {
        map: "china",
        roam: true,
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
  }
  
  </script>
  
  <style scoped lang="scss">
  .leftCard {
    width: 100%;
    height: 100%;
    #chinaMap {
      width: 100%;
      height: 100%;
    }
  }
  </style>
  