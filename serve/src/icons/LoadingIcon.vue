<template>
    <div class="loading">
        <div class="item" v-for="i in 8" :style="{
            '--i': i * 0.1 + 's',
        }"></div>
    </div>
</template>

<style lang="scss" scoped>
.loading {
    --time: 0.8s;
    height: 100px;
    width: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;
    margin: auto;

    .item {
        /* 设置动画 */
        background-color: $white;
        animation: run var(--time) infinite;
        animation-delay: calc(var(--i) - var(--time));

        &:nth-child(1) {
            grid-area: 1/1/2/2;
        }

        &:nth-child(2) {
            grid-area: 1/2/2/3;
        }

        &:nth-child(3) {
            grid-area: 1/3/2/4;
        }

        &:nth-child(4) {
            grid-area: 2/3/3/4;
        }

        &:nth-child(5) {
            grid-area: 3/3/4/4;
        }

        &:nth-child(6) {
            grid-area: 3/2/4/3;
        }

        &:nth-child(7) {
            grid-area: 3/1/4/2;
        }

        &:nth-child(8) {
            grid-area: 2/1/3/2;
        }
    }

    @keyframes run {
        0% {
            transform: scale(0.9);
            opacity: 0;
        }

        10% {
            transform: scale(1);
            opacity: 1;
        }

        33% {
            transform: scale(1);
            opacity: 1;
        }

        66% {
            transform: scale(0.1);
            opacity: 0;
        }

        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }
}
</style>