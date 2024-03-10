<template>
  <div class="error">
    <EmptyIcon></EmptyIcon>
    <p>{{ msg }}</p>
  </div>
</template>

<script setup>
import EmptyIcon from '@/icons/EmptyIcon.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const msg = ref("");
const route = useRoute();
msg.value = `Error! Can't find the page of ${route.path} !`;
</script>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;

  svg {
    width: 200px;
    height: 200px;
  }

  p {
    margin-top: 20px;
  }
}
</style>