<template>
  <div class="main">
    <BorderBox7 class="map">
      <province></province>
    </BorderBox7>
    <div class="right">
      <BorderBox7 :color="['rgb(157,180,223)', 'rgb(213,232,243)']" class="chart">
        <linerace></linerace>
      </BorderBox7>
      <BorderBox7 class="chart">
        <stack></stack>
      </BorderBox7>
    </div>
  </div>
</template>

<script setup>
import province from "../../components/visualization/province.vue"
import linerace from "../../components/visualization/linerace.vue"
import stack from "../../components/visualization/stack.vue"
import { BorderBox7 } from '@dataview/datav-vue3';
import { onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
  // 在组件销毁前执行刷新页面的操作
  window.location.reload();
});
defineOptions({
  name: "province"
})
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .map {
    height: 90%;
    width: 40%;
    padding: 2%;
  }

  .right {
    height: 90%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .chart {
      height: 48%;
      width: 100%;
      backdrop-filter: blur(20px);
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
}
</style>