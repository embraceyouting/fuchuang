<template>
    <nav class="navbar">
        <div class="navbar_center">
            <div class="bar_left">
                <router-link class="icon_title" active-class="active" to="/home">
                    <Logo></Logo>
                    <span>{{ $t('navbar.title') }}</span>
                </router-link>
            </div>

            <div class="bar_right">
                <router-link v-for="(item, index) in nav" :key="index" :to="`${item.path}`" active-class="active">{{
                        $t(item.meta.title) }}</router-link>
                <a href="::javascript" @click.prevent="chooseLang(language)">{{ $t('navbar.lang') }}</a>
                <router-link to="/login">{{ $t('navbar.login') }}</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue"
import Logo from '@/icons/Logo.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const nav = router.getRoutes().filter(item => item.meta.isNavItem)
import { useI18n } from 'vue-i18n'
let { locale } = useI18n()
let language = ref('zh')
const chooseLang = (languagevalue) => {
    language = (languagevalue == 'zh' ? 'en' : 'zh');
    locale.value = (languagevalue == 'zh' ? 'en' : 'zh');
}
</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 55px;
    background-color: #98caff6b;
    backdrop-filter: blur(12px);
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

    .language {
        width: fit-content;
        border: none;
        outline: none;
        background-color: transparent;
        box-shadow: 0px 0px 0px 0px; //去除阴影
        text-align: center;
        font-family: "Paytone One", "PingFangSC", sans-serif;
        color: rgba(28, 94, 237, 0.5);
        transform: translateY(2px);
    }



    .bar_left,
    .bar_right {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 100%;

        a {
            outline: 0;
            text-decoration: none;
            text-underline-position: under;
            cursor: pointer;
            font-size: 18px;
            color: #d2e0ff;
            font-weight: 400;
            font-style: normal;
            border-radius: 4px;
            padding: 8px 12px;
            transition: all .2s;
            line-height: 1;
            font-family: "Paytone One", "PingFangSC", sans-serif;

            &:hover {
                color: #fff;
                background-color: #e7e7e733;
            }

            &.active {
                background-color: #ffffff33;
                color: #fff;
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
                font-family: "Paytone One", "PingFangSC", sans-serif;
            }
        }
    }
}
</style>