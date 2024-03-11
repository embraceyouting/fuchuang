<template>
  <div id="bg"></div>
  <Navbar v-if="route.meta.isNav"></Navbar>
  <router-view></router-view>
</template>

<script setup>
import Navbar from "@/components/navbar/navbar.vue"
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped lang="scss">
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
