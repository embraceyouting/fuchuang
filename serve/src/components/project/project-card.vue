<template>
    <section class="card">
        <div class="cover">
            <img :src="cover" alt="">
        </div>
        <div class="info">
            <h4 class="title">{{ title }}</h4>
            <p class="url">
                <span class="tag"><el-icon>
                        <Monitor />
                    </el-icon>Website</span>
                <a :href="url" target="_blank">{{ url }}</a>
            </p>
            <p class="user">
                <router-link :to="`/user/${uid}`">@{{ username }}</router-link>
                <span class="dot">·</span>
                {{ formatTime(time) }}
            </p>
            <p class="tools">
                <ElButton @click="download" type="primary" plain size="large">下载</ElButton>
            </p>
        </div>
    </section>
</template>

<script setup>
import service from '@/service';
import { Monitor } from '@element-plus/icons-vue';
import NotFound from "@/assets/image/404.png";
import { formatTime } from "@/utils/time";
import { ref } from 'vue';
import { saveAs } from 'file-saver';

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
</script>

<style scoped lang="scss">
.card {
    width: 100%;
    height: 360px;
    background-color: #ffffff33;
    border-radius: 15px;
    padding-bottom: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

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
        padding: 12px 18px;
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
                    text-decoration: underline;
                }
            }

            &.user {
                margin-top: 4px;
            }

            &.tools {
                height: 36px;
                margin-top: auto;

                .el-button {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
}
</style>