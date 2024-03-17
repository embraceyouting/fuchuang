<template>
    <div class="chat">
        <input type="text" v-model="key" @keyup.enter="search">
        <button @click="search">搜索</button>
        <br>
        <p>
            <span :class="{ 'enter': !isEnd }">{{ message }}</span>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('');
const key = ref('');
const isEnd = ref(true);
function search() {
    message.value = "";
    isEnd.value = false;
    const source = new EventSource("http://127.0.0.1:8000/gpt?key=" + key.value);
    source.onmessage = (event) => {
        if (event.data === "[DONE]") {
            source.close();
            isEnd.value = true;
            return
        }
        message.value += event.data;
    };
}
</script>

<style scoped lang="scss">
.enter {

    &::after {
        content: "";
        position: relative;
        vertical-align: -2px;
        display: inline-block;
        width: 5px;
        height: 16px;
        background-color: #ffffff;
        animation: blink 0.5s infinite;

        @keyframes blink {
            0% {
                opacity: 0;
            }

            50% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }
    }
}
</style>