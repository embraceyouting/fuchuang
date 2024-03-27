<template>
  <div class="main">
    <div class="swiper-container">
      <swiper :modules="modules" :simulateTouch="false" :navigation="true" :pagination="{ clickable: true }"
        class="inswiper">
        <swiper-slide v-for="(info, index) in infos" :key="index">
          <div class="content">
            <keep-alive>
              <component :is="info.echart" class="echart"></component>
            </keep-alive>
            <div class="text">
              <h4>{{ $t(info.title) }}</h4>
              <p>{{ info.content }}</p>
            </div>
          </div>
        </swiper-slide>
        <!-- <swiper-slide>
          <keep-alive></keep-alive>
          <World></World>
        </swiper-slide> -->
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import echarts_percent from "../../components/visualization/echarts_percent.vue";
import echarts_score from "../../components/visualization/echarts_score.vue";


const modules = [Autoplay, Pagination, Navigation, A11y]
let subjects = [];
let infos = [
  {
    title: "sub.proportion",
    echart: echarts_percent,
    content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
  },
  {
    title: "sub.score",
    echart: echarts_score,
    content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
  }
];
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);

  .swiper-container {
    width: 80%;
    height: 92%;
    backdrop-filter: blur(10px) brightness(0.8);
    background-color: rgba(255, 255, 255, 0.103);
    border: 1px solid #ccc;
    border-radius: 8px;
    position: relative;

    .swiper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      --swiper-navigation-color: white;
      --swiper-pagination-color: white;
      position: initial;

      .swiper-slide {
        display: flex;
        align-items: center;
        gap: 40px;

        .content {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
        }

        .text {
          flex: 1;

          h4 {
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 20px;
          }

          p {
            margin-top: 0;
            margin-bottom: 0;
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
</style>