<template>
    <main>
        <Chat class="chat" />
    </main>
</template>

<script setup>
import Chat from '@/components/chat/chat.vue'
import pubsub from '@/utils/pubsub';
import { ElMessage } from 'element-plus';
import { onDeactivated, onActivated } from 'vue';

defineOptions({
    name: 'chat'
})

function error(msg) {
    ElMessage.error(msg)
}

pubsub.on('error', error)

onDeactivated(() => {
    pubsub.off('error', error)
})

onActivated(() => {
    pubsub.on('error', error)
})

</script>

<style scoped lang="scss">
main {
    height: calc(100vh - 60px);
}
</style>