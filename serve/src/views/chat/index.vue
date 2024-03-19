<template>
    <main>
        <Chat class="chat" />
    </main>
</template>

<script setup>
import Chat from '@/components/chat/chat.vue'
</script>

<style scoped lang="scss">
main {
    height: calc(100vh - 55px);
}
</style>