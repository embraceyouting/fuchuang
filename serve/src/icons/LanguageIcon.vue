<template>
    <ChineseIcon v-if="language === 'zh'"></ChineseIcon>
    <EnglishIcon v-else></EnglishIcon>
</template>

<script lang="js" setup>
import EnglishIcon from '@/icons/EnglishIcon';
import ChineseIcon from '@/icons/ChineseIcon';
defineProps({
    language: String
})
</script>