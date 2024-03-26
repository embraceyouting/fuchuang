<template>
  <div class="main">
    <div class="swiper-container">
      <swiper>
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
import { ref } from 'vue';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import echarts_percent from "../../components/visualization/echarts_percent.vue";
import echarts_score from "../../components/visualization/echarts_score.vue";
import service from "@/service";
import World from '@/components/charts/world.vue'

SwiperCore.use([Navigation, Pagination, Autoplay]);

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
}

.swiper-container {
  overflow: hidden;
  width: 80%;
  height: 92%;
  backdrop-filter: blur(10px) brightness(0.8);
  background-color: rgba(255, 255, 255, 0.103);
  border: 1px solid #ccc;
  border-radius: 8px;
}

.swiper-container .swiper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  --swiper-navigation-color: white;
  --swiper-pagination-color: white;
}

.swiper-slide {
  display: flex;
  align-items: center;
  gap: 40px;
}

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
</style>