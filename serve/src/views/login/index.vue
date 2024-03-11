<template>
    <main>
        <div class="modal-container">
            <div class="canvas">
                <img class="bihua" src="@/assets/image/bihua.png" alt="">
                <img class="fei" src="@/assets/image/fei.png" alt="">
                <img class="yue" src="@/assets/image/yue.png" alt="">
                <canvas ref="canvas"></canvas>
            </div>
            <div class="middle_part">
                <Login></Login>
            </div>
        </div>
    </main>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue';
import Login from '@/components/login/login.vue';
import { Application } from '@splinetool/runtime';

const canvas = ref(null);
onMounted(() => {
    const spline = new Application(canvas.value);
    spline.load('https://prod.spline.design/ALUwtc41bPXGlk81/scene.splinecode');
})
</script>


<style lang="scss" scoped>
main {
    height: 100vh;

    .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 40px;
        justify-content: center;
        align-items: center;
        z-index: 999;
        /* 使模态框在最上层 */

        .canvas {
            width: 480px;
            height: 480px;

            .bihua {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 100vh;
                z-index: -2;
                opacity: .8;
                user-select: none;
                filter: drop-shadow(0 10px 10px #0003);
            }

            .fei,
            .yue {
                height: 200px;
                position: absolute;
                user-select: none;
                z-index: -1;
            }

            .fei {
                top: 100px;
                left: 75px;
            }

            .yue {
                top: 300px;
                left: 200px;
            }
        }

        .middle_part {
            width: 700px;
            z-index: 100;
        }
    }
}
</style>