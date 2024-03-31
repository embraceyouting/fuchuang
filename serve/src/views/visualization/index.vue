<template>
  <div class="main">
    <div class="swiper-container">
      <div v-if="isloading" style="height: 100%;width: 100%;" class="isloading">
        <loading></loading>
      </div>
      <swiper v-else :modules="modules" :simulateTouch="false" :navigation="true" :pagination="{ clickable: true }">
        <swiper-slide>
          <div class="nightingale">
            <nightingale></nightingale>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="radar">
            <radar></radar>
          </div>
        </swiper-slide>
        <swiper-slide>
          <keep-alive></keep-alive>
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
import nightingale from "../../components/visualization/nightingale.vue";
import loading from "../../components/visualization/loading.vue";
import World from '@/components/charts/world.vue'
import radar from "../../components/visualization/radar.vue"

const modules = [Autoplay, Pagination, Navigation, A11y]
const isloading = ref(true)

setTimeout(() => isloading.value = false, 2000)
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
        justify-content: center;
        gap: 40px;

        .nightingale {
          width: 400px;
          height: 400px;
        }

        .radar {
          width: 400px;
          height: 400px;
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
</style>