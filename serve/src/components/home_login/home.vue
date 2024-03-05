<template>
    <div class="post_part">
        <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:8000/submit_jsonpost"
        accept=".json"
        name="files"
        multiple
        >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
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
</template>
  
<script setup lang="js">
   import { UploadFilled } from '@element-plus/icons-vue'
</script>

<style lang="css">
.post_part{
    width: 500px;
    height: 400px;
    position:absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
}
</style>