<template>
  <div class="main">
    <div class="swiper-container">
      <div v-if="isloading" style="height: 100%;width: 100%;" class="isloading">
        <loading></loading>
      </div>
      <swiper v-else :modules="modules" :simulateTouch="false" :navigation="true" :pagination="{ clickable: true }">
        <swiper-slide>
          <div class="charts">
            <div v-for="(chart, index) in chartList" v-animate="{ direction: index % 2 ? 'top' : 'bottom' }"
              :key="chart.chart" class="chart">
              <component :is="chart.chart" :style="style(index)" :thermaldata="thermaldata"></component>
              <div class="content">
                <h4>{{ chart.title }}</h4>
                <p>{{ chart.content }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <keep-alive>
            <china></china>
          </keep-alive>
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
import nightingale from "../../components/visualization/nightingale.vue";
import loading from "../../components/visualization/loading.vue";
import thermal from "../../components/visualization/thermal.vue";
import radar from "../../components/visualization/radar.vue"
import china from "../../components/visualization/china.vue"
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
    width: 85%;
    height: 94%;
    backdrop-filter: blur(10px) brightness(0.8);
    background-color: rgba(255, 255, 255, 0.103);
    border: 1px solid #ccc;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .isloading {
      animation: isloadinganimation 0.5s ease-in-out;
    }

    .swiper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      --swiper-navigation-color: white;
      --swiper-pagination-color: white;
      position: initial;

      .swiper-slide {
        display: flex;
        align-items: center;
        gap: 40px;

        .charts {
          display: flex;
          height: 100%;

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
  transform: translateX(80px)
}

:deep(.swiper-button-prev) {
  transform: translateX(-80px)
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