<template>
    <div class="container" id="login-box" :class="{ 'right-panel-active': !isLogin }">
        <div class="form-container sign-up-container">
            <form @submit.prevent="registerFn">
                <h1>注册</h1>
                <div class="txtb">
                    <input type="text" v-model="register.username" required>
                    <span data-placeholder="Username"></span>
                </div>
                <div class="txtb">
                    <input type="text" v-model="register.email" required>
                    <span data-placeholder="Email"></span>
                </div>
                <div class="txtb">
                    <input type="password" v-model="register.password" required>
                    <span data-placeholder="Password"></span>
                </div>
                <div class="txtb">
                    <input type="password" v-model="register.confirmPassword" required>
                    <span data-placeholder="Confirm Password"></span>
                </div>
                <a @click.prevent="isLogin = !isLogin" v-if="isMobile">已有账号，立即登录</a>
                <button>注册</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form @submit.prevent="loginFn">
                <h1>登录</h1>
                <div class="txtb">
                    <input type="text" v-model="login.email" required>
                    <span data-placeholder="Email"></span>
                </div>
                <div class="txtb">
                    <input type="password" v-model="login.password" required>
                    <span data-placeholder="Password"></span>
                </div>
                <!-- <a @click.prevent>忘记密码？</a> -->
                <a @click.prevent="isLogin = !isLogin" v-if="isMobile">没有账号，立即注册</a>
                <button>登录</button>
            </form>
        </div>

        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>已有账号？</h1>
                    <p>请使用您的账号进行登录</p>
                    <LoginIcon></LoginIcon>
                    <button class="ghost" id="signIn" @click="isLogin = !isLogin">登录</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>没有账号?</h1>
                    <p>立即注册加入我们，一起开始旅程吧！</p>
                    <RegisterIcon></RegisterIcon>
                    <button class="ghost" id="signUp" @click="isLogin = !isLogin">注册</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="js">
import { ref, reactive } from 'vue'
import LoginIcon from '@/icons/LoginIcon.vue';
import RegisterIcon from '@/icons/RegisterIcon.vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import { storeToRefs } from "pinia";
import { useMobileStore } from "@/store/mobile";

const { isMobile } = storeToRefs(useMobileStore())

const router = useRouter()

const isLogin = ref(true)
const login = reactive({
    email: '',
    password: ''
})
const register = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const check = () => {
    const obj = isLogin.value ? login : register
    const mailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (!mailReg.test(obj.email)) {
        ElMessage.error('邮箱格式不正确');
        return false;
    }

    if (obj.confirmPassword && obj.password !== obj.confirmPassword) {
        ElMessage.error('两次密码不一致')
        return false
    }
    return true
}

const registerFn = () => {
    if (!check()) {
        return
    }
    useUserStore().register(register.email, register.username, register.password).then((res) => {
        ElMessage.success(res.msg)
        router.push('/home')
    })
}

const loginFn = () => {
    if (!check()) {
        return
    }
    useUserStore().login(login.email, login.password).then(res => {
        ElMessage.success(res.msg)
        router.push('/home')
    })
}
</script>

<style lang="scss" scoped>
.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;

    body {
        background-image: linear-gradient(120deg, #3498db, #8e44ad);
        ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: -20px 0 50px;
    }

    h1 {
        font-weight: bold;
        margin: 0;
    }

    p {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: .5px;
        margin-bottom: 0;
    }

    span {
        font-size: 12px;
    }

    a {
        color: #333;
        font-size: 14px;
        text-decoration: none;
        margin: 15px 0;
    }

    button {
        border-radius: 20px;
        border: 1px solid #ff4b2b;
        background: #ff4b2b;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
        cursor: pointer;

        &:active {
            transform: scale(.95);
        }

        &:focus {
            outline: none;
        }

        &.ghost {
            background: transparent;
            border-color: #fff;
        }
    }

    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all .6s ease-in-out;

        form {
            background: #fff;
            display: flex;
            flex-direction: column;
            padding: 0 50px;
            height: 100%;
            justify-content: center;
            text-align: center;

            button {
                background: linear-gradient(120deg, #3498db, #8e44ad);
                border: none;
                background-size: 200%;
                color: #fff;
                transition: .5s;

                &:hover {
                    background-position: right;
                }
            }

            .txtb {
                border-bottom: 2px solid #adadad;
                position: relative;
                margin: 10px 0;

                input {
                    font-size: 15px;
                    color: #333;
                    border: none;
                    width: 100%;
                    outline: none;
                    background: none;
                    padding: 0 3px;
                    height: 35px;

                    &:focus {
                        &+span {
                            &::before {
                                top: -5px;
                            }

                            &::after {
                                width: 100%;
                            }
                        }
                    }

                    &:valid {
                        &+span {
                            &::before {
                                top: -5px;
                            }
                        }
                    }
                }

                span {
                    pointer-events: none;


                    &::before {
                        content: attr(data-placeholder);
                        position: absolute;
                        top: 50%;
                        left: 0;
                        color: #adadad;
                        transform: translateY(-50%);
                        transition: .5s;
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        left: 0%;
                        top: 100%;
                        width: 0%;
                        height: 2px;
                        background-image: linear-gradient(120deg, #3498db, #8e44ad);
                        transition: .5s;
                    }
                }
            }
        }
    }

    .sign-in-container {
        left: 0;
        width: 50%;
        z-index: 2;

        form a {
            position: relative;
            width: 100%;
            text-align: right;
            margin: 8px 0 0 0;

            &:nth-last-of-type(1){
                margin-bottom: 16px;
            }
        }

        button {
            margin-top: 20px;
        }
    }

    .sign-up-container {
        left: 0;
        width: 50%;
        z-index: 1;
        opacity: 0;

        button {
            margin-top: 20px;
        }

        a {
            text-align: right;
            margin: 6px 0;
        }
    }

    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform .6s ease-in-out;
        z-index: 100;

        .overlay {
            background-image: linear-gradient(120deg, #3498db, #8e44ad);
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateY(0);
            transition: transform .6s ease-in-out;

            .overlay-panel {
                position: absolute;
                top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 40px;
                height: 100%;
                width: 50%;
                text-align: center;
                transform: translateY(0);
                transition: transform .6s ease-in-out, opacity .3s ease-in-out;

                svg {
                    height: 50%;
                    pointer-events: none;
                }

                &.overlay-right {
                    right: 0;
                    transform: translateY(0);
                }

                &.overlay-left {
                    opacity: 0;
                    transform: translateY(-20%);
                }
            }
        }
    }

    &.right-panel-active {
        .sign-in-container {
            transform: translateX(100%);
            opacity: 0;
        }

        .sign-up-container {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
        }

        .overlay-container {
            transform: translateX(-100%);

            .overlay {
                transform: translateX(50%);

                .overlay-left {
                    transform: translateY(0);
                    opacity: 1;
                }

                .overlay-right {
                    transform: translateY(20%);
                    opacity: 0;
                }
            }
        }
    }
}
</style>