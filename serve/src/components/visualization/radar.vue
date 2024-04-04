<template>
  <div class="chart" id="myChart" style="height: 100%; width: 100%;">
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref , onBeforeUnmount } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
onMounted(() => {
  const dom = document.getElementById('myChart');
  const myChart = echarts.init(dom); // 初始化echarts实例
  const index = ref(null)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (index.value != null) {
          const indicator = option.radar.indicator; // 获取雷达图的指标数组
          return indicator[index.value].name + ' : ' + params.value[index.value] + '分'
        }
      }
    },
    legend: {
      top: "2.5%",
      data: ['平均得分'],
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
      indicator: [
        { name: '无响应', max: 100 }, // 调整最大值
        { name: '高跳出率', max: 100 }, // 调整最大值
        { name: '重复点击', max: 100 }, // 调整最大值
        { name: '页面加载慢', max: 100 }, // 调整最大值
        { name: '网络反馈慢', max: 100 }, // 调整最大值
        { name: '点击错误', max: 100 }, // 调整最大值
        { name: '加载错误', max: 100 }, // 调整最大值
        { name: '白屏', max: 100 }, // 调整最大值
      ],
      itemStyle: {
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [80, 76, 77, 64, 80, 78, 73, 76],
            name: '平均得分',
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
  myChart.on('mouseover', (params) => {//写成箭头函数，获取到vue实例对象上的数据
    index.value = params.event.target.__dimIdx;
  })
})

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});
</script>

<style scoped></style>
