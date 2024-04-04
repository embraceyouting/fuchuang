<template>
  <div class="main">
    <div class="swiper-container">
      <!-- <div v-if="isloading" style="height: 100%;width: 100%;" class="isloading">
        <loading></loading>
      </div> -->
      <swiper :modules="modules" :simulateTouch="false" :navigation="true">
        <swiper-slide>
          <div class="charts">
            <div class="left">
              <div class="left_chart">
                <BorderBox2 class="text_pv"><span>用户分布</span></BorderBox2>
                <div class="chart">
                  <stack></stack>
                </div>
              </div>
              <div class="left_chart">
                <BorderBox2 class="text_pv"><span>网站评分</span></BorderBox2>
                <div class="chart">
                  <left_pie></left_pie>
                </div>
              </div>
              <div class="left_chart">
                <BorderBox2 class="text_pv"><span>核心网站指标</span></BorderBox2>
                <div class="chart">
                  <left_line></left_line>
                </div>
              </div>
            </div>
            <div class="middle">
              <div class="china">
                <china></china>
              </div>
              <div class="middle_font">
                <BorderBox2 class="text"><span>用户访问量</span></BorderBox2>
                <thermal :thermaldata="thermaldata"></thermal>
              </div>
            </div>
            <div class="right">


              <div class="right_chart">
                <BorderBox2 class="text_pv"><span>兼容性趋势</span></BorderBox2>
                <div class="chart">
                  <pie></pie>
                </div>

              </div>

              <div class="right_chart">
                <BorderBox2 class="text_pv"><span>流量实时监测</span></BorderBox2>
                <div class="chart">
                  <linerace></linerace>
                </div>
              </div>

              <div class="right_chart">
                <BorderBox2 class="text_pv"><span>数字看板</span></BorderBox2>
                <div class="grid chart">
                  <div class="item bb" v-for="i in 6">
                    <div><span style="font-size: 32px;">13</span><span><small>实打实</small></span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <World></World>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from "vue"
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import nightingale from "../../components/visualization/nightingale.vue"
import loading from "../../components/visualization/loading.vue"
import thermal from "../../components/visualization/thermal.vue"
import radar from "../../components/visualization/radar.vue"
import china from "../../components/visualization/china.vue"
import linerace from "../../components/visualization/linerace.vue"
import relation from "../../components/visualization/relation.vue"
import left_line from "../../components/visualization/left_line.vue"
import left_pie from "../../components/visualization/left_pie.vue"
import pie from "../../components/visualization/pie.vue"
import stack from "../../components/visualization/stack.vue"
import World from '@/components/charts/world.vue'
import service from '@/service'
import { BorderBox8, BorderBox2, BorderBox7, BorderBox6, BorderBox10 } from '@dataview/datav-vue3';

defineOptions({
  name: "visualization"
})

const modules = [Autoplay, Pagination, Navigation, A11y]
const isloading = ref(true)
setTimeout(() => isloading.value = false, 3000)
const thermaldata = ref([]);
service.get("/visual").then((res) => {
  console.log(res)
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 6; j++) {
      thermaldata.value.push([i, j, 0])
    }
  }
  res.data.forEach((item1) => {
    item1.problems.forEach((item2) => {
      thermaldata.value[Math.floor(item2.score / 10) * 6 + item2.problemid - 1][2] += 1;
    })
  })
})
  .catch((err) => {

  })

function style(index) {
  if (index == 1) {
    return "width: 440px;height: 440px;"
  }
  else {
    return "width: 350px;height: 350px;"
  }
}
const chartList = [
  {
    title: '111',
    chart: nightingale,
    content: "基于广泛的数据汇总和分析，针对网站体验的各个方面进行评估和比较。通过这一模块，我们能够将用户的网站体验与行业平均水平进行对比，帮助用户更清"
  },
  {
    title: '222',
    chart: thermal,
    content: "基于广泛的数据汇总和分析，针对网站体验的各个方面进行评估和比较。通过这一模块，我们能够将用户的网站体验与行业平均水平进行对比，帮助用户更清"
  },
  {
    title: '333',
    chart: radar,
    content: "基于广泛的数据汇总和分析，针对网站体验的各个方面进行评估和比较。通过这一模块，我们能够将用户的网站体验与行业平均水平进行对比，帮助用户更清"
  }
]



</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);

  .swiper-container {
    width: 94%;
    height: 98%;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .isloading {
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(20px);
      background-color: rgba(212, 217, 236, 0.315);
      animation: isloadinganimation 0.5s ease-in-out;
    }

    .swiper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      --swiper-navigation-color: white;
      position: initial;
      border-radius: 8px;

      .swiper-slide {
        display: flex;
        align-items: center;
        backdrop-filter: blur(20px);
        background-color: rgba(216, 221, 239, 0.5);
        gap: 40px;

        .charts {
          display: flex;
          justify-content: space-around;
          height: 100%;
          width: 100%;

          .left {
            width: 24%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .left_chart {

              display: flex;
              flex-direction: column;
              margin-top: 10px;

              .text_pv {
                height: auto;
                width: fit-content;
                padding: 12px 20px;
                margin-bottom: 10px;
                margin-left: auto;
              }

              &:nth-child(1) {
                height: 40%;
                width: 100%;
              }

              &:nth-child(2) {
                height: 25%;
                width: 100%;
              }

              &:nth-child(3) {
                height: 30%;
                width: 100%;
                position: relative;

                .chart {
                  position: absolute;
                  inset: 0;
                }
              }

              .chart {
                flex: 1;
              }
            }
          }

          .middle {
            width: 48%;
            height: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 2%;
            overflow: hidden;

            .china {
              height: 65%;
              width: 100%
            }

            .middle_font {
              height: 35%;
              width: 100%;
              display: flex;
              align-items: center;

              .text {
                width: 15px;
                padding: 15px 18px;
                font-size: 15px;
                transform: translateY(-30px);
                box-sizing: content-box;
                height: fit-content;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }

            .right {
              width: 24%;
              height: 100%;
              margin: 1% 0%;
            }
          }

          .text_pv {
            height: auto;
            width: fit-content;
            padding: 12px 20px;
            margin-bottom: 10px;
          }

          .right {
            width: 24%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .right_chart {
              width: 100%;
              margin-top: 10px;
              display: flex;
              flex-direction: column;

              .item {
                border-radius: 5px;
                backdrop-filter: blur(20px);
                padding: 2px;
                border: 1px solid #fff;


                &>div {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  padding: 5px 0 8px;
                  border: #fff 1px solid;
                  border-radius: 2px;
                  background-color: #dddddd1a;

                  &>span {
                    line-height: 1.1;
                    font-family: "YouSheBiaoTiHei", "PingFangSC";
                  }
                }


              }

              &:nth-child(1) {
                height: 280px;
              }

              &:nth-child(2) {
                height: 300px;
              }

              &:nth-child(3) {}

              .chart {
                flex: 1;
              }

              .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px
              }

              .text_pv {
                height: auto;
                width: fit-content;
                padding: 12px 20px;
                margin-bottom: 10px;
              }
            }
          }

          .chart {
            display: flex;
            flex-direction: column;

            &:nth-child(even) {
              flex-direction: column-reverse;
            }
          }
        }
      }
    }
  }
}

:deep(.swiper-button-next) {
  transform: translateX(50px)
}

:deep(.swiper-button-prev) {
  transform: translateX(-50px)
}

:deep(.swiper-pagination-bullet) {
  width: 10%;
  height: 5px;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
}

:deep(.swiper-pagination-bullet-active) {
  width: 18%;
  height: 5px;
  border-radius: 5px;
}

@keyframes isloadinganimation {
  0% {
    opacity: 0;
    /* Start with opacity 0 */
  }

  50% {
    opacity: 1;
    /* Fade in to full opacity */
  }

  100% {
    opacity: 0;
    /* Fade out to opacity 0 */
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>