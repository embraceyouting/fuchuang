<template>
    <div class="data-status">
        <!-- 加载中：数据没有加载完毕 -->
        <Loading v-if="!isDataEnd || loading" ref="loadingRef"></Loading>
        <!-- 加载完毕：数据长度为0 -->
        <div class="no-data" v-else-if="!length">
            <el-empty description="暂无相关视频"></el-empty>
        </div>
        <!-- 所有数据加载完毕：数据不为零 -->
        <p class="no-more" v-else>暂时没有更多了</p>
    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import Loading from './Loading.vue'
let ob = null
const props = defineProps({
    length: Number,
    isDataEnd: Boolean,
    loading: Boolean
})

const emits = defineEmits(['more'])
const loadingRef = ref(null)
onMounted(() => {
    ob = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            emits('more')
        }
    }, {
        threshold: 0.3,
    })
    ob.observe(loadingRef.value.$el)
})

onBeforeUnmount(() => {
    ob && ob.unobserve(loadingRef.value.$el)
})
</script>

<style lang="scss" scoped>
.data-status {
    position: relative;

    .loading {
        padding: 10vh 0;
    }

    .no-data {
        padding: 10vh 0;
    }

    .no-more {
        padding: 10vh 0;
        text-align: center;
    }
}
</style>