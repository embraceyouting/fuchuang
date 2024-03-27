<template>
    <el-container>
        <img src="@/assets/image/bg.png" class="bg" alt="" v-if="userInfo?.id">
        <header>
            <!-- 用户信息 -->
            <el-avatar :size="120" :src="userInfo?.avatar">{{ userInfo?.username || '未登录' }}</el-avatar>
            <div class="userInfo">
                <h1 class="username">{{ userInfo?.username || '访客' }}</h1>
                <p class="list" @click="isShowFollowList = true">
                    <!-- <span>关注</span><i>{{ userInfo?.id ? userInfo?.followCount || '0' : '-' }}</i>
                    <el-divider direction="vertical"></el-divider>
                    <span>粉丝</span><i>{{ userInfo?.id ? userInfo?.fanCount || '0' : '-' }}</i>
                    <el-divider direction="vertical"></el-divider>
                    <span>获赞</span><i>{{ userInfo?.id ? userInfo?.likedCount || '0' : '-' }}</i> -->
                </p>
                <p class="other" v-if="userInfo?.id">
                    <span class="account tag">账号ID: {{ userInfo?.id }}</span>
                    <span class="gender tag">
                        <GenderIcon :gender="userInfo?.gender"></GenderIcon>
                        <span>{{ userInfo?.age || 20 }}岁</span>
                    </span>

                    <span class="location tag">
                        {{ userInfo?.location || '电子科技大学' }}</span>
                </p>
                <p class="signature" v-if="userInfo?.id" :title="userInfo?.signature">{{ userInfo?.signature ||
            '这个人很懒，什么也没留下...' }}</p>
                <p class="info" v-else>
                    用户尚未登录，无法使用全部功能，如需使用，请注册/登录
                </p>
            </div>
            <div class="tool" v-if="userInfo?.id">
                <el-button @click="logout" type="danger">退出登录</el-button>
            </div>
        </header>

        <main>
            <!-- 导航栏 -->
            <el-tabs v-model="activeChoice">
                <!-- 作品: 用户未登录时不可选中 -->
                <el-tab-pane :disabled="!userInfo?.id" class="container"
                    :label="`项目 ${userInfo?.id ? subjectList.length : ''}`" name="work">
                </el-tab-pane>
                <!-- 喜欢: 用户未登录时不可选中
                <el-tab-pane :disabled="!userInfo?.id" class="container" :label="`喜欢 ${userInfo?.likeCount || ''}`"
                    name="like">
                </el-tab-pane> -->
                <!-- 收藏: 用户未登录时不可选中 -->
                <el-tab-pane :disabled="!userInfo?.id" class="container" :label="`收藏 ${userInfo?.collectCount || ''}`"
                    name="collect">
                </el-tab-pane>
                <!-- 观看历史: 用户未登录时不可选中 -->
                <el-tab-pane :disabled="!userInfo?.id" class="container" :label="`浏览历史 ${userInfo?.historyCount || ''}`"
                    name="history">
                </el-tab-pane>
            </el-tabs>

            <div class="container">
                <TransitionGroup name="list">
                    <ProjectCard v-for="sub in subjectList" :key="sub.id" :time="sub.time" :url="sub.url"
                        :title="sub.title" :uid="sub.uid" :username="sub.username" :path="sub.path" :score="sub.score" :id="sub.id">
                    </ProjectCard>
                </TransitionGroup>
            </div>

            <!-- 用户没有登陆 -->
            <el-empty v-if="!userInfo?.id" description="点击右上角按钮进行登录" :image-size="180">
            </el-empty>
            <el-empty v-else-if="!subjectList.length" :image-size="180" description="暂无内容"></el-empty>
        </main>
    </el-container>
</template>

<script lang="js" setup>
import GenderIcon from '@/icons/GenderIcon.vue'
import ProjectCard from '@/components/project/project-card.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import service from '@/service';

const userStore = useUserStore()
const { userInfo, subjectList } = storeToRefs(userStore)
const activeChoice = ref('work')

function logout() {
    userStore.logout()
}

userStore.getSubjectList()
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.el-container {
    padding: 0 40px 40px;
    flex-direction: column;
    min-width: 500px;
    max-width: 898px;
    margin: 0 auto;
    position: relative;

    .bg {
        position: absolute;
        height: 294px;
        width: 60%;
        right: 40px;
        top: 0;
        filter: brightness(1.2);
        object-fit: cover;
        z-index: -1;
        mask-image: linear-gradient(90deg, transparent 0%, #000000af 100%, #000000af 100%);
    }

    header {
        display: flex;
        align-items: center;
        position: relative;
        min-width: max-content;
        padding-top: 80px;
        padding-bottom: 40px;

        .el-avatar {
            font-size: 32px;
        }

        .userInfo {
            margin-left: 32px;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: auto;

            .username {
                color: $white;
                font-size: 24px;
                font-weight: 900;
                line-height: 28px;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
                margin-bottom: 6px;
            }

            .list {
                display: flex;
                align-items: center;
                width: 100%;
                white-space: nowrap;
                cursor: pointer;

                span {
                    font-size: 14px;
                    line-height: 22px;
                    margin-right: 6px;
                }

                i {
                    font-size: 16px;
                    line-height: 24px;
                    color: $white;
                    font-style: normal;
                }

                .el-divider {
                    background-color: $gray-0;
                    transform: scaleX(.5);
                    margin: 0 16px;
                }
            }

            .other {
                align-items: center;
                display: flex;
                height: 20px;
                margin-top: 12px;
                width: 100%;

                .account {
                    font-size: 12px;
                    line-height: 20px;
                    margin-right: 20px;
                }

                .tag {
                    background: $transparent-dark;
                    border-radius: 4px;
                    color: $white;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    height: 20px;
                    line-height: 20px;
                    margin-right: 8px;
                    padding: 0 8px;
                }
            }

            .signature {
                font-size: 12px;
                line-height: 20px;
                color: $gray-0;
                margin-top: 12px;
                margin-right: 10px;
                white-space: nowrap;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
            }

            .info {
                font-size: 16px;
                line-height: 1.8;
                color: $gray-0;
                cursor: pointer;
            }

        }

        .tool {
            align-self: flex-end;
            margin-right: 40px;

            .el-button {
                background: $gray-3;
                border: none;
                color: $white;
                font-size: 13px;
                font-weight: 400;
            }

            .el-button--danger {
                background: $white;
                color: $dark-color;
                padding: 0 20px;
            }
        }

    }

    main {

        .el-tabs {
            margin-bottom: 0;
            box-sizing: content-box;

            :deep(.el-tabs__item) {
                cursor: pointer;
                color: $gray-2;
                font-size: 18px;
                height: unset;
                line-height: 3;
                transition: color .3s;

                &:hover {
                    color: $gray-0;
                }

                &.is-active {
                    color: $white;
                }

                &.is-disabled {
                    cursor: not-allowed;
                    user-select: none
                }
            }

            :deep(.el-tabs__nav-wrap) {
                &::after {
                    background-color: $gray-1;
                    transform: scaleY(.5);
                    height: 1px;
                }
            }

            :deep(.el-tabs__active-bar) {
                display: none;
                background-color: $white;
            }
        }

        .container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 16px;

            @media screen and (max-width: 760px) {
                grid-template-columns: repeat(2, 1fr);
            }

            @media screen and (max-width: 360px) {
                grid-template-columns: repeat(1, 1fr);
            }

            .list-move,
            .list-enter-active,
            .list-leave-active {
                transition: transform 0.5s, opacity 0.3s;
            }

            .list-enter-from,
            .list-leave-to {
                opacity: 0;
                transform: translateX(-30px);
            }

            .list-leave-active {
                position: absolute;
                width: min-content;
            }
        }

        .el-empty {
            margin-top: 64px;

            :deep(.el-empty__description) {
                p {
                    color: $gray-0;
                    font-size: 14px;
                    line-height: 20px;
                    margin: 10px;
                }
            }
        }
    }
}
</style>