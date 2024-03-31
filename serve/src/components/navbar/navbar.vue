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
                <a href="::javascript" @click.prevent="chooseLang(language)" class="language">
                    <ElIcon :size="26">
                        <LanguageIcon :language="locale"></LanguageIcon>
                    </ElIcon>
                </a>
                <router-link class="login" to="/login" v-if="!userStore.userInfo">
                    <ElIcon>
                        <UserIcon></UserIcon>
                    </ElIcon>
                    {{ $t('navbar.login') }}
                </router-link>
                <ElAvatar :src="userStore.userInfo?.avatar" :size="32" v-else>{{ userStore.userInfo?.username }}
                </ElAvatar>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue"
import Logo from '@/icons/Logo.vue';
import UserIcon from '@/icons/UserIcon.vue';
import LanguageIcon from '@/icons/LanguageIcon.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
const userStore = useUserStore()
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
    height: 60px;
    background-color: #5e77d27b;
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 999;

    .navbar_center {
        width: 80%;
        max-width: 950px;
        padding: 0 20px;
        min-width: 595px;
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
        gap: 12px;
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

        .language {
            padding: 8px 10px;
            margin-right: 10px;

            &,
            &:hover,
            &:active {
                background-color: unset;
            }
        }

        .login {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 92px;
            font-family: 'PingFangSC';
            font-size: unset;
            color: $white;
            background-color: $light-color;
            border-radius: 10px;

            &:hover {
                background-color: $color;
            }

            &:active {
                background-color: $dark-color;
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
            gap: 6px;

            span {
                font-family: "Paytone One", "PingFangSC", sans-serif;
            }
        }
    }
}
</style>