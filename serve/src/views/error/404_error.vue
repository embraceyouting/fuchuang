<template>
  <div class="error">
    <el-empty :description="msg">
    </el-empty>
  </div>  
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
  
<style scoped>
.error{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}
</style>