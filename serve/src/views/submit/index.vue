<template>
    <div class="main">
        <div class="editor-container">
            <CodeEditor :files="file_list" ref="childComponent" @uploaded="goToView">
                <ElButton @click="start" type="primary" plain class="start"><el-icon>
                        <Pointer />
                    </el-icon> 新手引导</ElButton>
                <div class="post_part">
                    <el-upload class="upload-demo" drag :auto-upload="false" accept=".json" name="files"
                        :file-list="file_list" :show-file-list="false" :on-change="handleChange" multiple>
                        <el-icon class="el-icon--upload"><upload-filled class="file_style" /></el-icon>
                        <div class="el-upload__text">
                            Drop JSON files here or <em>click to upload</em>
                        </div>
                    </el-upload>
                </div>
            </CodeEditor>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import CodeEditor from "@/components/editor/code-editor.vue";
import { getCurrentInstance } from 'vue'
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import { useRoute, useRouter } from "vue-router";
import { nextTick } from "vue";
import { Pointer } from '@element-plus/icons-vue';
import { ElMessage } from "element-plus";

defineOptions({
    name: 'submit'
})

const intro = introJs()
const childComponent = ref(null);
const route = useRoute();
const router = useRouter();
onMounted(() => {
    intro.setOptions({
        theme: 'modern',
        steps: [
            {
                element: document.querySelector('.el-upload-dragger'),
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
                childComponent.value.$el.querySelector('.editor-tree .file-list .file').addEventListener('click',()=> intro.nextStep())
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

function goToView(list) {
    setTimeout(() => {
        router.push(`/project/${list.map(item => item.id).join("/")}`);
    }, 1000)
}

onUnmounted(() => {
    intro.exit();
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
}
</style>
