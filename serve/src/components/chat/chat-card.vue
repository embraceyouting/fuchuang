<template>
    <section class="chat-card" :class="{ 'user': isUser }"  ref="textRef">
        <div class="avatar">
            <el-avatar :src="imgSrc" :class="{ nobg: !isUser }">{{ username }}</el-avatar>
        </div>
        <div class="content" :class="{ 'user': isUser }">
            <span class="name">{{ username }}</span>
            <span class="text" :class="{ 'enter': !item.isEnd }" v-html="html"></span>
            <ChatFiles v-if="item.files && item.files.length" class="files" :files="item.files"></ChatFiles>
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Assistant from './image/assistant_normal.png';
import AssistantLoading from './image/assistant_loading.png'
import AssistantDie from './image/assistant_die.png'
import { marked } from 'marked'
import { useUserStore } from '@/store/user';
import ChatFiles from './chat-files.vue';

const userStore = useUserStore()

const textRef = ref(null)

const props = defineProps({
    item: Object,
    isDie: Boolean
})
const isUser = computed(() => props.item.type === 'user')
const html = computed(() => isUser.value ? props.item.text : marked(props.item.text))
const imgSrc = computed(() => {
    if (isUser.value)
        return userStore.userInfo?.avatar

    return !props.item.isEnd ? AssistantLoading : props.isDie ? AssistantDie : Assistant
})
const username = computed(() => props.item.type === 'user' ? userStore.userInfo?.username || '访客' : '小助手')

onMounted(() => {
    watch(() => props.item.text, () => {
        textRef.value.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }, { immediate: true })
})
</script>

<style scoped lang="scss">
.chat-card {
    display: flex;
    align-items: flex-start;
    padding-bottom: 20px;

    &.user {
        flex-direction: row-reverse;
        gap: 20px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;

        .nobg {
            background: unset !important;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 80%;

        :deep(*) {
            @import '../../scss/md.scss';
        }

        &.user {
            align-items: flex-end;

            .files {
                flex-direction: row-reverse;
            }
        }

        .name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .text {
            font-size: 14px;
            line-height: 1.4;
            max-width: 100%;
            color: #111111;

            &.enter {

                &>:deep(*:last-child),
                &:not(:has(*)) {

                    &::after {
                        content: "";
                        position: relative;
                        margin-left: 2px;
                        vertical-align: -2px;
                        display: inline-block;
                        width: 5px;
                        height: 16px;
                        background-color: #ffffff;
                        animation: blink 0.5s infinite;

                        @keyframes blink {
                            0% {
                                opacity: 0;
                            }

                            50% {
                                opacity: 1;
                            }

                            100% {
                                opacity: 0;
                            }
                        }
                    }
                }
            }
        }

        .files {
            margin-top: 12px;
        }
    }
}
</style>