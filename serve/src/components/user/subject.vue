<template>
  <div class="subjectpart">
    <div v-for="(item, index) in subjectsWithTips" :key="index" class="item" @click="router_to(item.filename)">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></img>
      <div class="itemInfo">
        <p>{{ item.filename }}</p>
        <p>{{ item.time }}</p>
      </div>
      <!-- #region -->
      <!--<div class="ItemContainner">
        <el-space direction="vertical" alignment="flex-start">
          <el-skeleton
            style="width: 240px"
            :loading="loading"
            animated
            :throttle="500"
          >
            <template #template>
              <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
              <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 16px;
                    height: 16px;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </div>
            </template>
            <template #default>
              <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>{{ item.filename }}</span>
                  <div class="bottom card-header">
                    <div class="time">{{ currentDate }}</div>
                    <el-button text class="button">operation button</el-button>
                  </div>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-space>
      </div> -->
      <!-- #endregion -->
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted , nextTick } from 'vue';
import axios from 'axios';
import { getToken, decrypt } from '@/utils/token';
import waterFall from "../../utils/waterfallLayout.js";
import { useRouter } from 'vue-router';

const router = useRouter();
const subjects = ref([]);
const subjectsWithTips = ref([]);
const loading = ref(true)
const currentDate = new Date().toDateString()

onMounted(async () => {
  const { email } = decrypt(getToken());
  console.log(decrypt(getToken()))
  try {
    const res = await axios.get("http://127.0.0.1:8000/user", { params: { email } });
    if (res.data.length > 0) {
      subjects.value = res.data;
      calculateSubjectsWithTips();

      // 在组件异步渲染完成后执行瀑布流布局
      nextTick(() => {
        const el = document.querySelector('.subjectpart');
        if (el) {
          waterFall(el, 2, 20);
          loading.value = false
        }
      });

    } else {
      console.error('未找到相关用户数据');
    }
  } catch (error) {
    console.error('获取用户数据时出错：', error);
  }
});


function router_to(name){
  console.log(name);
  router.push(`/subject/${name}`);
}

function calculateSubjectsWithTips() {
  subjectsWithTips.value = subjects.value.map((item, index) => {
    const currentDate = parseDate(item.time).toDateString();
    const prevDate = index > 0 ? parseDate(subjects.value[index - 1].time).toDateString() : null;
    const showTip = prevDate !== currentDate;
    const tip = showTip ? formatDate(item.time) : '';
    return { ...item, showTip, tip };
  });
}

function parseDate(dateString) {
  return new Date(dateString);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (currentYear === year && currentMonth === month && currentDay === day) {
      return 'sub.today';
  } else if (
      currentYear === year &&
      currentMonth === month &&
      currentDay - day === 1
  ) {
      return 'sub.yesterday';
  } else {
      return `${year}-${month}-${day}`; // 大于一天的间隔，直接显示日期
  }
}
</script>

  
<style lang="scss" scoped>
.subjectpart{
  .item{
    border-radius: 10px;
    background-color: rgb(253, 253, 253);
    min-width: 243px;
    cursor: pointer;
    transition: all .4s;
    &:hover{
      box-shadow: 2px 2px 0px #ffffff33;
      transform: translateY(-5px);
    }
    img{
      border-radius: 10px 10px 0px 0px;
      width: 100%;
      height: auto;
    }

    .itemInfo{
      padding: 5px 10px;
    }
  }
}
</style>
  