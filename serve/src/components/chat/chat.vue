<template>
    <div class="chat">
        <div v-if="!messageList.length" class="content center">
            <LogoIcon></LogoIcon>
            <h2><em>Fly View</em> {{ $t('gpt.assistant') }}</h2>
            <ul class="list">
                <li v-for="info in infos" class="card">
                    <div>
                        <img :src="info.img" alt="">
                    </div>
                    <span>{{ $t(info.text) }}</span>
                </li>
            </ul>
        </div>
        <div class="content" v-else>
            <h4>
                <el-icon @click="goBack">
                    <ArrowLeftBold />
                </el-icon>
                <span>GPT 4.0</span>
            </h4>
            <ChatCard v-for="(item, index) in messageList" :key="index" :item="item"
                :isDie="index !== messageList.length - 1"></ChatCard>
        </div>
        <ElForm class="input" @submit.prevent="search"
            :class="{ cancle: isEnter }">
            <ElButton v-if="isEnter"
                class="cancle" native-type="button" @click="cancle">取消对话</ElButton>
            <ElInput type="textarea" :disabled="!useUserStore().userInfo" :autosize="{ minRows: 1, maxRows: 6 }"
                v-model="key" placeholder="请输入内容" resize="none" @keydown.enter="search">
            </ElInput>
            <ElButton native-type="submit" @click="search"
                :disabled="!useUserStore().userInfo || isEnter || !key">
                <ElIcon>
                    <SubmitIcon />
                </ElIcon>
            </ElButton>
        </ElForm>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ChatCard from './chat-card.vue';
import { ElIcon } from 'element-plus';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import SubmitIcon from '@/icons/SubmitIcon.vue';
import LogoIcon from '@/icons/Logo.vue';
import Assistant from './image/assistant_normal.png';
import AssistantLoading from './image/assistant_loading.png'
import AssistantDie from './image/assistant_die.png'
import { getToken } from '@/utils/token';
import { useUserStore } from '@/store/user';
import { computed } from 'vue';

const messageList = ref([]);
const isEnter = computed(() => messageList.value[messageList.value.length - 1] && !messageList.value[messageList.value.length - 1].isEnd)
const key = ref('');
const infos = ref([
    {
        text: "gpt.text1",
        img: AssistantDie
    },
    {
        text: "gpt.text2",
        img: AssistantLoading
    },
    {
        text: "gpt.text3",
        img: Assistant
    }
])

let source = null;

function search(e) {
    if (e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    if (!key.value.trim()) return
    messageList.value.push({ text: key.value, type: "user", isEnd: true })
    source = new EventSource(`${import.meta.env.VITE_API_URL}gpt?key=${key.value}&token=${getToken()}`);
    key.value = '';
    const obj = reactive({ text: '', type: "assistant", isEnd: false })
    messageList.value.push(obj);
    source.onmessage = (event) => {
        const data = JSON.parse(event.data).msg;
        if (data === "[DONE]") {
            source.close();
            obj.isEnd = true;
            return
        }
        obj.text += data;
    };

    source.onerror = (event) => {
        source.close();
        obj.isEnd = true;
        obj.text = "出错了，请检查登录状态后重试..."
        source.onmessage = null
        source.onerror = null
        source = null
    };
}

function cancle() {
    if (!source) return
    source.close();
    messageList.value[messageList.value.length - 1].isEnd = true
}

function goBack() {
    cancle()
    messageList.value = []
}
</script>

<style scoped lang="scss">
.chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 90%;
    max-width: 740px;

    .content {
        flex: 1;
        padding-bottom: 20px;
        overflow-y: auto;
        mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
        scroll-behavior: smooth;

        &.center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            svg {
                width: 200px;
                height: 200px;
                margin-bottom: 20px;
            }

            h2 {
                color: $white;

                em {
                    font-style: normal;
                    font-family: "Paytone One", "PingFangSC", sans-serif;
                    background: linear-gradient(45deg, #ffcc00 20%, #f200ff 50%, #ffffff);
                    background-clip: text;
                    color: transparent;
                }
            }

            .list {
                display: flex;
                margin-top: 30px;
                align-items: flex-start;
                padding: 0 50px;
                width: 100%;
                list-style: none;
                cursor: pointer;
                gap: 30px;

                .card {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: #fff3;
                    padding: 12px 20px 24px;
                    gap: 12px;
                    border-radius: 12px;
                    transition: box-shadow 0.3s;

                    &:hover {
                        box-shadow: 0 2px 16px -4px #0003;
                    }

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    span {
                        font-size: 14px;
                        line-height: 1.5;
                        text-align: center;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }

        h4 {
            margin: 40px auto;
            text-align: center;
            font-size: 20px;
            display: flex;
            align-items: center;
            position: relative;

            .el-icon {
                position: absolute;
                cursor: pointer;
            }

            span {
                margin: auto;
            }
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .input {
        position: relative;
        margin-bottom: 24px;
        display: flex;
        align-items: flex-end;
        background-color: #fffa;
        border-radius: 12px;

        &.cancle {
            margin-top: 60px;
        }

        .el-textarea {
            :deep(.el-textarea__inner) {
                background-color: unset;
                border-radius: unset;
                border: unset;
                outline: unset;
                box-shadow: unset;
                padding: 12px 14px 12px 14px;
                line-height: 1.5;
            }
        }

        .el-button {
            all: unset;
            height: 36px;
            width: 36px;
            margin-right: 6px;
            margin-bottom: 4px;

            &.cancle {
                position: absolute;
                top: -125%;
                left: 50%;
                width: fit-content;
                box-sizing: content-box;
                background-color: $white;
                padding: 4px 12px;
                margin: unset;
                border-radius: 4px;
                transform: translateX(-50%);
                transition: box-shadow 0.3s;

                &:hover {
                    box-shadow: 0 0 0 2px $color;
                }

                &:active {
                    filter: brightness(0.9);
                }
            }

            &:disabled {
                filter: brightness(1.4);
            }

            .el-icon {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                color: white;
                display: flex;
                cursor: pointer;
                align-items: center;

                svg {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
}
</style>