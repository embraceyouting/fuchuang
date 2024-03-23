<template>
    <div class="main">
      <div class="swiper-container">
        <swiper :options="swiperOptions" ref="mySwiper">
          <swiper-slide v-for="(info, index) in infos" :key="index">
            <div class="content">
              <component :is="info.echart" class="echart"></component>
              <div class="text">
                <h4>{{ $t(info.title) }}</h4>
                <p>{{ info.content }}</p>
              </div>
            </div>
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
  import echarts_percent from "../../components/subject/echarts_percent.vue";
  import echarts_score from "../../components/subject/echarts_score.vue";
  import service from "@/service";
  
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
    navigation: true,
    pagination: {
      clickable: true
    },
    loop: true,
    autoplay: {
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
    width: 100%;
    max-width: 800px; /* 设置最大宽度为 800px */
    border: 1px solid #ccc; /* 添加外边框 */
    border-radius: 8px; /* 添加边框圆角 */
    padding: 20px; /* 添加内边距 */
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
    cursor:pointer
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
  