<template>
    <div class="subjectpart">
      <div v-for="(item, index) in subjectsWithTips" :key="index">
        <div v-if="item.showTip" class="tip">{{ $t(item.tip) }}</div>
        <div class="item">
          <div class="title"><p>{{ item.filename }}</p></div>
          <div class="time"><p>{{ item.time }}</p></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const subjects = ref([]);
  const subjectsWithTips = ref([]);
  
  onMounted(async () => {
    const email = getCookie("email");
    try {
      const res = await axios.get("http://127.0.0.1:8000/user", { params: { email } });
      if (res.data.length > 0) {
        subjects.value = res.data;
        calculateSubjectsWithTips();
      } else {
        console.error('未找到相关用户数据');
      }
    } catch (error) {
      console.error('获取用户数据时出错：', error);
    }
  });
  
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
  .subjectpart {
    overflow-y: scroll;
    margin-left: 10px;
    .tip {
      margin-bottom: 0px;
      font-weight: bold;
    }
    .item {
      background-color: rgba(255, 255, 255, 0);
      border-radius: 5px;
      backdrop-filter: blur(10px);
      padding: 5px 5px;
      margin: 15px;
      cursor: pointer;
      transition: .5s;
      &:hover {
        transform: translateY(-10px)
      }
    }
  }
  </style>
  