<template>
    <Navbar></Navbar> 
    <div class="main">
        <div class="side_part">
            <div class="title">My Subject</div>
            <div class="scoll_part">
                <div class="name_file" v-for="(item,index) in subjects" :key="item.id" @mouseenter="scrollText($event, item.filename)" @mouseleave="stopScroll($event)">
                    <router-link class="over" :to="`/subject/${item.filename}`">{{ item.filename }}</router-link>
                    <div class="icon_dlt" @click="delete_json(item,index)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-round_delete"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle_part">
            <div class="echarts">
                <echarts_percent></echarts_percent>
                <echarts_percent2></echarts_percent2>
            </div>
            <div class="vary_part"></div>
        </div>
    </div>
    <div class="delete_part" v-if="ispreview_delete">
            <div class="model_background"></div>
            <div class="choose_delete">
                <p>Cancel the transfer of <a onclick="event.preventDefault()">{{ delete_item }}</a> ?</p>
                <div class="delete_btns">
                    <button @click="cancelDelete">Cancel</button>
                    <button @click="confirmDelete">OK</button>
                </div>
        </div>
    </div>
</template>

<script setup lang="js">
import Navbar from "../../components/navbar/navbar.vue"
import echarts_percent from "../../components/subject/echarts_percent.vue"
import echarts_percent2 from "../../components/subject/echarts_percent2.vue"
import { ref } from "vue"
import axios from "axios"


let ispreview_delete = ref(false);
let delete_item = ref(null);
const subjects = ref([]);
let isdelete = ref(null);
let resolveBeforeRemove;

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

function delete_json(item,index){
    ispreview_delete.value = true
    delete_item.value = item.filename;
    console.log(delete_item.value)
    new Promise(resolve => {resolveBeforeRemove = resolve;})
    .then(result => {
        if (result) {
            subjects.value.splice(index, 1);
        }
    });
}

function stopScroll(event) {
    // 当鼠标移出文本时，停止滚动动画
    const element = event.target;
    element.querySelector('.over').style.animation = "";
}


function confirmDelete() {
    axios.delete(`http://127.0.0.1:8000/subject/delete?filename=${delete_item.value}`)
    .then((response) => {
    // 请求成功，处理响应的数据
    console.log(response.data);
    })
    .catch((error) => {
    // 请求失败，处理错误
    console.error(error);
    });
    ispreview_delete.value = false;
    isdelete.value = true;
    resolveBeforeRemove(isdelete.value);
}

function cancelDelete() {
    ispreview_delete.value = false;
}


</script>

<style scoped>

.scoll_part::-webkit-scrollbar{
    width: 8px;
}

.scoll_part::-webkit-scrollbar-thumb {
    background: #91b6ff;
    border-radius: 5px;
}

.scoll_part::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #ffffff 
}
.side_part {
    padding: 10px 0px 10px 0px;
    height: 88%;
    background-color: #ffff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    flex-direction: column;
    min-width: 250px;
}
.scoll_part {
    overflow-y: auto;
}
.main {
    display: flex;
    align-items: flex-start;
    margin-top: 57px;
    justify-content: space-between;
    height: calc(100vh - 112px); /* 剩下页面高度减去导航栏高度 */
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
    font-size: 28px;
    display: flex;
    justify-content: center;
    padding: 0 0 10px 0;
    box-shadow: 0 8px 6px -6px #97afeb;
    
}

.name_file {
    height: 50px;
    padding: 0 10px 0 10px;
    border-bottom: #dbdbdb 1px solid;
    text-align: center;
    font-family: "Paytone One", sans-serif,"YouYuan";
    font-weight: 200;
    font-style: normal;
    color: #97afeb;
    overflow: hidden;
    white-space: nowrap; /* 禁止换行 */
    text-overflow: ellipsis; /* 使用省略号表示超出部分 */
    display: flex;
    justify-content: space-between;
    align-items: center; /* 垂直居中 */
}

.name_file a {
    margin: 0;
    text-decoration: none;
    color: #97afeb;
    cursor: pointer; /* 禁止手型光标 */
}

.middle_part{
    margin-right: 20%;
    min-width: 640px;
    width: 60%;
}

.echarts{
    display: flex;
    justify-content: space-between;
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

.icon_dlt{
    display: float;
    float: right;
    display: none;
}
.icon {
    width: 0.8em;
    height: 0.8em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    cursor: pointer; /* 禁止手型光标 */
}

.name_file:hover .icon_dlt{
    display: block;
}


.delete_part {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.model_background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(185, 185, 185, 0.5);
}

.choose_delete {
    z-index: 10;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    text-align: center;
}

.choose_delete p{
    color: rgb(95, 95, 95);
    font-family: "Paytone One", sans-serif;
    font-weight: 200;
    font-style: normal;
}


.delete_btns{
    display: float;
    float: right;
}



.delete_btns button{
    padding: 8px 15px;
    color: white;
    border-radius: 5px;
    border:0.5px solid #a5a6a7;
    background-color: #409eff;
    font-family: "Paytone One", sans-serif;
    font-weight: 200;
    font-style: normal;
    cursor: pointer;
}

.delete_btns button:first-child{
    margin-right: 20px;
    color: #7c7c7c;
    background-color: #ffff;
    border:0.5px solid #cccecf;
}
</style>
