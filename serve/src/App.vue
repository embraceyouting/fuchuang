<template>
  <Backdrop></Backdrop>
  <Transition name="slide" mode="out-in">
    <Navbar v-if="route.meta.isNav"></Navbar>
  </Transition>
  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <keep-alive :include="keepAliveRoutes">
        <component :is="Component" :key="route.fullPath"></component>
      </keep-alive>
    </Transition>
  </router-view>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue"
import Backdrop from "@/components/backdrop/backdrop.vue"
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./store/user";
const route = useRoute();
const router = useRouter();
const keepAliveRoutes = router.getRoutes().filter(item => item.meta.isKeepAlive).map(item => item.name)
useUserStore().getUserInfo();
</script>

<style scoped lang="scss">
*,
html,
body {
  margin: 0;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(1px) scale(0.98);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-55px);
}
</style>
