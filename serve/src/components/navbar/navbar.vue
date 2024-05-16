<template>
    <nav class="navbar">
        <div class="navbar_center">
            <div class="bar_left">
                <router-link class="icon_title" active-class="active" to="/home" @click="show = false">
                    <Logo></Logo>
                    <span>{{ $t('navbar.title') }}</span>
                </router-link>
            </div>

            <div class="bar_right" v-if="!isMobile">
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
                <ElAvatar @click="toUser" :src="userStore.userInfo?.avatar" :size="32" v-else>{{
                    userStore.userInfo?.username }}
                </ElAvatar>
            </div>
            <div class="bar_right" v-else>
                <button class="menu" @click="show = !show" :class="{ active: show }">
                    <i class="up"></i><i class="middle"></i><i class="down"></i>
                </button>
            </div>
        </div>
        <el-collapse-transition>
            <div class="navbar_menu" v-if="isMobile && show">
                <router-link v-for="(item, index) in nav" :key="index" :to="`${item.path}`" @click="show = false"
                    active-class="active">
                    <ElIcon :size="26">
                        <Component :is="item.meta.icon"></Component>
                    </ElIcon>
                    {{
                        $t(item.meta.title) }}
                </router-link>
                <a href="::javascript" @click.prevent="chooseLang(language)" class="language">
                    <ElIcon :size="26">
                        <LanguageIcon :language="locale"></LanguageIcon>
                    </ElIcon>
                    <span>{{ $t('navbar.change') }} （{{ $t('navbar.lang') }}）</span>
                </a>
                <router-link class="login" to="/login" v-if="!userStore.userInfo">
                    <ElIcon :size="26">
                        <UserIcon></UserIcon>
                    </ElIcon>
                    {{ $t('navbar.login') }}
                </router-link>
                <router-link class="login" to="/user" @click="show = false" v-else>
                    <ElAvatar @click="toUser" :src="userStore.userInfo?.avatar" :size="26">{{
                        userStore.userInfo?.username }}
                    </ElAvatar>
                    <span>{{ userStore.userInfo?.username }}</span>
                </router-link>
            </div>
        </el-collapse-transition>
    </nav>
</template>

<script setup>
import { ref } from "vue"
import Logo from '@/icons/Logo.vue';
import UserIcon from '@/icons/UserIcon.vue';
import LanguageIcon from '@/icons/LanguageIcon.vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useI18n } from 'vue-i18n'
import { storeToRefs } from "pinia";
import { useMobileStore } from "@/store/mobile";
const { isMobile } = storeToRefs(useMobileStore())
const show = ref(false)
const userStore = useUserStore()
const router = useRouter();
const route = useRoute()
function toUser() {
    router.push(`/user`)
}
const nav = router.getRoutes().filter(item => item.meta.isNavItem)
let { locale } = useI18n()

let language = (localStorage.getItem("lang") == 'en' ? 'en' : 'zh')
locale.value = language

function chooseLang(languagevalue) {
    language = (languagevalue == 'zh' ? 'en' : 'zh');
    locale.value = language;
    localStorage.setItem("lang", locale.value);
}



</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 60px;
    background-image: linear-gradient(to bottom, #5e77d27b, #5e77d21e);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 999;

    .navbar_center {
        max-width: 980px;
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
            white-space: nowrap;
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

    @media screen and (max-width: 768px) {
        width: 100%;
        min-height: 60px;
        height: max-content;
        backdrop-filter: blur(24px);

        .navbar_center {
            width: 100%;
            height: 60px;
            min-width: 100%;
            padding: 0 32px 0 0;

            .bar_left {
                margin-left: 0;
            }

            .bar_right {
                .menu {
                    all: unset;
                    display: flex;
                    flex-direction: column;

                    &.active {
                        i {

                            &.up {
                                transform: translateY(7.2px) rotate(45deg);
                            }

                            &.down {
                                transform: translateY(-7.2px) rotate(-45deg);
                            }

                            &.middle {
                                transform: scaleX(0);
                            }
                        }
                    }

                    i {
                        display: inline-block;
                        height: 2px;
                        width: 20px;
                        background-color: white;
                        margin-top: 5px;
                        transition: all .5s;

                        &:nth-child(1) {
                            margin-top: 0;
                        }
                    }
                }
            }
        }

        .navbar_menu {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: fit-content;

            a {
                width: 100%;
                padding: 16px 20px;
                color: $white;
                border-top: 1px solid #fff1;
                text-decoration: unset;
                background-color: inherit;
                display: flex;
                align-items: center;
                gap: 12px;

                &.active {
                    background-color: #fff3;
                }
            }
        }
    }
}
</style>