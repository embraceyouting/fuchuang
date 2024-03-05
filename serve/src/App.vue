<template>
    <home_page></home_page>
</template>

<script>
import home_page from "../src/views/home/home_page.vue"
import { ref, computed } from 'vue'
export default {
  name: 'App',
  components: {
    home_page,
  },
  setup() {


    const firstName = ref('John')
    const lastName = ref('Doe')

    const fullName = computed({
      // getter
      get() {
        return firstName.value + ' ' + lastName.value
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [firstName.value, lastName.value] = newValue.split(' ')
      }
    })


    return {
      fullName,
      firstName,
      lastName
    }

    
  }
}
</script>




<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
