<template>
    <section class="card" ref="card">
        <ElIcon class="delete" @click="remove" v-if="id">
            <Delete />
        </ElIcon>
        <div class="cover" :class="{ 'mask': isMask }" :style="{
            paddingTop: paddingTop + '%',
            height: autoHeight && !height ? '0' : height
        }" @click="open">
            <img v-if="!autoHeight" class="bg" :src="cover" alt="">
            <img :class="{ 'center': autoHeight }" :src="cover" alt="">
        </div>
        <div class="info" :class="{ 'in-cover': inCover }">
            <h4 class="title" :title="title" v-if="id">{{ title }}</h4>
            <a class="title url" :title="title" v-else :href="url" target="_blank">{{ title }}</a>
            <p class="url" v-if="score">
                <a :href="url" target="_blank"><span class="tag"><el-icon>
                            <Monitor />
                        </el-icon>访问该网站</span></a>
                <span class="tag"><el-icon>
                        <DocumentChecked />
                    </el-icon>{{ score || 90 }}分</span>
            </p>
            <p class="user" v-if="uid">
                <router-link :to="`/user/${uid}`">@{{ username }}</router-link>
                <span class="dot">·</span>
                {{ formatTime(time) }}
            </p>
            <p class="tools" v-if="id">
                <ElButton type="primary" class="pdf" size="large" @click="router.push(`/project/${id}`)">评分体验报告<el-icon>
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
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';

const router = useRouter();

const props = defineProps({
    id: Number,
    url: String,
    title: String,
    time: String,
    uid: Number,
    username: String,
    path: String,
    score: Number,
    autoHeight: Boolean,
    height: String,
    inCover: Boolean,
    isMask: Boolean
})

const cover = ref(NotFound);
const card = ref(null);
const paddingTop = ref(0);
const emit = defineEmits(['loaded']);

function open() {
    window.open(props.url)
}

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

let ob;

function getCover() {
    return service.get(`/cover?url=${props.url}`).then(res => {
        const image = new Image();
        image.src = res.data;
        image.onload = () => {
            cover.value = image.src
            if (!props.autoHeight) return
            const redio = image.height / image.width
            paddingTop.value = redio * 100
            emit('loaded')
        }
        return res
    })
}

onMounted(() => {
    if (props.autoHeight) {
        getCover()
        return
    }
    ob = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            getCover().then(() => {
                ob && ob.unobserve(card.value)
            })
        }
    })
    ob.observe(card.value)
})

onBeforeUnmount(() => {
    ob && ob.unobserve(card.value)
})
</script>

<style scoped lang="scss">
.card {
    width: 100%;
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
        z-index: 99;
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
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;

        &.mask {

            &::after {
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(180deg, transparent 20%, #000 100%);
            }
        }

        img {
            max-width: 100%;
            object-fit: cover;
            z-index: -99;
            box-shadow: 0 0 20px -2px #0003;

            &.bg {
                position: absolute;
                inset: 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
                filter: blur(16px) brightness(1.2);
            }

            &.center {
                position: absolute;
                inset: 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }

    .info {
        flex: 1;
        padding: 12px 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        &.in-cover {
            position: absolute;
            bottom: 0;

            .title {
                color: $white;
            }
        }

        .title {
            margin: 0;
            font-size: 18px;
            font-weight: 900;
            color: #202020;
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            &.url {
                font-weight: normal;
                display: -webkit-box;
                white-space: pre-line;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;

                &:hover {
                    text-decoration: underline;
                }
            }
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

            &.url {
                margin-top: 6px;
            }

            &.user {
                margin-top: 4px;
            }

            &.tools {
                height: 36px;
                margin-top: auto;
                display: flex;
                margin-top: 6px;

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