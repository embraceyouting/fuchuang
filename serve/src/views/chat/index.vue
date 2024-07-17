<template>
    <main>
        <Chat class="chat" />
    </main>
</template>

<script setup>
import Chat from '@/components/chat/chat.vue'
import pubsub from '@/utils/pubsub';
import { ElMessage } from 'element-plus';
import { onBeforeUnmount } from 'vue';

function error(msg) {
    ElMessage.error(msg)
}

pubsub.on('error', error)

onBeforeUnmount(() => {
    pubsub.off('error', error)
})

</script>

<style scoped lang="scss">
main {
    height: calc(100vh - 60px);
}
</style>