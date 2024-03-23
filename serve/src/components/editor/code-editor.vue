<template>
    <div class="editor-with-list">
        <div class="editor-tree" :class="{ center: !files.length }">
            <ul v-if="files.length" class="file-list">
                <li class="file" ref="fileItem" v-for="file in files" :key="file.uid"
                    :class="{ active: current === file }" @click="preview(file)">
                    <i class="icon">
                        <JsonIcon></JsonIcon>
                    </i>
                    <span class="title">{{ file.name }}</span>
                    <i class="remove">
                        <el-icon @click.stop="remove(file)">
                            <delete />
                        </el-icon>
                    </i>
                </li>
            </ul>
            <ElEmpty v-else :image-size="100"></ElEmpty>
        </div>

        <section class="editor-section">
            <header>
                <h4 class="title">
                    <span>{{ current ? $t('post.isedit') + current?.name : $t('post.iffiles') }}</span>
                    <el-icon v-if="current" @click="save(current)" title="save current file.">
                        <DocumentCopy />
                    </el-icon>
                    <el-button plain text bg v-if="current" @click="uploadCurrent">{{ $t('post.uploadnow')
                        }}</el-button>
                    <el-icon v-if="files.length" @click="saveAll(files)" title="save all files.">
                        <FolderOpened />
                    </el-icon>
                    <el-button type="primary" v-if="files.length" @click="uploadAll(files)">{{ $t('post.uploadall')
                        }}</el-button>
                </h4>
            </header>
            <div ref="editorRef" class="editor"></div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import * as monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import JsonIcon from '@/icons/JsonIcon.vue';
import { Delete, DocumentCopy, FolderOpened } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import service from '@/service';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


const props = defineProps({
    files: Array,
})
const fileItems = ref([]);
watch(() => props.files, () => {
    nextTick(() => {
        fileItems.value = Array.from(document.querySelectorAll('.file'));
    })

}, { deep: true });

defineExpose({
    fileItems
})

watch(() => props.files, () => {
    if (props.files.includes(current.value)) return
    current.value = null
    code.value = ''
    editor.setValue('')
}, { deep: true })

let editor = null;
let code = ref('');
const current = ref(null);
const editorRef = ref(null);


watch(code, () => {
    if (current.value) {
        current.value.raw = new File([new TextEncoder().encode(code.value)], current.value.name, { type: 'application/json' })
    }
})

function preview(file) {
    current.value = file
    const reader = new FileReader();
    reader.readAsText(file.raw);
    reader.onload = () => {
        code.value = reader.result;
        editor.setValue(reader.result);
    }
}

function remove(file) {
    props.files.splice(props.files.indexOf(file), 1)
}

function save(file) {
    saveAs(file.raw, file.name)
}

function saveAll(files) {
    const zip = new JSZip();
    files.forEach((file, index) => {
        const item = files.find(item => item.name === file.name)
        zip.file(item ? `${file.name.replace(/\.\w+$/, '')}_${index}.json` : file.name, file.raw)
    })
    zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'files.zip'))
}

function uploadCurrent() {
    // 获取当前文件对象
    if (current.value) {
        const files = current.value.raw;
        const formData = new FormData();
        formData.append('files', files); // 将文件添加到 FormData 中

        // 发送 POST 请求
        service.post("/subject", formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头
            }
        })
            .then((res) => {
                // 处理上传成功的响应
                ElMessage.success('上传成功')
                console.log(res.data);
            })
            .catch((err) => {
                // 处理上传失败的错误
                console.log(err);
            });
    }
}


// 处理上传全部文件的函数
function uploadAll(files) {
    // 获取所有文件列表
    const allFiles = [...files];

    // 创建 FormData 对象
    const formData = new FormData();

    // 将所有文件添加到 FormData 对象中
    allFiles.forEach(file => {
        if (file.raw) {
            formData.append('files', file.raw);
        } else {
            // 如果文件未编辑过，则从文件系统中读取文件并添加到 FormData 对象中
            fetch(file.url)
                .then(response => response.blob())
                .then(blob => {
                    const newFile = new File([blob], file.name, { type: 'application/json' });
                    formData.append('files', newFile);
                })
                .catch(error => console.error('Error fetching file:', error));
        }
    });

    // 发送 POST 请求
    service.post("/subject", formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // 设置请求头
        }
    })
        .then((res) => {
            // 处理上传成功的响应
            ElMessage.success('上传成功')
            console.log(res.data);
        })
        .catch((err) => {
            // 处理上传失败的错误
            console.log(err);
        });
}


function onEditorValueChange() {
    code.value = editor.getValue();
}

self.MonacoEnvironment = {
    getWorker(_, label) {
        return new jsonWorker();
    }
}

onMounted(() => {
    editor = monaco.editor.create(editorRef.value, {
        value: '',
        language: 'json',
        readOnly: false,
        theme: 'vs',
        wordWrap: 'on',
        selectOnLineNumbers: true, // select the line number's of the code
        roundedSelection: true, // rounded selection
        cursorStyle: 'line', // line, block, 'line-thin', 'block-outline', 'underline', 'underline-thin'
        automaticLayout: true, // auto layout
        glyphMargin: true, // the margin is used for glyph margin and line numbers
        useTabStops: true, // use tab key
        renderControlCharacters: false, // render control characters
        quickSuggestionsDelay: 100, // quick suggestions
        tabSize: 4, // tab size
        folding: true, // code folding
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: 'indentation', // 折叠方式  auto | indentation
        showFoldingControls: 'mouseover', // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true // 等宽优
    });

    editor.onDidChangeModelContent(onEditorValueChange)

    watch(() => current.value, () => {
        editor?.updateOptions({ readOnly: !current.value });
    }, { immediate: true })
});

onBeforeUnmount(() => {
    if (editor) {
        editor.dispose();
    }
});
</script>

<style scoped lang="scss">
.editor-with-list {
    height: 100%;
    width: 100%;
    display: flex;

    .editor-tree {
        width: 30%;
        height: 100%;
        background-color: #f5f5f5;
        padding: 10px;
        overflow: auto;
        border-radius: 4px 0 0 4px;

        &.center {
            display: flex;
            align-items: center;
            justify-content: center;
        }


        .file-list {

            margin: 0;
            padding: 0;
            list-style: none;

            .file {
                padding: 5px 12px;
                line-height: 1;
                cursor: pointer;
                display: flex;
                width: 100%;
                align-items: center;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-radius: 4px;
                margin-bottom: 4px;

                &:hover {
                    background-color: #f0f0f0;

                    .remove {
                        display: block;
                    }
                }

                &.active {
                    background-color: #eaeaea;
                }

                .icon {
                    width: 20px;
                    margin-right: 12px;
                }

                .title {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .remove {
                    display: none;
                }
            }
        }
    }



    .editor-section {
        width: 70%;
        height: 100%;
        border-radius: 0 8px 8px 0;

        header {
            height: 48px;
            background-color: #fff;
            line-height: 48px;
            border-top-right-radius: 4px;
            width: 100%;

            .title {
                display: flex;
                align-items: center;
                margin: 0 12px 0 18px;

                .el-icon {
                    margin: 0 4px;
                    font-size: 18px;
                    color: $color;
                    cursor: pointer;
                    transition: .1s;

                    &:hover {
                        color: $dark-color;
                    }

                    &:active {
                        filter: brightness(0.8);
                    }
                }

                span {
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                button {
                    margin-left: 4px;
                    box-sizing: content-box;
                    outline: unset;
                    border: unset;
                    height: fit-content;
                    width: fit-content;
                    padding: 4px 12px;
                    border-radius: 4px;
                    transition: .2s;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

        }

        .editor {
            width: 100%;
            height: calc(100% - 48px);

            :deep(*) {
                & {
                    font-family: inherit;
                }

                &:before,
                &:after {
                    font-family: codicon;
                }
            }
        }

    }


}
</style>