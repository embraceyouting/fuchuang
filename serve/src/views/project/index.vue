<template>
  <div>
    <header>
      <button class="span prev" :disabled="current <= 0" @click="current--">
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
        <em>上一篇</em>
      </button>
      <p>
        <span class="pagation">{{ current + 1 }}/{{ projectIdList.length }}</span>
        <b>{{ currentProject?.title }}</b>
        <button @click="goBack">返回</button>
      </p>
      <button class="span next" :disabled="current >= projectList.length - 1" @click="current++">
        <em>下一篇</em>
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </button>
    </header>
    <ElEmpty v-if="!finish" description="生成评分报告中..."></ElEmpty>
    <iframe v-else :src="currentProject?.src" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import service from '@/service';
import { ElEmpty } from 'element-plus';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { computed, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const projectIdList = route.params.id;
const finish = ref(false)
const projectList = ref([])
const current = ref(0)
const currentProject = computed(() => projectList.value[current.value])

// iframe 跳转会导致路由也改变 用这个方法来跳转
let goCount = 0
watch(() => current.value, () => {
  goCount--
}, { immediate: true })
function goBack() {
  router.go(goCount)
}

const getPdf = (id) => {
  return service.get(`/subject/${id}`)
    .then(async res => {
      if (!res.data.path_pdf) {
        return await new Promise(resolve => setTimeout(() => {
          const info = getPdf(id)
          info && resolve(info)
        }, 1000))
      }
      return {
        src: import.meta.env.VITE_BASE_URL + res.data.path_pdf,
        title: res.data.title,
        url: res.data.url
      }
    })
}

onMounted(() => {
  Promise.all(projectIdList.map(id => getPdf(id))).then(res => {
    projectList.value = res
    finish.value = true
  })
});
</script>

<style scoped lang="scss">
html,
body {
  overflow: hidden;

  div {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      backdrop-filter: blur(10px);
      background-color: #ffffffcc;
      color: #111;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;

      @media (prefers-color-scheme: dark) {
        background-color: #3b3b3baa;
        color: $white;
      }

      .span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        line-height: 1;
        font-size: 14px;
        cursor: pointer;
        background-color: unset;
        border: unset;
        padding: 0;
        color: inherit;

        &:disabled {
          cursor: not-allowed;
          filter: brightness(0.5);
        }

        em {
          font-style: normal;
        }
      }

      p {
        margin: auto;
        color: inherit;

        .pagation {
          margin-right: 8px;
        }

        b {
          margin: 0 12px;
          color: inherit;
          background-color: #1113;
          padding: 6px 16px;
          line-height: 1;
          border-radius: 4px;
          font-weight: 400;
        }

        button {
          border: none;
          background-color: unset;
          color: inherit;

          &:hover {
            color: $color;
          }
        }
      }
    }

    iframe {
      flex: 1;
      width: 100%;
    }

    .el-empty {

      :deep(.el-empty__description) {
        p {
          margin-top: 20px;
          color: white;
        }
      }

    }
  }


}
</style>
