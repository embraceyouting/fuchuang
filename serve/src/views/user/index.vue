<template>
    <el-container>
        <header>
            <!-- 用户信息 -->
            <el-avatar :size="120" :src="userInfo.avatar">{{ userInfo.username || '未登录' }}</el-avatar>
            <div class="userInfo">
                <h1 class="username">{{ userInfo.username || '未登录' }}</h1>
                <!-- <p class="list" @click="isShowFollowList = true">
                    <span>关注</span><i>{{ userInfo.id ? userInfo.followCount || '0' : '-' }}</i>
                    <el-divider direction="vertical"></el-divider>
                    <span>粉丝</span><i>{{ userInfo.id ? userInfo.fanCount || '0' : '-' }}</i>
                    <el-divider direction="vertical"></el-divider>
                    <span>获赞</span><i>{{ userInfo.id ? userInfo.likedCount || '0' : '-' }}</i>
                </p> -->
                <p class="other" v-if="userInfo.id">
                    <span class="account">账号ID: {{ userInfo.id }}</span>
                    <!-- <span class="gender tag">
                        <GenderIcon :gender="userInfo.gender"></GenderIcon>
                        <span>{{ userInfo.age || 0 }}岁</span>
                    </span>

                    <span class="location tag">
                        {{ userInfo.location || '电子科技大学' }}</span> -->
                </p>
                <!-- <p class="signature" :title="userInfo.signature">{{ userInfo.signature || '这个人很懒，什么也没留下...' }}</p> -->
            </div>
            <div class="tool" v-if="userInfo.id">
                <el-button @click="logout" type="danger">退出登录</el-button>
            </div>
        </header>

        <main>
            <!-- 导航栏 -->
            <el-tabs v-model="activeChoice">
                <!-- 作品: 用户未登录时不可选中 -->
                <el-tab-pane :disabled="!userInfo.id" class="video-container"
                    :label="`项目 ${userInfo.id ? userInfo.workCount || 0 : ''}`" name="work">
                </el-tab-pane>
                <!-- 喜欢: 用户未登录时不可选中
                <el-tab-pane :disabled="!userInfo.id" class="video-container" :label="`喜欢 ${userInfo.likeCount || ''}`"
                    name="like">
                </el-tab-pane> -->
                <!-- 收藏: 用户未登录时不可选中 -->
                <el-tab-pane :disabled="!userInfo.id" class="video-container"
                    :label="`收藏 ${userInfo.collectCount || ''}`" name="collect">
                </el-tab-pane>
                <!-- 观看历史: 用户未登录时不可选中 -->
                <el-tab-pane :disabled="!userInfo.id" class="video-container"
                    :label="`浏览历史 ${userInfo.historyCount || ''}`" name="history">
                </el-tab-pane>
            </el-tabs>

            <div class="video-container">
                <VideoBox v-for="item in videoList" :key="item.vid" v-bind="item" :ratio="4 / 3" :waterfall="false"
                    @deleteVideo="deleteVideo" :isDelete="activeChoice === 'work'">
                </VideoBox>
            </div>

            <!-- 用户没有登陆 -->
            <el-empty description="点击右上角按钮进行登录" :image-size="180">
            </el-empty>
        </main>
    </el-container>
</template>

<script lang="js" setup>
import GenderIcon from '@/icons/GenderIcon.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
console.log(userInfo);

function logout() {
    // 退出登录，清空用户信息
    userStore.logout()
}
function deleteVideo(vid) {
    // 删除视频
    this.videoList = this.videoList.filter(item => item.vid !== vid)
    this.getUserInfo()
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.el-container {
    padding: 40px;
    flex-direction: column;
    min-width: 500px;
    max-width: 968px;
    margin: 8px auto;

    header {
        display: flex;
        align-items: center;
        min-width: max-content;

        .el-avatar {
            font-size: 28px;
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
                margin-bottom: 16px;
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
            }

            .list {
                display: flex;
                align-items: center;
                margin-top: 4px;
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
                    background-color: $gray-3;
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
                    margin-right: 4px;
                    padding: 0 8px;
                }
            }

            .signature {
                font-size: 12px;
                line-height: 20px;
                color: $gray-1;
                margin-top: 6px;
                margin-right: 10px;
                white-space: nowrap;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
            }

        }

        .tool {
            align-self: flex-end;

            .el-button {
                background: $gray-3;
                border: none;
                color: $white;
                font-size: 13px;
                font-weight: 400;
            }

            .el-button--danger {
                background: $light-color;
                padding: 0 20px;
            }
        }

    }

    main {

        .el-tabs {
            margin: 11px 0;
            box-sizing: content-box;
            padding-top: 16px;

            :deep(.el-tabs__item) {
                cursor: pointer;
                color: $gray-1;
                font-size: 18px;
                height: unset;
                line-height: 3;

                &:hover {
                    color: $gray-1;
                }

                &.is-active {
                    color: $white;
                }
            }

            :deep(.el-tabs__nav-wrap) {
                &::after {
                    background-color: $gray-3;
                    transform: scaleY(.5);
                    height: 1px;
                }
            }

            :deep(.el-tabs__active-bar) {
                display: none;
                background-color: $white;
            }
        }

        .video-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-gap: 16px;

            @media screen and (max-width: 1280px) {
                grid-template-columns: repeat(3, 1fr);
            }

        }

    }
}
</style>./user.vue