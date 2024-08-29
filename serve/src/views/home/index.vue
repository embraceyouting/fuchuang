<template>
    <main>
        <div class="title" v-animate="{ direction: 'top', offset: 40 }">
            <div class="text_title">
                <div class="text">Fly View</div>
                <div class="sub_text">
                    <p>{{ $t('text.one') }}</p>
                    <p>{{ $t('text.two') }}</p>
                </div>
                <div>
                    <div class="intro_div">
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
            <section v-for="(card, index) in cardList" v-animate="{ direction: index % 2 ? 'left' : 'right' }"
                :key="card.icon" class="card">
                <component :is="card.icon" class="icon" style="width: 400px;height: 400px;"></component>
                <div class="content">
                    <h4>{{ card.title }}</h4>
                    <p>{{ card.content }}</p>
                </div>
            </section>
        </div>

        <Contact class="contact" v-animate="{ direction: 'bottom', offset: 40 }"></Contact>
    </main>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from "vue";
import WebSite from "@/icons/WebSite.vue";
import BigData from "@/icons/BigData.vue";
import SelectApp from "@/icons/SelectApp.vue";
import nightingale from "@/components/visualization/nightingale.vue";
import radar from "@/components/visualization/radar.vue";
import Contact from "@/components/contact/index.vue";
import { getCurrentInstance } from 'vue'
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const intro = introJs()
onMounted(() => {
    setTimeout(() => {
        intro.setOptions({
            theme: 'modern',
            steps: [
                {
                    element: document.querySelector('.bar_right').children[1],
                    intro: '点击上传文件',
                    title: "第一步",
                },
            ],
            totalSteps: 2,
            doneLabel: 'Next',
            exitOnEsc: true,
        });
    }, 1000)
    let title1 = document.querySelectorAll(".content")[0].firstChild;
    let title2 = document.querySelectorAll(".content")[2].firstChild;
    title1.classList.add('contenta')
    title2.classList.add('contenta')
    title1.addEventListener('click', () => {
        router.push('/submit?intro=1')
    });
    title2.addEventListener('click', () => {
        router.push('/visualization')
    });

})


function handleClick() {
    intro.start();
    intro.oncomplete((_, status) => {
        if (status == 'done') {
            router.push('/submit?intro=1')
        }
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
            content: $t('card.content1')
        },
        {
            title: $t('card.title5'),
            icon: nightingale,
            content: $t('card.content5')
        },
        {
            title: $t('card.title2'),
            icon: BigData,
            content: $t('card.content2')
        },
        {
            title: $t('card.title6'),
            icon: radar,
            content: $t('card.content6')
        },
        {
            title: $t('card.title3'),
            icon: SelectApp,
            content: $t('card.content3')
        },

    ]
})


</script>

<style scoped lang="scss">
@import 'intro.js/introjs.css';

.title {

    .text_title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20vh auto 25vh;

        .text {
            font-size: 140px;
            font-weight: 800;
            background-image: linear-gradient(to right, white, #71a2f2);
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
                font-size: 26px;
                font-family: "Paytone One", "PingFangSC", sans-serif;
                color: #212121b0;
                letter-spacing: 1px;
            }
        }

        .intro_div {
            margin-top: 20px;

            .intro_a {
                box-sizing: content-box;
                text-decoration: none;
                font-size: 20px;
                color: aliceblue;
                padding: 8px 16px;
                background-color: $light-color;
                box-shadow: 0 6px $dark-color;
                border-radius: 12px;
                transition: all 0.1s ease;

                &:hover {
                    filter: brightness(0.9);
                }

                &:active {
                    padding: 6px 16px 10px;
                    outline: $dark-color 2px solid;
                    box-shadow: 0 0 $dark-color;
                }

                .icon {
                    width: 1em;
                    height: 1em;
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
    max-width: 880px;
    width: 90%;
    gap: 40px;

    .card {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;

        &:nth-child(odd) {
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50%;
                width: 200vw;
                height: 100%;
                z-index: -1;
                background-color: $light-color;
            }
        }

        svg {
            width: 400px;
            height: 400px;
        }

        .content {
            flex: 1;
            line-height: 1.5;
            margin: 40px 30px;

            .contenta {
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }

            h4 {
                margin-top: 0;
                margin-bottom: 20px;
                font-size: 20px;
                text-indent: 0;
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
                margin-bottom: 48px;

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
        box-shadow: 0 0 25px rgb(220, 146, 137), 0 0 25px rgb(220, 146, 137), 0 0 25px rgb(220, 146, 137);
    }

    50% {
        box-shadow: 0 0 30px #ffffff, 0 0 30px #ffffff, 0 0 30px #ffffff;
    }

    100% {
        box-shadow: 0 0 35px rgb(85, 107, 221), 0 0 40px rgb(85, 107, 221), 0 0 55px rgb(85, 107, 221);
    }
}

.glowing-border {
    border: 2px solid transparent;
    border-radius: 5px;
    // animation: glowing 4s linear infinite alternate;
}

.contact {
    margin-top: 240px;
}

@media screen and (max-width: 768px) {
    .title {
        .text_title {
            .text {
                font-size: 15vmin;
            }

            .sub_text {
                margin: 40px 60px;

                p {
                    font-size: 16px;
                }
            }

            .intro_div {
                .intro_a {
                    font-size: 16px;
                }
            }
        }
    }

    svg,
    :deep(.chart) {
        transform: scale(0.8);
    }

    .contact {
        margin-top: 60px;

        :deep(.icon) {
            transform-origin: right bottom;
            transform: scale(0.8);
            bottom: -20%;
            right: -10%;

        }

        :deep(.float) {
            display: none;
        }
    }
}
</style>
