<template>
  <div id="chinaMap" ref="chinaMap"></div>
</template>

<script setup lang="js">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';
import china from "@/assets/china.json";
import { useRouter } from 'vue-router';
import 'echarts-gl';
const router = useRouter();
const chinaMap = ref();
let myChart = null;
// 模拟用户登录地点数据，按省份为单位
let userData = {
  '北京市': getRandomInt(500, 2000),
  '上海市': getRandomInt(400, 1800),
  '广东省': getRandomInt(100, 1000),
  '浙江省': getRandomInt(300, 1500),
  '四川省': getRandomInt(100, 1000),
  '湖北省': getRandomInt(100, 1000),
  '天津市': getRandomInt(100, 1000),
  '重庆市': getRandomInt(100, 1000),
  '福建省': getRandomInt(100, 1000),
  '辽宁省': getRandomInt(100, 1000),
  '山东省': getRandomInt(100, 1000),
  '江苏省': getRandomInt(100, 1000),
  '广西壮族自治区': getRandomInt(100, 1000),
  '河北省': getRandomInt(100, 1000),
  '河南省': getRandomInt(100, 1000),
  '安徽省': getRandomInt(100, 1000),
  '江西省': getRandomInt(100, 1000),
  '湖南省': getRandomInt(100, 1000),
  '黑龙江省': getRandomInt(100, 1000),
  '山西省': getRandomInt(100, 1000),
  '吉林省': getRandomInt(100, 1000),
  '云南省': getRandomInt(100, 1000),
  '贵州省': getRandomInt(100, 1000),
  '甘肃省': getRandomInt(100, 500),
  '陕西省': getRandomInt(100, 1000),
  '青海省': getRandomInt(100, 500),
  '西藏自治区': getRandomInt(100, 400),
  '内蒙古自治区': getRandomInt(100, 400),
  '新疆维吾尔自治区': getRandomInt(100, 400),
  '宁夏回族自治区': getRandomInt(100, 1000),
  '台湾省': getRandomInt(100, 1000),
  '香港特别行政区': getRandomInt(100, 1000),
  '澳门特别行政区': getRandomInt(100, 1000),
  '海南省': getRandomInt(100, 1000),
  '南海诸岛': getRandomInt(10, 100),
};

onMounted(() => {
  initEchartMap();
  myChart.on('click', (params) => {
    const adcode = china.features.filter((item) => item.properties.name == params.data.name)[0].properties.adcode
    router.push(`/${adcode}`)
  })
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
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人' // 提示信息格式，显示省份名称和用户数量
    },
    visualMap: {
      min: 0,
      max: Math.max(...Object.values(userData)), // 用户数量最大值
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#d5e8f3', '#5470c6'] // 浅蓝色到深蓝色
      }
    },
    geo: [
      {
        top: '9.5%',//***********重点**********距离顶部的位置，每层向下一个百分比
        z: 5,
        layoutCenter: ['50%', '50%'],
        zoom: 1.23,
        roam: false,
        regionHeight: 4, // 地图高度
        map: "china",
        label: {
          emphasis: {
            textStyle: {
              color: '#5470c6',//鼠标经过字体颜色
              fontSize: '15px',
              fontFamily: 'PingFangSC'
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#000",
            borderColor: "#fcfdfe",
            borderWidth: 1,
          },
          emphasis: {
            areaColor: "white",
            label: {
              show: true,
              textStyle: {
                color: '#fff'//鼠标经过字体颜色
              }
            }
          }
        },
        selectedMode: 'single', // 单选模式
        select: function (params) {
          console.log("1");
        },
      },
      {
        top: '10%',//***********重点**********距离顶部的位置，每层向下一个百分比
        z: 4,
        layoutCenter: ['50%', '50%'],
        zoom: 1.23,
        roam: false,
        map: "china",
        label: {
          show: false
        },
        regions: [
          { // 隐藏南海诸岛,因为顶层已经添加过了
            name: '南海诸岛',
            itemStyle: {
              normal: {
                opacity: 0 // 为 0 时不绘制该图形
              }
            },
            label: {
              show: false
            }
          }
        ],
        itemStyle: {
          normal: {
            areaColor: "#d5e8f3",
            borderColor: "#fcfdfe",
            borderWidth: 1,
          }
        },
        selectedMode: 'single', // 单选模式
        select: function (params) {
          console.log("1");
        }
      },
      {
        top: '10.5%',//***********重点**********距离顶部的位置，每层向下一个百分比
        z: 3,
        layoutCenter: ['50%', '50%'],
        zoom: 1.23,
        roam: false,
        map: "china",
        label: {
          show: false
        },
        regions: [
          { // 隐藏南海诸岛,因为顶层已经添加过了
            name: '南海诸岛',
            itemStyle: {
              normal: {
                opacity: 0 // 为 0 时不绘制该图形
              }
            },
            label: {
              show: false
            }
          }
        ],
        itemStyle: {
          normal: {
            areaColor: "#d5e8f3",
            borderColor: "#fcfdfe",
            borderWidth: 1,
          }
        },
        selectedMode: 'single', // 单选模式
        select: function (params) {
          console.log("1");
        }
      },
    ],
    series: [
      {
        name: "地图",
        type: "map",
        geoIndex: 0,
        data: Object.entries(userData).map(([name, value]) => ({ name, value })),
        itemStyle: {
          normal: {
            areaColor: '#000',
          },
          emphasis: {
            areaColor: '#000', //鼠标滑过区域颜色
          }
        }

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

// 生成指定范围内的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<style scoped lang="scss">
#chinaMap {
  width: 100%;
  height: 100%;
}
</style>
