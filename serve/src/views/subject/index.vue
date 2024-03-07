<template>
    <Navbar></Navbar> 
    <div class="main">
        <div class="side_part">
            <div class="title">My Subject</div>
            <div class="name_file" v-for="item in subjects" :key="item.id" @mouseenter="scrollText($event, item.filename)" @mouseleave="stopScroll($event)">
                <p class="over">{{ item.filename }}</p>
            </div>
        </div>
        <div class="middle_part"></div>
    </div>
</template>

<script setup lang="js">
import Navbar from "../../components/navbar/navbar.vue"
import { ref } from "vue"
import axios from "axios"

const subjects = ref([]);

axios.get("http://127.0.0.1:8000/subject")
  .then(res => {
    subjects.value = res.data; // Assuming the response is an array of subjects
    console.log(subjects.value)
  })
  .catch(error => {
    console.error("Error fetching subjects:", error);
  });

function scrollText(event, text) {
    // 当鼠标悬停在文本上时，滚动文本显示完整内容
    const element = event.target;
    const if_scroll = element.offsetWidth-element.scrollWidth;
    if (if_scroll){
        element.setAttribute("title", text); // 将完整文本内容作为标题
        element.querySelector('.over').style.animation = "5s scroll linear infinite";
    } 
}

function stopScroll(event) {
    // 当鼠标移出文本时，停止滚动动画
    const element = event.target;
    element.querySelector('.over').style.animation = "";
}
</script>

<style>
.side_part {
    width: 200px;
    padding: 10px;
    height: 80%;
    background-color: #ffff;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}
.main {
    display: flex;
    align-items: center;
    height: calc(100vh - 55px); /* 剩下页面高度减去导航栏高度 */
    min-height: 500px;
}
.title {
    height: 50px;
    border-bottom: #dbdbdb 1px solid;
    text-align: center;
    font-family: "Paytone One", sans-serif;
    font-weight: 200;
    font-style: normal;
    color: #5f86ea;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center; /* 垂直居中 */
}

.name_file {
    height: 50px;
    border-bottom: #dbdbdb 1px solid;
    text-align: center;
    font-family: "Paytone One", sans-serif;
    font-weight: 200;
    font-style: normal;
    color: #97afeb;
    overflow: hidden;
    white-space: nowrap; /* 禁止换行 */
    text-overflow: ellipsis; /* 使用省略号表示超出部分 */
    cursor: pointer; /* 禁止手型光标 */
    display: flex;
    justify-content: center;
    align-items: center; /* 垂直居中 */
}

.name_file p {
    margin: 0;
}

/* 滚动动画 */
@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-20%);
    }
    50%{
        transform: translateX(0%);
    }
    75% {
        transform: translateX(20%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
