<template>
  <div class="main">
    <div class="swiper-container">
      <swiper :options="swiperOptions" ref="mySwiper" :navigation='true' :pagination='true' :loop="true">
        <swiper-slide v-for="(info, index) in infos" :key="index">
          <div class="content">
            <component :is="info.echart" class="echart"></component>
            <div class="text">
              <h4>{{ $t(info.title) }}</h4>
              <p>{{ info.content }}</p>
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

service.get("/subject")
  .then(res => {
    subjects = res.data; // Assuming the response is an array of subjects
  })
  .catch(error => {
    console.error("Error fetching subjects:", error);
  });

const swiperOptions = ref({
  Navigation: true,
  Pagination: true, // 启用内置分页器
  loop: true,
  Autoplay: {
    delay: 5000
  }
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  min-height: 500px;
}

.swiper-container {
  overflow: hidden;
  position: relative;
  width: 90%;
  height: 92%;
  backdrop-filter: blur(10px) brightness(0.8);
  background-color: rgba(255, 255, 255, 0.103);
  min-width: 975px;
  min-height: 575px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.swiper-container .swiper {
  height: 100%;
  width: 100%;
  --swiper-navigation-color: white;/* 单独设置按钮颜色 */
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

.swiper-pagination {
  position: absolute;
  bottom: 20px;
  /* 距离底部的距离 */
  left: 50%;
  /* 居中显示 */
  transform: translateX(-50%);
  z-index: 10;
  /* 确保在顶部 */
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: #fff !important;
  opacity: 0.5;
  /* 初始透明度 */
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  /* 调整圆形按钮之间的间距 */
}

.swiper-pagination-bullet-active {
  opacity: 1;
  /* 激活状态的透明度 */
}
</style>