<template>
    <div id="bg" :style="{
        backgroundPosition: `${bgX}% ${bgY}%`,
    }">
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { debounce } from '@/utils/debounce';

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', debouncedResize);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', debouncedResize);
});

let innerHeight = window.innerWidth;
let innerWidth = window.innerHeight;
const bgX = ref(0);
const bgY = ref(0);

function handleMouseMove(event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    bgX.value = mouseX / innerWidth * 10;
    bgY.value = mouseY / innerHeight * 10;
}

function handleResize() {
    innerHeight = window.innerWidth;
    innerWidth = window.innerHeight;
}

const debouncedResize = debounce(handleResize, 100);
</script>

<style scoped lang="scss">
*,
html,
body {
    margin: 0;
    padding: 0;
}

#bg {
    position: fixed;
    inset: 0;
    // filter: blur(65px);
    // background-size: 150% 150%;
    background: linear-gradient(45deg, $light-color 0%, $color 100%);
    // background-image: url('@/assets/image/back.jpg');
    overflow: hidden;
    transform: scale(1.1);
    z-index: -99;
}

.ball {
    position: absolute;
    width: 80vmin;
    height: 80vmin;
    border-radius: 50%;
    background-color: #607ff1ad;
    filter: blur(20vmin);

    &:first-child {
        top: 10%;
        left: 10%;
        transform-origin: 0 0;
        background-color: #6060f1ab;
        animation: rotate 30s linear infinite;
    }

    &:last-child {
        bottom: 20%;
        right: 20%;
        transform-origin: 100% 100%;
        animation: rotate 20s linear infinite;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
