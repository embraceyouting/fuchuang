<template>
    <div id="bg">
        <div class="ball"></div>
        <div class="ball"></div>
    </div>
</template>

<style lang="scss" scoped>
#bg {
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: -99;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        transform: scale(1.1);
        filter: blur(20px);
        background: url('@/assets/image/bg.png') no-repeat;
        background: linear-gradient(45deg, #d4e7ff, #778bff);
        background-size: 200% 200%;
        animation: bg 10s linear infinite;

        @keyframes bg {
            0% {
                background-position: 0 0;
            }

            50% {
                background-position: 100% 100%;
            }

            100% {
                background-position: 0 0;
            }
        }
    }

    .ball {
        position: absolute;
        width: 80vmin;
        height: 80vmin;
        border-radius: 50%;
        background-color: #4971ff;
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

        @keyframes rotate {
            0% {
                transform: rotate(0);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }
}
</style>