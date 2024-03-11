<template>
  <div id="bg"></div>
  <Navbar v-if="route.meta.isNav"></Navbar>
  <Transition name="fade" mode="out-in">
    <div :key="route.fullPath">
      <router-view></router-view>
    </div>
  </Transition>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue"
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

#bg {
  position: fixed;
  inset: 0;
  background: url('@/assets/image/bg.png') no-repeat 100%/100%;
  background-size: cover;
  z-index: -99;
  filter: blur(20px);
  transform: scale(1.1);
}
</style>
