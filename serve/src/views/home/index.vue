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
            <div v-for="(card, index) in cardList" v-animate="{ direction: index % 2 ? 'left' : 'right' }"
                :key="card.icon" class="card">
                <component :is="card.icon" class="icon" style="width: 400px;height: 400px;"></component>
                <div class="content">
                    <h4>{{ card.title }}</h4>
                    <p>{{ card.content }}</p>
                </div>
            </div>
        </div>

        <Contact v-animate="{ direction: 'bottom', offset: 40 }"></Contact>
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
                    title: "第一步"
                },
            ],
            totalSteps: 2,
            doneLabel: 'Next'
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
            content: $t('card.content1')
        },
        {
            title: "比重",
            icon: nightingale,
            content: "我们根据不同使用者的关注点和对网站体验的期望进行比重调整，灵活调整体验报告中各方面的比重。通过这一模块，我们能够更准确地反映用户的需求，提供个性化的体验报告。例如，如果当前使用者更关注网站的渲染速度和使用流畅度，我们可以调整这些方面在体验报告中的比重，以更好地满足用户的期望。这种灵活的比重调整机制使得我们能够针对不同的使用者和不同类型的网站提供更贴合实际需求的体验报告"
        },
        {
            title: $t('card.title2'),
            icon: BigData,
            content: $t('card.content2')
        },
        {
            title: "平均水平",
            icon: radar,
            content: "基于广泛的数据汇总和分析，针对网站体验的各个方面进行评估和比较。通过这一模块，我们能够将用户的网站体验与行业平均水平进行对比，帮助用户更清晰地了解其网站在不同方面的表现优势和改进空间。包括但不限于页面加载速度、交互响应时间、用户界面设计等指标。然后，将这些指标与相应行业或类似类型的网站进行比较，计算出每个方面的平均水平，了解其网站在各个方面的表现如何"
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
        margin: 25vh auto;

        .text {
            font-size: 120px;
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
                font-size: 23px;
                font-family: "Paytone One", "PingFangSC", sans-serif;
                color: #212121b0;
                letter-spacing: 1px;
            }
        }

        .intro_div {
            transition: all 0.5s ease;
            margin-top: 20px;

            .intro_a {
                text-decoration: none;
                font-size: 23px;
                color: aliceblue;
                padding: 8px 16px;
                background-color: #ffffff33;
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
    max-width: 850px;
    width: 90%;

    .card {
        width: 100%;
        display: flex;
        align-items: center;

        svg {
            width: 400px;
            height: 400px;
        }

        .content {
            flex: 1;
            line-height: 1.5;
            margin: 0 30px;

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
}

.glowing-border {
    animation: glowing 4s linear infinite alternate;
}
</style>
