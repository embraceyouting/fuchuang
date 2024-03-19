<template>
    <section class="chat-card" :class="{ 'user': isUser }">
        <div class="avatar">
            <img :src="imgSrc" />
        </div>
        <div class="content" :class="{ 'user': isUser }">
            <span class="name">{{ item.type }}</span>
            <span class="text" ref="textRef" :class="{ 'enter': !item.isEnd }" v-html="html"></span>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Assistant from './image/assistant_normal.png';
import AssistantLoading from './image/assistant_loading.png'
import AssistantDie from './image/assistant_die.png'
import { marked } from 'marked'

const textRef = ref(null)

const props = defineProps({
    item: Object,
    isDie: Boolean
})
const isUser = computed(() => props.item.type === 'user')
const html = computed(() => isUser.value ? props.item.text : marked(props.item.text))
const imgSrc = computed(() => {
    if (isUser.value)
        return 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'

    return !props.item.isEnd ? AssistantLoading : props.isDie ? AssistantDie : Assistant
})

onMounted(() => {
    watch(() => props.item.text, () => {
        textRef.value.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    })
})
</script>

<style scoped lang="scss">
.chat-card {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

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
        }

        .name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .text {
            font-size: 14px;
            line-height: 1.4;
            width: fit-content;
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
    }
}
</style>