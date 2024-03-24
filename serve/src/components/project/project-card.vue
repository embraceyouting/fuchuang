<template>
    <section class="card">
        <ElIcon class="delete" @click="remove">
            <Delete />
        </ElIcon>
        <div class="cover">
            <img :src="cover" alt="">
        </div>
        <div class="info">
            <h4 class="title">{{ title }}</h4>
            <p class="url">
                <a :href="url" target="_blank"><span class="tag"><el-icon>
                            <Monitor />
                        </el-icon>访问该体验网站</span></a>
                <span class="tag"><el-icon>
                        <DocumentChecked />
                    </el-icon>{{ score || 90 }}分</span>
            </p>
            <p class="user">
                <router-link :to="`/user/${uid}`">@{{ username }}</router-link>
                <span class="dot">·</span>
                {{ formatTime(time) }}
            </p>
            <p class="tools">
                <ElButton type="primary" class="pdf" size="large">评分体验报告<el-icon>
                        <Document />
                    </el-icon></ElButton>
                <ElButton @click="download" type="primary" plain size="large" class="json">
                    <el-icon :size="20">
                        <JsonIcon></JsonIcon>
                    </el-icon>
                </ElButton>
            </p>
        </div>
    </section>
</template>

<script setup>
import service from '@/service';
import { Monitor, Delete, DocumentChecked, Document } from '@element-plus/icons-vue';
import NotFound from "@/assets/image/404.png";
import JsonIcon from '@/icons/JsonIcon.vue';
import { formatTime } from "@/utils/time";
import { ref } from 'vue';
import { saveAs } from 'file-saver';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUserStore } from '@/store/user';

const props = defineProps({
    id: Number,
    url: String,
    title: String,
    time: String,
    uid: Number,
    username: String,
    path: String
})

const cover = ref(NotFound);
service.get(`/cover?url=${props.url}`).then(res => {
    cover.value = res.data;
})

function download() {
    const path = import.meta.env.VITE_BASE_URL + props.path
    saveAs(path, props.title)
}

function remove() {
    ElMessageBox.confirm('确定要删除该项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        useUserStore().removeSubject(props.id).then(res => {
            res.code === 200 && ElMessage.success(res.msg)
        })
    }).catch(() => { })
}
</script>

<style scoped lang="scss">
.card {
    width: 100%;
    height: 360px;
    background-color: #ffffff33;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    position: relative;
    flex-direction: column;

    .delete {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: white;
        cursor: pointer;
        mix-blend-mode: difference;
    }

    .tag {
        font-size: 12px;
        vertical-align: center;
        background-color: #ffffff66;
        color: $dark-color;
        display: inline-block;
        padding: 4px 6px;
        line-height: 1;
        margin-right: 6px;
        border-radius: 4px;

        .el-icon {
            margin-right: 4px;
            margin-left: 2px;
        }
    }

    .cover {
        width: 100%;
        height: 200px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .info {
        flex: 1;
        padding: 12px 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        h4 {
            margin: 0;
            font-size: 18px;
            font-weight: 900;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            margin-bottom: 6px;
        }

        p {
            margin: 0;
            font-size: 12px;
            color: #202020;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            a {
                text-decoration: none;
                font-size: 14px;
                color: #202020;

                &:hover {
                    &,
                    &>span {
                        text-decoration: underline;
                    }
                }
            }

            &.user {
                margin-top: 4px;
            }

            &.tools {
                height: 36px;
                margin-top: auto;
                display: flex;

                .el-button {
                    height: 100%;
                    flex: 1;

                    &.json {
                        flex: 0;
                        padding: 10px;
                        width: min-content;
                    }

                    &.is-plain:hover,
                    &.is-plain:active {
                        background-color: $white;
                    }
                }
            }
        }
    }
}
</style>