<template>
    <div class="text_title">
        <div class="text">Fly View</div>
        <div class="sub_text">
            <p>{{ $t('text.one') }}</p>
            <p>{{ $t('text.two') }}</p>
        </div>
    </div>

    <a href="#" style="margin: auto;" @click="handleClick">快速上手</a>
    <div class="post_part">
        <el-upload class="upload-demo" drag :auto-upload="false" action="http://127.0.0.1:8000/submit_jsonpost" accept=".json" name="files"
            :before-remove="beforeRemove" :on-preview="onPreview" :data="uploadData" :file-list="file_list"  :on-change="handleChange" multiple>
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

    <div class="info">
        <div v-for="(card, index) in cardList" v-animate="{ direction: index % 2 ? 'left' : 'right' }" :key="card.icon"
            class="card">
            <component :is="card.icon" class="icon"></component>
            <div class="content">
                <h4>{{ card.title }}</h4>
                <p>{{ card.content }}</p>
            </div>
        </div>
    </div>

    <div class="delete_part" v-if="ispreview_delete">
        <div class="model_background"></div>
        <div class="choose_delete">
            <p>Cancel the transfer of <a @click.prevent>{{ delete_item }}</a> ?</p>
            <div class="delete_btns">
                <button @click="cancelDelete">Cancel</button>
                <button @click="confirmDelete">OK</button>
            </div>
        </div>
    </div>

    <Contact v-animate="{ direction: 'bottom' }"></Contact>
</template>

<script setup lang="js">
import { reactive, ref, computed, onMounted, nextTick , watch ,toRef } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';
import WebSite from "@/icons/WebSite.vue";
import BigData from "@/icons/BigData.vue";
import SelectApp from "@/icons/SelectApp.vue";
import Contact from "@/components/contact/index.vue";
import CodeEditor from "@/components/editor/code-editor.vue";
import { getCurrentInstance } from 'vue'
import { useUserStore } from "@/store/user";
import 'intro.js/introjs.css';
import introJs from 'intro.js';


const intro = introJs()
const childComponent = ref(null);
const { $el } = toRef(childComponent.value);
onMounted(()=>{
    //拿不到子组件的元素？？
    watch(
    () => $el,
    () => {
        console.log($el.value);
    }
    );
    console.log(childComponent.value.$el)
    intro.setOptions({
        theme:'modern',
        steps: [
            {
                element: document.querySelector('.el-upload-dragger'),
                intro: '点击上传文件',
                title:"第一步"
            },
            {
                element: childComponent.value.$el.querySelector('.editor-tree'),
                intro: '选择json文件',
                title:"第二步"
            }
        ],
        totalSteps: 2
    });
})

function handleClick(){
    intro.start();
}

const { $t } = getCurrentInstance().proxy
let ispreview_delete = ref(false);
let file_list = ref([]);
let delete_item = ref(null);
let isdelete = ref(false);
let resolveBeforeRemove;

// 获取email，可以从任何适当的地方获取
let email = getCookie("email");
// 上传时发送的额外数据，包括用户名
const uploadData = ref({
    email: useUserStore().userInfo?.email
});

function beforeRemove(file, fileList) {
    const fileName = file.name;
    delete_item.value = fileName;
    ispreview_delete.value = true;
    return new Promise(resolve => {
        resolveBeforeRemove = resolve;
    });
}

function confirmDelete() {
    isdelete.value = true;
    ispreview_delete.value = false;
    resolveBeforeRemove(isdelete.value);
}

function cancelDelete() {
    isdelete.value = false;
    ispreview_delete.value = false;
    resolveBeforeRemove(isdelete.value);
}

function handleChange(file, fileList) {
    file_list.value = Array.from(fileList);
}

function onPreview(file, fileList) {
    console.log('preview', file);
}

const cardList = computed(() => {
    return [
        {
            title: $t('card.title1'),
            icon: WebSite,
            content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
        },
        {
            title: $t('card.title2'),
            icon: BigData,
            content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
        },
        {
            title: $t('card.title3'),
            icon: SelectApp,
            content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."
        }
    ]
})


</script>

<style scoped lang="scss">
@import 'intro.js/introjs.css';
.text_title {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .text {
        font-size: 100px;
        font-weight: 800;
        margin: auto;
        background-image: linear-gradient(to right, white, #88b5fd);
        /* Set the gradient colors */
        background-clip: text;
        color: transparent;
        background-size: 200% auto;
        background-position: left;
        /* Initial position to start from the left */
        animation: gradientAnimation 4s linear infinite alternate;
        /* Apply the animation */
        font-family: "Paytone One", "PingFangSC", sans-serif;
        user-select: none;
    }

    .sub_text {
        margin: 40px 100px;

        p {
            margin: 0;
            text-align: center;
            font-size: 20px;
            font-family: "Paytone One", "PingFangSC", sans-serif;
            color: #323232b0;
        }
    }

    @keyframes gradientAnimation {
        0% {
            background-position: left;
            /* Start from the left */
        }

        100% {
            background-position: right;
            /* Move to the right */
        }
    }
}

.post_part {
    min-width: 300px;
    width: 80%;
    max-width: 720px;
    margin: 20px auto;

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
    max-width: 720px;
    width: 90%;

    .card {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 40px;

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
