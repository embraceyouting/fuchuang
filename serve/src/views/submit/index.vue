<template>
    <div class="post_part">
        <el-upload class="upload-demo" drag :auto-upload="false"
            accept=".json" name="files" :before-remove="beforeRemove" :on-preview="onPreview" :data="uploadData"
            :file-list="file_list" :on-change="handleChange" multiple>
            <el-icon class="el-icon--upload"><upload-filled class="file_style" /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    <em>only json files are allowed</em>
                </div>
            </template>
        </el-upload>
    </div>

    <div class="editor-container">
        <CodeEditor :files="file_list" ref="childComponent"></CodeEditor>
    </div>
</template>

<script setup lang="js">
import { reactive, ref, computed, onMounted, nextTick, watch, toRef, watchEffect } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import WebSite from "@/icons/WebSite.vue";
import BigData from "@/icons/BigData.vue";
import SelectApp from "@/icons/SelectApp.vue";
import CodeEditor from "@/components/editor/code-editor.vue";
import { getCurrentInstance } from 'vue'
import { useUserStore } from "@/store/user";
import 'intro.js/introjs.css';
import introJs from 'intro.js';

const intro = introJs()
const childComponent = ref(null);
onMounted(() => {
    intro.setOptions({
        theme: 'modern',
        steps: [
            {
                element: document.querySelector('.el-upload-dragger'),
                intro: '点击上传文件',
                title: "第一步"
            },
            {
                element: childComponent.value.$el.querySelector('.editor-tree'),
                intro: '选择json文件',
                title: "第二步"
            },
            {
                element: childComponent.value.$el.querySelector('.editor'),
                intro: '查看/修改json文件',
                title: "第三步"
            },
            {
                element: childComponent.value.$el.querySelector('.title'),
                intro: '上传json文件',
                title: "第四步"
            }
        ],
        totalSteps: 2
    });
})
const { $t } = getCurrentInstance().proxy
let file_list = ref([]);
// 获取email，可以从任何适当的地方获取
let email = getCookie("email");
// 上传时发送的额外数据，包括用户名
const uploadData = ref({
    email: useUserStore().userInfo?.email
});

function handleChange(file, fileList) {
    file_list.value = Array.from(fileList);
}

</script>

<style scoped lang="scss">
@import 'intro.js/introjs.css';

.post_part {
    min-width: 300px;
    width: 80%;
    max-width: 720px;
    margin: 20px auto;
    margin-top: 40px;

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

.delete_part {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .model_background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(185, 185, 185, 0.5);
    }

    .choose_delete {
        z-index: 10;
        padding: 20px;
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        text-align: center;


        p {
            color: rgb(95, 95, 95);
            font-family: "Paytone One", "PingFangSC", sans-serif;
            font-weight: 200;
            font-style: normal;

            a {
                color: rgb(98, 208, 255);
                text-decoration-color: rgb(98, 208, 255);
            }
        }

        .delete_btns {
            display: float;
            float: right;

            button {
                padding: 8px 15px;
                color: white;
                border-radius: 5px;
                border: 0.5px solid #a5a6a7;
                background-color: #409eff;
                font-family: "Paytone One", "PingFangSC", sans-serif;
                font-weight: 200;
                font-style: normal;
                cursor: pointer;

                &:first-child {
                    margin-right: 20px;
                    color: #7c7c7c;
                    background-color: #ffff;
                    border: 0.5px solid #cccecf;
                }
            }
        }
    }
}

.editor-container {
    height: 400px;
    width: 80%;
    max-width: 720px;
    margin: 100px auto;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 80px;
    margin-left: auto;
    margin-right: auto;
    max-width: 820px;
    width: 90%;

    .card {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 30px;

        svg {
            width: 400px;
            height: 400px;
        }

        .content {
            flex: 1;

            h4 {
                margin-top: 0;
                margin-bottom: 20px;
                font-size: 20px;
            }
        }

        &:nth-child(even) {
            flex-direction: row-reverse;
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 0;

            .content {
                width: 80%;

                h4 {
                    text-align: center;
                }
            }

            &:nth-child(even) {
                flex-direction: column;
            }
        }
    }
}
</style>
