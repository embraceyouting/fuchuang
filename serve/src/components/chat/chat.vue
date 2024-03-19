<template>
    <div class="chat">
        <div v-if="!messageList.length" class="content center">
            <LogoIcon></LogoIcon>
            <h2><em>Fly View</em> 小助手</h2>
            <ul class="list">
                <li v-for="info in infos" class="card">
                    <div>
                        <img :src="info.img" alt="">
                    </div>
                    <span>{{ info.text }}</span>
                </li>
            </ul>
        </div>
        <div class="content" v-else>
            <ChatCard v-for="(item, index) in messageList" :key="index" :item="item"
                :isDie="index !== messageList.length - 1"></ChatCard>
        </div>
        <div class="input">
            <ElInput type="textarea" :autosize="{ minRows: 1, maxRows: 6 }" v-model="key" placeholder="请输入内容"
                resize="none">
            </ElInput>
            <ElIcon @click="search"
                :disabled="(messageList[messageList.length - 1] && !messageList[messageList.length - 1].isEnd) || !key">
                <SubmitIcon />
            </ElIcon>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ChatCard from './chat-card.vue';
import { ElIcon } from 'element-plus';
import SubmitIcon from '@/icons/SubmitIcon.vue';
import LogoIcon from '@/icons/Logo.vue';
import Assistant from './image/assistant_normal.png';
import AssistantLoading from './image/assistant_loading.png'
import AssistantDie from './image/assistant_die.png'
const messageList = ref([]);
const key = ref('');
const infos = ref([
    {
        text: "欢迎使用 FlyView，输入框内输入你想要的内容，点击发送即可。",
        img: AssistantDie
    },
    {
        text: "看不懂的 JSON 文件格式，让小助手帮你解析内容。",
        img: AssistantLoading
    },
    {
        text: "想知道 FlyView 的功能，输入 [help] 即可查看。",
        img: Assistant
    }
])

function search() {
    if (!key.value.trim()) return
    messageList.value.push({ text: key.value, type: "user", isEnd: true })
    const source = new EventSource("http://127.0.0.1:8000/gpt?key=" + key.value);
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
}
</script>

<style scoped lang="scss">
.chat {
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 90%;
    max-width: 720px;

    .content {
        flex: 1;
        padding-top: 20px;
        padding-bottom: 20px;
        overflow-y: auto;
        mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);

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
                padding: 0 60px;
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
    }

    .input {
        position: relative;
        margin-bottom: 24px;

        .el-textarea {
            :deep(.el-textarea__inner) {
                background-color: #fffa;
                border-radius: 12px;
                padding: 12px 48px 12px 14px;
                line-height: 1.5;
            }
        }

        .el-icon {
            position: absolute;
            right: 4px;
            bottom: 6px;
            border-radius: 50%;
            color: white;
            height: 36px;
            width: 36px;
            display: flex;
            cursor: pointer;
            align-items: center;

            svg {
                height: 36px;
                width: 36px;
            }
        }
    }
}
</style>