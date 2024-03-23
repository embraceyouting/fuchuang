<template>
    <div id="bg">
        <div class="ball"></div>
        <div class="ball"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
});

function handleMouseMove(event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    const bgX = mouseX / window.innerWidth * 5;
    const bgY = mouseY / window.innerHeight * 5;
    const bg = document.querySelector('#bg');
    bg.style.backgroundPosition = `${bgX}% ${bgY}%`;
}
</script>

<style scoped lang="scss">
#bg {
    position: fixed;
    inset: 0;
    filter: blur(32px);
    background: linear-gradient(45deg, #d4e7ff, #5e74f4);
    background-image: url('@/assets/image/back.jpg');
    background-size: 200% 200%;
    overflow: hidden;
    z-index: -99;
}

#bg::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: scale(1.1);
    background: linear-gradient(45deg, #d4e7ff, #5e74f4);
    background-image: url('@/assets/image/back.jpg');
    opacity: 0.1;
    filter: blur(32px);
    background-size: 200% 200%;
}

.ball {
    position: absolute;
    width: 80vmin;
    height: 80vmin;
    border-radius: 50%;
    background-color: #607ff1;
    filter: blur(20vmin);

    &:first-child {
        top: 10%;
        left: 10%;
        transform-origin: 0 0;
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
