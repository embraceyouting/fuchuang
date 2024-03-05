<template>
    <div class="main">
        <div class="append">
            <transition-group name="fade_img">
                <div v-for="(file, index) in files" :key="index" class="image-container">
                    <div class="image-overlay">
                        <div class="icon_div">
                            <svg class="icon" aria-hidden="true" @click="preview(file)">
                                <use xlink:href="#icon-yulan"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" @click="delete_img(index)">
                                <use xlink:href="#icon-shanchu"></use>
                            </svg>
                        </div>
                    </div>
                    <img :src="file.url" alt="uploaded image" class="uploaded-image" />
                </div>
            </transition-group>
        </div>
    </div>
    <form enctype="multipart/form-data">
        <input class="input" type="file" accept="image/*" ref="fileInput" multiple @change="handleFileUpload" title=""
            placeholder="" />
        <button @click.prevent="submit">上传</button>
    </form>





    <transition name="fade" mode="out-in">
        <div class="preview_model" v-if="ispreview">
            <div class="model_background" @click="ispreview = !ispreview"></div>
            <div class="preview_img_div">
                <img :src="preview_url" alt="uploaded image" class="preview_img">
            </div>
        </div>
    </transition>
</template>
  
<script>
import axios from 'axios';
import { ref } from 'vue';

import { watch } from 'vue';

export default {
    setup() {
        const fileInput = ref(null);
        const files = ref([]);
        const ispreview = ref(false);
        const preview_url = ref(null);
        let fileUrls = ref([]);
        const handleFileUpload = () => {
            const inputFiles = fileInput.value.files;
            const newFiles = Array.from(inputFiles).map(file => ({
                url: URL.createObjectURL(file),
                file: file,
            }));
            for (const newFile of newFiles) {
                const isDuplicate = files.value.some(existingFile => existingFile.file.name === newFile.file.name);
                if (!isDuplicate) {
                    files.value.push(newFile);
                } else {
                    alert("File " + newFile.file.name + " already exists")
                }
            }
        };
        const preview = (file) => {
            ispreview.value = true;
            preview_url.value = file.url;
        };
        const delete_img = (index) => {
            files.value.splice(index, 1);
            console.log(files.value)
        };
        function submit() {
            console.log(files.value)
            // 创建 FormData 对象
            const formData = new FormData();
            // 将文件添加到 FormData 对象中
            files.value.forEach((file, index) => {
                formData.append('files', file.file);
            });
            fileInput.value = null; // 清空文件输入框
            files.value = []; // 清空文件列表
            // 发送 POST 请求
            axios.post('http://127.0.0.1:8000/submit_imgpost', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    // 处理错误
                });
        }
        return {
            fileUrls,
            submit,
            fileInput,
            handleFileUpload,
            files,
            preview,
            delete_img,
            ispreview,
            preview_url,
        };
    },
};
</script>
  
<style lang="css" scoped>
.main {
    z-index: -100;
    width: 550px;
    min-height: 170px;
    max-height: 530px;
    padding: 10px;
    background-color: rgb(223, 216, 216);
    overflow-y: scroll;
    border-radius: 6px;
    /* 滑块的圆角 */
}

::-webkit-scrollbar-track {
    background-color: rgb(173, 83, 83);
    /* 滚动条轨道的背景色 */
    border-radius: 6px;
    /* 滑块的圆角 */
    position: absolute;
    top: 10px;
    /* 距离盒子顶部的距离 */
    bottom: 10px;
    /* 距离盒子底部的距离 */
    right: -100px;
    /* 与盒子右侧对齐 */
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
    background-color: #9e9898;
    /* 滑块的背景色 */
    border-radius: 6px;
    /* 滑块的圆角 */
}

::-webkit-scrollbar {
    width: 12px;
    /* 滚动条的宽度 */
}

/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* 滚动条轨道的背景色 */
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
    background-color: #888;
    /* 滑块的背景色 */
    border-radius: 6px;
    /* 滑块的圆角 */
}

/* 鼠标悬停在滑块上时的样式 */
::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    /* 滑块的背景色 */
}

::selection {
    background-color: rgb(209, 174, 174);
    color: rgb(232, 168, 168);
}

.append {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.image-container {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: rgb(234, 190, 190);
    padding: 10px;
    border-radius: 15px
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(110, 101, 101, 0.5);
    border-radius: 15px;
    transition: opacity 0.5s ease-in-out;
    /* 更改为过渡 opacity */
    opacity: 0;
    /* 初始状态为透明 */
}

.icon_div {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 18px;
    justify-content: center;
    align-items: center;
}

.uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* 或者 object-fit: cover;，具体根据需求调整 */
}

.image-container:hover .image-overlay {
    opacity: 1;
    /* 悬停时，透明度变为 1 */
    transition: opacity 0.5s ease-in-out;
    /* 添加过渡效果 */
}


.icon {
    width: 25px;
    height: 25px;
    color: white;
}

.icon:first-child {
    width: 23px;
    height: 23px;
}

.icon:hover {
    cursor: pointer;
}

.preview_model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    /* 确保遮罩层位于最顶层 */
    background-color: rgba(143, 110, 110, 0.5);
    /* 透明黑色遮罩层 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.model_background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.preview_img_div {
    z-index: 10;
    width: 500px;
    height: 500px;
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.443);
    /* 使用红色背景并调整透明度 */
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
}

.preview_img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    transform: translateY(-50%);
    /* 你可以根据需要更改动画属性 */
}
</style>
