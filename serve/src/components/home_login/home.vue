<template>
    <navbar></navbar>

    <div class="text_title">
        <div class="text" style="margin:auto;">Fly View</div>
    </div>
    <div class="post_part">
        <el-upload
            class="upload-demo"
            drag
            action="http://127.0.0.1:8000/submit_jsonpost"
            accept=".json"
            name="files"
            :before-remove="beforeRemove"
            :on-preview="onPreview"
            :data="uploadData"
            multiple
        >
            <el-icon class="el-icon--upload"><upload-filled class="file_style"/></el-icon>
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

    <div class="delete_part" v-if="ispreview_delete">
        <div class="model_background"></div>
        <div class="choose_delete">
            <p>Cancel the transfer of <a onclick="event.preventDefault()">{{ delete_item }}</a> ?</p>
            <div class="delete_btns">
                <button @click="cancelDelete">Cancel</button>
                <button @click="confirmDelete">OK</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import navbar from "../navbar/navbar.vue";
import { ref } from "vue";
import { UploadFilled } from '@element-plus/icons-vue';

let ispreview_delete = ref(false);
let delete_item = ref(null);
let isdelete = ref(false);
let resolveBeforeRemove;

// 获取用户名，可以从任何适当的地方获取
let username = getCookie("name");
// 上传时发送的额外数据，包括用户名
const uploadData = ref({
    username: username
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

function onPreview(file, fileList){
}
</script>

<style scoped>
.post_part {
    z-index: 1;
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
}

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
}

.choose_delete p{
    color: rgb(95, 95, 95);
    font-family: "Paytone One", sans-serif;
    font-weight: 200;
    font-style: normal;
}


.delete_btns{
    display: float;
    float: right;
}



.delete_btns button{
    padding: 8px 15px;
    color: white;
    border-radius: 5px;
    border:0.5px solid #a5a6a7;
    background-color: #409eff;
    font-family: "Paytone One", sans-serif;
    font-weight: 200;
    font-style: normal;
    cursor: pointer;
}

.delete_btns button:first-child{
    margin-right: 20px;
    color: #7c7c7c;
    background-color: #ffff;
    border:0.5px solid #cccecf;
}

a{
    color: rgb(98, 208, 255);
    text-decoration-color:rgb(98, 208, 255) ;
}

.text_title{
    margin: auto;
    display: flex;
    align-items: center;
    font-size: 80px;
    margin-top: 50px;
    font-weight: 800;
}

.text{
    font-size: 100px;
    font-weight: 800;
    font-family: Arial, sans-serif;
    background-image: linear-gradient(to right, white, rgb(136, 181, 253)); /* Set the gradient colors */
    -webkit-background-clip: text;
    color: transparent;
    background-size: 200% auto;
    background-position: left; /* Initial position to start from the left */
    animation: gradientAnimation 4s linear infinite alternate; /* Apply the animation */
    font-family: "Paytone One", sans-serif;
    font-style: normal;
}

@keyframes gradientAnimation {
    0% {
        background-position: left; /* Start from the left */
    }
    100% {
        background-position: right; /* Move to the right */
    }
}

</style>
