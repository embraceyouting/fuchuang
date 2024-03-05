<template>
    <main>
        <div class="modal-container">
            <div class="modal-background"></div>
            <div class="middle_part">
                <div
                    style="width: 100%;display: flex; justify-content: space-between;  align-items: flex-end; /* 将内容垂直对齐到底部 */">
                    <div>
                        <router-link active-class="active" to="/home/login">Sign in</router-link>
                    </div>
                    <div>
                        <router-link class="sign" active-class="active" to="/home/signup">Sign up</router-link>
                    </div>
                </div>
                <form @submit="submit" style="display: flex; flex-direction: column;">
                    <label for="address">Email Address</label>
                    <input type="text" class="address" v-model="user.address">
                    <label for="username">Username</label>
                    <input type="text" class="username" v-model="user.username">
                    <label for="password">Password</label>
                    <input type="password" class="password" v-model="user.password">
                    <button class="button" type="submit" style="">Sign</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
export default {
    name: "sign_up",
    setup() {
        let user = reactive({
            username: "",
            password: "",
            address: "",
        })
        let router = useRouter();
        function submit(event) {
            event.preventDefault();
            const formData = {
                user_name: user.username,
                user_password: user.password,
                email_address: user.address
            };
            // 使用axios发送POST请求到Node.js后端
            axios.post('http://192.168.6.1:8000/submit-signup', formData).then(response => {
                console.log(response.data);
            })
                .catch(error => {
                    // 处理错误
                    console.error('表单提交出错', error);
                });
            user.username = '';
            user.password = '';
            user.address = '';
            router.push('/home/login');
        }

        watchEffect(() => {
            if (user.address.includes(" ")) {
                user.address = user.address.replace(/\s/g, '');
            }
            if (user.password.includes(" ")) {
                user.password = user.password.replace(/\s/g, '');
            }
            if (user.username.includes(" ")) {
                user.username = user.username.replace(/\s/g, '');
            }
        })
        return {
            user,
            submit
        }
    }
}

</script>


<style lang="css" scoped>
.middle_part {
    position: fixed;
    width: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.324);
    /* 使用红色背景并调整透明度 */
    backdrop-filter: blur(10px);
    /* 使用模糊效果，可以根据需要调整模糊程度 */
    border-radius: 20px;
    padding: 40px;
}

.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    /* 使模态框在最上层 */
}

.modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 174, 174, 0.5);
    /* 半透明背景颜色 */
    z-index: -1;
    /* 将背景置于模态框下方 */
}

a {
    color: #000;
    text-decoration: none;
}

.active {
    color: #000;
    text-decoration: underline;
    font-size: 25px;
}

input:hover {
    transform: translateY(-3px);
    /* 添加向上移动的悬浮效果 */
}

input:focus {
    transform: translateY(-3px);
    /* 添加向上移动的悬浮效果 */
}

button:hover {
    transform: translateY(-3px);
    /* 添加向上移动的悬浮效果 */
}

label {
    margin-top: 20px;
}

.hljs-center {
    text-align: center;
    background-color: black;
}

.button {
    width: 100%;
    margin: 0 auto;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.124);
    /* 使用红色背景并调整透明度 */
    border: 1px solid #f3c9c9;
    border-radius: 15px;
    height: 35px;
    margin-top: 35px;
    background: -webkit-linear-gradient(left, #9bb3ea, #eda7b4);
    box-shadow: #f2c4cd 0 1px 0;
    transition: all 0.5s ease-in-out;
}

.button:hover {
    cursor: pointer;
}

input {
    width: 100%;
    font-size: 15px;
    font-weight: 200;
    text-indent: 20px;
    /* 指定缩进的像素值 */
    outline: none !important;
    border-radius: 15px;
    height: 35px;
    border: 1px solid #ebd5d5;
    backdrop-filter: blur(10px);
    /* 使用模糊效果，可以根据需要调整模糊程度 */
    background-color: transparent;
    /* 使用红色背景并调整透明度 */
    margin-top: 10px;
    box-shadow: 0 3px 0 rgba(247, 195, 195, 0.2);
    /* 在底部添加阴影，模拟浮动效果 */
    transition: all 0.5s ease-in-out;

}</style>