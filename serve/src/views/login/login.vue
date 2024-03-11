<template>
    <main>
        <div class="modal-container">
            <div class="modal-background"></div>
            <div class="middle_part">
                <div
                    style="width: 100%;display: flex; justify-content: space-between;  align-items: flex-end; /* 将内容垂直对齐到底部 */">
                    <div>
                        <router-link active-class="active" to="/login">Sign in</router-link>
                    </div>
                    <div>
                        <router-link class="sign" active-class="active" to="/signup">Sign up</router-link>
                    </div>
                </div>
                <form @submit="submit" style="display: flex; flex-direction: column;">
                    <label for="user_address">Email Address</label>
                    <input type="text" class="user_address" v-model="user.address">
                    <p v-if="if_wrong_name" style="margin: 0;color: red;font-size: 10px;margin-left: 5px;">邮箱格式不正确，请输入正确邮箱</p>
                    <label for="user_password">Password</label>
                    <input type="password" class="user_password" v-model="user.password">
                    <p v-if="if_wrong_pass" style="margin: 0;color: red;font-size: 10px;margin-left: 5px;">密码格式不正确，密码不小于8位</p>
                    <button class="button" type="submit" style="">Sign</button>
                </form>
            </div>
        </div>
    </main>
</template>
<script>
import { onMounted, reactive, watchEffect , ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: "login",
    setup() {
        let user = reactive({
            address: "",
            password: "",
        })
        let if_wrong_name=ref(false);
        let if_wrong_pass=ref(false);
        const qqEmailPattern = /^[1-9]\d{4,10}@qq\.com$/;
        const passwordPattern = /^[a-zA-Z0-9]{8,}$/;

        let store = useStore();
        let router = useRouter()
        let timer1 = null; // 定义定时器标识
        let timer2 = null; 
        function submit(event) {
            event.preventDefault();
            const formData = {
                user_name: user.address,
                user_password: user.password
            };
            // 使用axios发送POST请求到Node.js后端
            axios.post('http://127.0.0.1:8000/submit-login', formData)
                .then(response => {
                    // 处理后端响应
                    console.log(response.data);
                })
                .catch(error => {
                    // 处理错误
                    console.error('表单提交出错', error);
                });
            setCookie("name", user.address, 7);//如选中则添加Cookie，添加内容为用户输入的密码和用户名
            setCookie("pas", user.password, 7);
            user.address = '';
            user.password = '';
            if (store) {
                store.state.islogin = true;
            }
            localStorage.setItem("islogin", store.state.islogin);
            router.push('/home');
        }
        onMounted(() => {

        })

        watchEffect(() => {
            if (user.address.includes(" ")) {
                user.address = user.address.replace(/\s/g, '');
            }
            if (user.password.includes(" ")) {
                user.password = user.password.replace(/\s/g, '');
            }


            if (!qqEmailPattern.test(user.address) && user.address !== '') {
                if (!timer1) { // 如果定时器标识不存在，则创建定时器
                    timer1 = setTimeout(() => {
                        if_wrong_name.value = true;
                    }, 1000);
                }
            } else {
                clearTimeout(timer1); // 清除定时器
                timer1 = null; // 清除定时器标识
                if_wrong_name.value = false;
            }


            if (!passwordPattern.test(user.password) && user.password !== '') {
                if (!timer2) { // 如果定时器标识不存在，则创建定时器
                    timer2 = setTimeout(() => {
                        if_wrong_pass.value = true;
                    }, 1000);
                }
            } else {
                clearTimeout(timer2); // 清除定时器
                timer2 = null; // 清除定时器标识
                if_wrong_pass.value = false;
            }
        })

        return {
            user,
            submit,
            if_wrong_name,
            if_wrong_pass,
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
    background-color: rgba(186, 222, 250, 0.5);
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
    border:none;
    border-radius: 15px;
    height: 35px;
    margin-top: 35px;
    background: -webkit-linear-gradient(left, #b8cdfe, #fcd3dc);
    box-shadow: #a1baf3 0 1px 0;
    transition: all 0.5s ease-in-out;
}

.button:hover {
    cursor: pointer;
}

input {
    width: 100%;
    font-size: 18px;
    font-weight: 200;
    text-indent: 15px;
    /* 指定缩进的像素值 */
    outline: none !important;
    border-radius: 12px;
    height: 35px;
    border: 1px solid #c8deff;
    backdrop-filter: blur(10px);
    /* 使用模糊效果，可以根据需要调整模糊程度 */
    background-color: transparent;
    /* 使用红色背景并调整透明度 */
    margin-top: 10px;
    /* 在底部添加阴影，模拟浮动效果 */
    transition: all 0.5s ease-in-out;
}
</style>