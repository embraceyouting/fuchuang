<template>
    <div class="main">
        <div class="change_info">
            <label for="">用户名：</label>
            <input type="text" v-model.trim="userdata.name" :maxlength="11">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
        <div class="change_info">
            <label for="">电子邮件：</label>
            <input type="text" v-model.trim="userdata.email" @input="formatEmail">
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, reactive } from "vue";
import axios from 'axios';

const username = getCookie("name");
const userdata = reactive({
    name: '',
    password: '',
    email: '',
});

axios.get("http://127.0.0.1:8000/user", { params: { username: username } })
    .then(res => {
        const { username: name, password, email } = res.data[0];
        Object.assign(userdata, { name, password, email });
    })
    .catch(error => {
        console.error('获取用户数据时出错：', error);
    });

const formatEmail = () => {
    userdata.email = userdata.email.trim().replace(/(@qq\.com$)|[^a-zA-Z0-9_\-.@]/g, '');
}
</script>

<style scoped lang="scss">
.main {
    width: 50%;
    max-width: 800px;
    min-width: 291px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 25px;
    background-color: #ffffff;
    border-radius: 25px;
    padding: 25px 50px 50px 50px;

    .change_info { 
        margin-top: 25px;
        input {
            font-size: 16px;
            border: none;
            line-height: 1.5;
            text-decoration: underline 1px solid #000000;
            text-underline-offset: 4px;
            outline: none;
            background-color: #ffffff;
            max-width: 300px; 
        }
    }
}
</style>
