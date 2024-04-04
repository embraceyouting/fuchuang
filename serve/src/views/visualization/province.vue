<template>
    <div class="main">
      <province></province>
    </div>
  </template>
  
  <script setup>
  import province from "../../components/visualization/province.vue"
  defineOptions({
    name: "province"
  })
  </script>
  
  <style scoped lang="scss">
  .main {
     width: 100%;
     height: 100vh
    }
  </style>