<template>
    <MaleIcon v-if="gender"></MaleIcon>
    <FemaleIcon v-else></FemaleIcon>
</template>

<script lang="js" setup>
import MaleIcon from '@/icons/MaleIcon';
import FemaleIcon from '@/icons/FemaleIcon';
defineProps({
    gender: {
        type: Number,
        default: 1
    }
})
</script>