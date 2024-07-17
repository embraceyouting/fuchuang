<template>
    <el-container>
        <img src="@/assets/image/bg.png" class="bg" alt="" v-if="userInfo?.id">
        <header>
            <!-- 用户信息 -->
            <el-avatar :size="120" :src="userInfo?.avatar">{{ userInfo?.username || '未登录' }}</el-avatar>
            <div class="userInfo">
                <h1 class="username">{{ userInfo?.username || '访客' }}</h1>
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
            <el-tabs v-model="activeChoice">
                <el-tab-pane :disabled="!userInfo?.id" :label="`项目 ${userInfo?.id ? filteredList.length : ''}`"
                    name="work">
                    <div class="tool" v-if="subjectUrlList.length">
                        <ElButton :icon="Filter" @click="toggleAll">{{ activeList.length ? '取消选中' : '全选' }}</ElButton>
                        <ElButton v-for="url in subjectUrlList" @click="toggleSelect(url)"
                            :class="{ active: activeList.includes(url) }">{{ url }}</ElButton>
                    </div>
                    <div class="container">
                        <TransitionGroup name="list">
                            <div class="item" v-for="sub in filteredList" :key="sub.id">
                                <ProjectCard :time="sub.time" :url="sub.url" :title="sub.title" :uid="sub.uid"
                                    :username="sub.username" :path="sub.path" :score="sub.score" :id="sub.id">
                                </ProjectCard>
                            </div>
                        </TransitionGroup>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <!-- 用户没有登陆 -->
            <el-empty v-if="!userInfo?.id" description="点击右上角按钮进行登录" :image-size="180">
            </el-empty>
            <el-empty v-else-if="!filteredList.length" :image-size="180" description="暂无内容"></el-empty>
        </main>
    </el-container>
</template>

<script lang="js" setup>
import GenderIcon from '@/icons/GenderIcon.vue'
import ProjectCard from '@/components/project/project-card.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Filter } from '@element-plus/icons-vue';
import { computed } from 'vue';

const userStore = useUserStore()
const { userInfo, subjectList, subjectUrlList } = storeToRefs(userStore)
const activeChoice = ref('work')
const activeList = ref([])
const filteredList = computed(() => subjectList.value.filter(item => activeList.value.includes(item.url)))

function logout() {
    userStore.logout()
}

function toggleSelect(url) {
    if (activeList.value.includes(url)) {
        activeList.value = activeList.value.filter(item => item !== url)
    } else {
        activeList.value.push(url)
    }
}

function toggleAll() {
    if (activeList.value.length) {
        activeList.value = []
    } else {
        activeList.value = subjectUrlList.value
    }
}

userStore.getUserInfo().then(() => {
    return userStore.getSubjectList()
}).then(() => {
    activeList.value = subjectUrlList.value
})

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

            .tool {

                .el-button {
                    background: $color;
                    margin-bottom: 10px;
                    margin-left: unset;
                    margin-right: 10px;
                    color: $white;
                    font-size: 13px;
                    border: 2px solid transparent;
                    outline: unset;
                    font-weight: 400;
                    padding: 0 12px;

                    &.active {
                        border-color: $black;
                    }

                    &:hover {
                        background: $color;
                    }
                }
            }

            .container {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 16px;

                .item {
                    position: relative;
                    min-width: 0;
                }

                @media screen and (max-width: 768px) {
                    grid-template-columns: repeat(2, 1fr);
                }

                @media screen and (max-width: 428px) {
                    grid-template-columns: repeat(1, 1fr);
                }

                .list-move,
                .list-enter-active,
                .list-leave-active {
                    transition: transform 0.5s, opacity 0.1s;
                }

                .list-enter-from,
                .list-leave-to {
                    opacity: 0;
                    transform: translateX(-30px) scale(0.9);
                }

                .list-leave-active {
                    position: absolute;
                }
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

    @media screen and (max-width: 768px) {
        min-width: 0;
        width: 100%;
        padding: 24px;

        .bg {
            right: 0;
        }

        header {
            padding: 40px 0 60px;
            min-width: 0;

            .userInfo {
                flex: 1;

                .other {
                    margin-top: 0;
                    height: fit-content;
                    flex-wrap: wrap;

                    .tag {
                        margin-top: 4px;
                    }
                }
            }

            .tool {
                position: absolute;
                right: 0;
                margin-right: 0;
                bottom: 12px;
            }
        }
    }
}
</style>