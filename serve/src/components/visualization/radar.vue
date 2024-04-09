<template>
  <div class="chart" id="myChart" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
const { $t } = getCurrentInstance().proxy;

onMounted(() => {
  const dom = document.getElementById('myChart');
  const myChart = echarts.init(dom); // 初始化echarts实例
  const index = ref(null);
  const indicatorNames = computed(()=>{
    return [
      $t('radar.value1'),
      $t('radar.value2'),
      $t('radar.value3'),
      $t('radar.value4'),
      $t('radar.value5'),
      $t('radar.value6'),
      $t('radar.value7'),
      $t('radar.value8')
    ]
  });

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (index.value != null) {
          return indicatorNames.value[index.value] + ' : ' + params.value[index.value] + '分';
        }
      }
    },
    legend: {
      top: "2.5%",
      textStyle: {
        color: 'white',
      }
    },
    textStyle: {
      color: 'black',
      fontweight: 'bold',
    },
    radar: {
      radius: ["0%", "60%"],
      center: ["50%", "55%"],
      indicator: indicatorNames.value.map(name => ({ name, max: 100 })), // 将名称和最大值设置为100
      itemStyle: {
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [80, 76, 77, 64, 80, 78, 73, 76],
          },
        ]
      }
    ]
  };

  myChart.setOption(option);

  // 添加resize事件监听器，以便在窗口大小改变时重新渲染图表
  window.addEventListener('resize', () => {
    setTimeout(() => {
      myChart.resize();
    }, 10);
  });

  // 监听鼠标悬停事件，获取指标索引
  myChart.on('mouseover', (params) => {
    index.value = params.event.target.__dimIdx;
  });

  // 监听指标名称数组变化，重新设置雷达图的配置
  watch(indicatorNames, (newVal) => {
    myChart.setOption({
      radar: {
        indicator: newVal.map(name => ({ name, max: 100 }))
      }
    });
  });
});
</script>

<style scoped></style>
