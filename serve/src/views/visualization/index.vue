<template>
  <div class="main">
    <div class="swiper-container">
      <div v-if="isloading" style="height: 100%;width: 100%;" class="isloading">
        <loading></loading>
      </div>
      <swiper v-else :modules="modules" :simulateTouch="false" :navigation="true">
        <swiper-slide>
          <div class="charts">
            <div class="left">
              <div class="left_chart">
                <nightingale></nightingale>
              </div>
              <div class="left_chart">
                <thermal :thermaldata="thermaldata"></thermal>
              </div>
              <div class="left_chart">
                <linerace></linerace>
              </div>
            </div>
            <div class="middle">
              <div class="middle_font">

              </div>
              <div class="china">
                <china></china>
              </div>
            </div>
            <div class="right">
              <div class="right_chart">
                <sunburst></sunburst>
              </div>
              <div class="right_chart">
                <radar></radar>
              </div>
              <div class="right_chart">
                <pie></pie>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <keep-alive>
            <World></World>
          </keep-alive>
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
import sunburst from "../../components/visualization/sunburst.vue"
import pie from "../../components/visualization/pie.vue"
import World from '@/components/charts/world.vue'
import service from '@/service'

const modules = [Autoplay, Pagination, Navigation, A11y]
const isloading = ref(true)
setTimeout(() => isloading.value = false, 2000)
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
        background-color: rgba(212, 217, 236, 0.315);
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
            justify-content: space-around;

            .left_chart {
              height: 31.8%;
              width: 100%;
              border-radius: 5px;
              backdrop-filter: blur(20px);
              background-color: rgba(237, 238, 243, 0.078);
            }
          }

          .middle {
            width: 48%;
            height: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 1%;
            overflow: hidden;

            .middle_font {
              height: 23%;
              width: 100%;
              border-radius: 5px;
              backdrop-filter: blur(20px);
              background-color: rgba(237, 238, 243, 0.078);
            }


            .china {
              height: 75%;
              width: 100%
            }

            .right {
              width: 24%;
              height: 100%;
              margin: 1% 0%;
            }
          }

          .right {
            width: 24%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .right_chart {
              height: 31.8%;
              width: 100%;
              border-radius: 5px;
              backdrop-filter: blur(20px);
              background-color: rgba(237, 238, 243, 0.078);
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