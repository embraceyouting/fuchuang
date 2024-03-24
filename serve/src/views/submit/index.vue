<template>
    <div class="main">
        <div class="editor-container">
            <CodeEditor :files="file_list" ref="childComponent">
                <div class="post_part">
                    <el-upload class="upload-demo" drag :auto-upload="false" accept=".json" name="files"
                        :before-remove="beforeRemove" :on-preview="onPreview" :data="uploadData" :file-list="file_list"
                        :show-file-list="false" :on-change="handleChange" multiple>
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
import { reactive, ref, computed, onMounted, nextTick, watch, toRef, watchEffect, onUnmounted } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import WebSite from "@/icons/WebSite.vue";
import BigData from "@/icons/BigData.vue";
import SelectApp from "@/icons/SelectApp.vue";
import CodeEditor from "@/components/editor/code-editor.vue";
import { getCurrentInstance } from 'vue'
import { useUserStore } from "@/store/user";
import 'intro.js/introjs.css';
import introJs from 'intro.js';

const isfirst = ref(true);
const intro = introJs()
const childComponent = ref(null);
onMounted(() => {
    setTimeout(() => {
        intro.setOptions({
            theme: 'modern',
            steps: [
                {
                    element: document.querySelector('.el-upload-dragger'),
                    intro: '点击上传文件',
                    title: "第二步"
                },
                {
                    element: childComponent.value.$el.querySelector('.editor-tree'),
                    intro: '选择json文件',
                    title: "第三步"
                },
                {
                    element: childComponent.value.$el.querySelector('.editor'),
                    intro: '查看/修改json文件',
                    title: "第四步"
                },
                {
                    element: childComponent.value.$el.querySelector('.title'),
                    intro: '上传json文件',
                    title: "第五步"
                }
            ],
        }).start();
    }, 500);
})

const { $t } = getCurrentInstance().proxy
let file_list = ref([]);

function handleChange(file, fileList) {
    file_list.value = Array.from(fileList);
    if (isfirst.value) {
        setTimeout(() => {
            intro.nextStep();
        }, 300)

    }
    isfirst.value = false
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
                            background-color: #b4c9ff66;
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
