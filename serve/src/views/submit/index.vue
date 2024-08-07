<template>
    <div class="main">
        <div class="editor-container">
            <CodeEditor :files="file_list" ref="childComponent" @uploaded="goToView">
                <ElButton @click="start" type="primary" plain class="start"><el-icon>
                        <Pointer />
                    </el-icon> 新手引导</ElButton>
                <div class="post_part" ref="upload">
                    <el-upload class="upload-demo" drag :auto-upload="false" accept=".json" name="files"
                        :file-list="file_list" :show-file-list="false" :on-change="handleChange" multiple>
                        <el-icon class="el-icon--upload"><upload-filled class="file_style" /></el-icon>
                        <div class="el-upload__text">
                            Drop JSON files here or <em>click to upload</em>
                        </div>
                    </el-upload>
                    <div class="button">
                        <el-button type="primary" size="small" class="add" @click="addFile(Log2)">测试JSON数据1</el-button>
                        <el-button type="primary" size="small" class="add" @click="addFile(Log4)">测试JSON数据2</el-button>
                    </div>
                </div>
            </CodeEditor>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import CodeEditor from "@/components/editor/code-editor.vue";
import { getCurrentInstance, onBeforeUnmount } from 'vue'
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import { useRoute, useRouter } from "vue-router";
import { nextTick } from "vue";
import { Pointer } from '@element-plus/icons-vue';
import { ElMessage } from "element-plus";
import Log2 from "@/assets/json/log2.json";
import Log4 from "@/assets/json/log4.json";
import pubsub from '@/utils/pubsub';

function error(msg) {
    ElMessage.error(msg)
}

onDeactivated(() => {
    pubsub.off('error', error)
})

onActivated(() => {
    pubsub.on('error', error)
})

defineOptions({
    name: 'submit'
})

const intro = introJs()
const childComponent = ref(null);
const route = useRoute();
const router = useRouter();
const upload = ref(null);
onMounted(() => {
    intro.setOptions({
        theme: 'modern',
        steps: [
            {
                element: upload.value,
                intro: '点击上传文件',
                title: "第二步"
            },
            {
                element: null,
                intro: '选择json文件',
                title: "第三步"
            },
            {
                element: childComponent.value.$el.querySelector('.editor'),
                intro: '查看/修改json文件',
                title: "第四步"
            },
            {
                element: null,
                intro: '上传json文件',
                title: "第五步"
            }
        ]
    });

    intro.onbeforechange(() => {
        // 没有上传文件时，禁止进入其他步骤
        if (intro.isActive() && intro._currentStep == 1 && file_list.value.length < 1) {
            ElMessage.error({
                message: '你还没有上传 JSON 文件哦~',
                grouping: true,
                customClass: 'error-message',
            })
            return false
        }
        if (intro._currentStep == 1) {
            nextTick(() => {
                // 动态更新 dom
                intro._introItems[1].element = childComponent.value.$el.querySelector('.editor-tree .file-list .file');
                intro._introItems[1].position = 'right';
                intro._introItems[3].element = childComponent.value.$el.querySelector('.title .all');
                intro._introItems[3].position = 'bottom';
                childComponent.value.$el.querySelector('.editor-tree .file-list .file').addEventListener('click', () => intro.nextStep())
            })
        }
    })

    setTimeout(() => {
        const step = parseInt(route.query['intro'] || 0)
        step > 0 && intro.start().then(() => intro.goToStep(step))
    }, 300)
})

const { $t } = getCurrentInstance().proxy
let file_list = ref([]);

window.addEventListener('monitor', (e) => {
    addFile(e.detail)
})

function start() {
    intro.start()
}

function handleChange(file, fileList) {
    file_list.value = Array.from(fileList);
    if (intro.isActive() && intro._currentStep == 0) {
        nextTick(() => {
            intro.goToStep(2);
        })
    }
}

async function addFile(file) {
    const name = `log_${Date.now()}.json`
    const f = {
        name,
        raw: new File(
            [
                new TextEncoder().encode(JSON.stringify(file, null, 4))
            ],
            name,
            {
                type: 'application/json'
            })
    }
    handleChange(f, [...file_list.value, f]);
}

function goToView(list) {
    setTimeout(() => {
        router.push(`/project/${list.map(item => item.id).join("/")}`);
    }, 1000)
}

router.beforeEach((to, from, next) => {
    intro.exit(); // 在路由切换前调用 intro.exit()
    next(); // 继续导航
})
</script>

<style scoped lang="scss">
@import 'intro.js/introjs.css';

.main {
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 60px);
    width: 100%;

    .editor-container {
        width: 80%;
        max-width: 1080px;
        margin: 30px auto;

        .start {
            margin-bottom: 10px;
            width: 100%;

            .el-icon {
                margin-right: 5px;
            }
        }

        .post_part {
            width: 100%;
            margin-bottom: 10px;

            .button {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                gap: 8px;

                .el-button {
                    flex: 1;
                    margin-left: 0;
                }
            }

            .upload-demo {
                :deep(.el-upload) {

                    .el-upload-dragger {
                        transition: .3s;
                        background-color: transparent;
                        height: 180px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        border-width: 0px;
                        position: relative;

                        &:hover {
                            border-width: 4px;
                        }

                        &::before {
                            content: "";
                            position: absolute;
                            inset: 0px;
                            border-radius: inherit;
                            background-color: #d8e3ff66;
                        }
                    }

                    .el-upload__text {
                        color: $dark-color;
                        margin-top: 4px;

                        em {
                            color: #0048ff;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        height: max-content;

        .editor-container {
            width: 100%;
            padding: 12px;
            margin: 0;
        }
    }
}
</style>
