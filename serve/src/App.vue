<template>
  <Backdrop></Backdrop>
  <Transition name="slide" mode="out-in">
    <Navbar v-if="route.meta.isNav"></Navbar>
  </Transition>
  <Transition name="fade" mode="out-in">
    <div :key="route.fullPath">
      <router-view></router-view>
    </div>
  </Transition>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue"
import Backdrop from "@/components/backdrop/backdrop.vue"
import { useRoute } from "vue-router";
import { useUserStore } from "./store/user";
const route = useRoute();
useUserStore().userLogin();
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s ease;
  position: absolute;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-55px);
}
</style>
