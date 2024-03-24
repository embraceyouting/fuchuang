<template>
    <div class="main">
        <div class="left_part">
            <div class="post_part">
                <el-upload class="upload-demo" drag :auto-upload="false" accept=".json" name="files"
                    :before-remove="beforeRemove" :on-preview="onPreview" :data="uploadData" :file-list="file_list"
                    :show-file-list="false" :on-change="handleChange" multiple>
                    <el-icon class="el-icon--upload"><upload-filled class="file_style" /></el-icon>
                    <div class="el-upload__text">
                        Drop JSON files here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            <em>Only JSON files are allowed</em>
                        </div>
                    </template>
                </el-upload>
            </div>

            <div class="intro">
                <h2>Welcome to the Fly View Code-Editor!</h2>
                <p>Upload your JSON files here to analyze and modify the data.</p>
                <p>Follow the steps on the right side to get started.</p>
            </div>
        </div>
        <div class="editor-container">
            <CodeEditor :files="file_list" ref="childComponent"></CodeEditor>
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

    .left_part {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 40%;
        padding: 20px;

        .intro {
            transform: rotate(-15deg);
            /* 初始旋转角度，可根据需要调整 */
            transition: transform 0.3s;
            /* 添加过渡效果 */

            & h2 {
                color: aliceblue;
                opacity: 0.8;
                font-size: 25px;
                letter-spacing: 2px;
                font-family: "Paytone One", "PingFangSC", sans-serif;
            }

            & p {
                /* 设置文字颜色为透明，以便显示渐变背景 */
                color: transparent;
                /* 设置渐变背景，可以根据需要自定义渐变颜色和方向 */
                background-image: linear-gradient(to right, rgb(218, 86, 137), rgb(226, 212, 250));
                /* 设置背景剪裁方式为文字，使渐变背景应用到文字上 */
                -webkit-background-clip: text;
                font-size: 17px;
                font-family: "Paytone One", "PingFangSC", sans-serif;
            }
        }

        .post_part {
            width: 100%;

            .upload-demo {
                :deep(.el-upload) {

                    .el-upload-dragger {
                        transition: .3s;
                        background-color: transparent;
                        height: 280px;
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
                            background-color: #fff9;
                        }
                    }

                    .el-upload__text {
                        color: white;
                        margin-top: 4px;

                        em {
                            color: #0048ff;
                        }
                    }
                }

                :deep(.el-upload__tip) {
                    text-align: center;
                    color: white;
                    font-size: 14px;
                }
            }
        }
    }

    &:hover .intro {
        transform: rotate(0deg);
        /* 鼠标悬停时取消旋转 */
    }

    .editor-container {
        width: 60%;
        margin: 30px 20px;
    }
}
</style>
