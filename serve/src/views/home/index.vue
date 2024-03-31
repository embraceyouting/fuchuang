<template>
    <div style="height: calc(100vh - 55px);display: flex;align-items: center;justify-content: center;">
        <div class="text_title">
            <div class="text">Fly View</div>
            <div class="sub_text">
                <p>{{ $t('text.one') }}</p>
                <p>{{ $t('text.two') }}</p>
            </div>
            <div style="margin: auto;display: flex;justify-content: center;margin-top: 20px;">
                <div class="intro_div ">
                    <a href="#" class="intro_a glowing-border" @click="handleClick">
                        {{ $t('text.intro') }}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dianji"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="info">
        <div v-for="(card, index) in cardList" v-animate="{ direction: index % 2 ? 'left' : 'right' }" :key="card.icon"
            class="card">
            <component :is="card.icon" class="icon"></component>
            <div class="content">
                <h4>{{ card.title }}</h4>
                <p>{{ card.content }}</p>
            </div>
        </div>
    </div>

    <Contact v-animate="{ direction: 'bottom' }"></Contact>
</template>

<script setup lang="js">
import { reactive, ref, computed, onMounted, nextTick, watch, toRef, watchEffect } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import WebSite from "@/icons/WebSite.vue";
import BigData from "@/icons/BigData.vue";
import SelectApp from "@/icons/SelectApp.vue";
import Contact from "@/components/contact/index.vue";
import CodeEditor from "@/components/editor/code-editor.vue";
import { getCurrentInstance } from 'vue'
import { useUserStore } from "@/store/user";
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";

const intro = introJs()
const childComponent = ref(null);
onMounted(() => {
    setTimeout(() => {
        intro.setOptions({
            theme: 'modern',
            steps: [
                {
                    element: document.querySelector('.bar_right').children[1],
                    intro: '点击上传文件',
                    title: "第一步"
                },
            ],
            totalSteps: 2,
            doneLabel: 'Next'
        });
    }, 1000)
})
const router = useRouter()

function handleClick() {
    intro.start();
    intro.oncomplete(() => {
        router.push('/submit?intro=1')
    })
}

onUnmounted(() => {
    intro.exit();
})

const { $t } = getCurrentInstance().proxy

const cardList = computed(() => {
    return [
        {
            title: $t('card.title1'),
            icon: WebSite,
            content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
        },
        {
            title: $t('card.title2'),
            icon: BigData,
            content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
        },
        {
            title: $t('card.title3'),
            icon: SelectApp,
            content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
        }
    ]
})


</script>

<style scoped lang="scss">
@import 'intro.js/introjs.css';

.text_title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;

    .text {
        font-size: 120px;
        font-weight: 800;
        background-image: linear-gradient(to right, white, #88b5fd);
        /* Set the gradient colors */
        background-clip: text;
        color: transparent;
        background-size: 200% auto;
        background-position: left;
        /* Initial position to start from the left */
        animation: gradientAnimation 4s linear infinite alternate;
        /* Apply the animation */
        font-family: "Paytone One", "PingFangSC", sans-serif;
        user-select: none;
        letter-spacing: 6px;
        text-align: center;
    }

    .sub_text {
        margin: 40px 100px;

        p {
            margin: 0;
            text-align: center;
            font-size: 23px;
            font-family: "Paytone One", "PingFangSC", sans-serif;
            color: #212121b0;
            letter-spacing: 1px;
        }
    }

    .intro_div {
        transition: all 0.5s ease;

        .intro_a {
            text-decoration: none;
            font-size: 23px;
            color: aliceblue;
            padding: 8px 16px;
            background-color: rgba(255, 255, 255, 0.233);
            border-radius: 4px;
            transition: all 0.2s ease;

            &:hover {
                box-shadow: 5px 5px 10px -2px rgb(255, 255, 255);
            }

            .icon {
                width: 0.9em;
                height: 0.9em;
                vertical-align: -0.12em;
                fill: currentColor;
                overflow: hidden;
            }
        }

    }

    @keyframes gradientAnimation {
        0% {
            background-position: left;
            /* Start from the left */
        }

        100% {
            background-position: right;
            /* Move to the right */
        }
    }
}

.post_part {
    min-width: 300px;
    width: 80%;
    max-width: 720px;
    margin: 20px auto;
    margin-top: 40px;

    .upload-demo {

        :deep(.el-upload) {

            .el-upload-dragger {
                transition: .3s;
                background-color: transparent;
                height: 280px;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                border-width: 0px;
                position: relative;

                &:hover {
                    border-width: 4px;
                }

                &::before {
                    content: "";
                    position: absolute;
                    inset: 0px;
                    border-radius: inherit;
                    background-color: #fff9;
                }
            }

            .el-upload__text {
                color: white;
                margin-top: 4px;

                em {
                    color: #0048ff;
                }
            }
        }

        :deep(.el-upload__tip) {
            text-align: center;
            color: white;
            font-size: 14px;
        }
    }


}

.delete_part {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .model_background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(185, 185, 185, 0.5);
    }

    .choose_delete {
        z-index: 10;
        padding: 20px;
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        text-align: center;


        p {
            color: rgb(95, 95, 95);
            font-family: "Paytone One", "PingFangSC", sans-serif;
            font-weight: 200;
            font-style: normal;

            a {
                color: rgb(98, 208, 255);
                text-decoration-color: rgb(98, 208, 255);
            }
        }

        .delete_btns {
            display: float;
            float: right;

            button {
                padding: 8px 15px;
                color: white;
                border-radius: 5px;
                border: 0.5px solid #a5a6a7;
                background-color: #409eff;
                font-family: "Paytone One", "PingFangSC", sans-serif;
                font-weight: 200;
                font-style: normal;
                cursor: pointer;

                &:first-child {
                    margin-right: 20px;
                    color: #7c7c7c;
                    background-color: #ffff;
                    border: 0.5px solid #cccecf;
                }
            }
        }
    }
}

.editor-container {
    height: 400px;
    width: 80%;
    max-width: 720px;
    margin: 100px auto;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
    margin-left: auto;
    margin-right: auto;
    max-width: 820px;
    width: 90%;

    .card {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 30px;

        svg {
            width: 400px;
            height: 400px;
        }

        .content {
            flex: 1;

            h4 {
                margin-top: 0;
                margin-bottom: 20px;
                font-size: 20px;
            }
        }

        &:nth-child(even) {
            flex-direction: row-reverse;
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 0;

            .content {
                width: 80%;

                h4 {
                    text-align: center;
                }
            }

            &:nth-child(even) {
                flex-direction: column;
            }
        }
    }
}

@keyframes glowing {
    0% {
        box-shadow: 0 0 5px rgb(225, 214, 201), 0 0 10px rgb(225, 214, 201), 0 0 15px rgb(225, 214, 201);
    }

    50% {
        box-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff;
    }

    100% {
        box-shadow: 0 0 15px rgb(108, 127, 219), 0 0 30px rgb(108, 127, 219), 0 0 45px rgb(108, 127, 219);
    }
}

.glowing-border {
    border: 2px solid transparent;
    border-radius: 5px;
}

.glowing-border:hover {
    animation: glowing 4s linear infinite alternate;
}
</style>
