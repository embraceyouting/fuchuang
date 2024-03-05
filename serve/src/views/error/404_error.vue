<template>
    <el-empty :description="msg">
    </el-empty>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  export default {
    setup(){
      let route = useRoute()
      return {
        msg: `Error! Can't find the page of ${route.path} !`
      }
    }
      
    
  }
  </script>
  
  <style></style>