<template>
    <div class="navbar">
        <div class="navbar_center">
            <div class="bar_left">
                <router-link class="icon_title" active-class="active" to="/home">
                    <Logo></Logo>
                    <span>FlyView</span>
                </router-link>
            </div>
            <div class="bar_right">
                <!-- 使用循环动态渲染 -->
                <router-link v-for="item in nav" :key="item.path" active-class="active" :to="item.path">
                    {{ item.meta.title }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import Logo from '@/icons/Logo.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const nav = router.getRoutes().filter(item => item.meta.isNavItem)
</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 55px;
    background-color: #d0e7ffee;
    position: sticky;
    top: 0;
    z-index: 999;

    .navbar_center {
        width: 60%;
        max-width: 800px;
        padding: 0 20px;
        min-width: fit-content;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bar_left,
    .bar_right {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 100%;

        a {
            outline: 0;
            text-decoration: none;
            text-underline-position: under;
            cursor: pointer;
            font-size: 18px;
            color: rgba(28, 94, 237, 0.5);
            font-weight: 400;
            font-style: normal;
            border-radius: 4px;
            padding: 8px 12px;
            transition: all .2s;
            line-height: 1;

            &:hover {
                color: white;
                background-color: #0002;
            }

            &.active {
                background-color: #0003;
                color: white;
            }
        }
    }

    .bar_left {
        margin-right: 16px;

        .icon_title {
            font-weight: 400;
            font-style: normal;
            display: flex;
            align-items: center;
            margin-left: 12px;
            gap: 4px;

            span {
                font-family: "Paytone One", sans-serif;
            }
        }
    }
}
</style>