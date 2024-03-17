<template>
    <div class="editor-with-list">
        <div class="editor-tree" :class="{ center: !files.length }">
            <ul v-if="files.length" class="file-list">
                <li class="file" v-for="file in files" :key="file.uid" :class="{ active: current === file }"
                    @click="preview(file)">
                    <i class="icon">
                        <JsonIcon></JsonIcon>
                    </i>
                    <span class="title">{{ file.name }}</span>
                </li>
            </ul>
            <ElEmpty v-else :image-size="100"></ElEmpty>
        </div>

        <section class="editor-section">
            <header>
                <h4 class="title">
                    <span>{{ current ? '正在编辑：' + current?.name : '尚未打开任何文件' }}</span>
                    <el-button plain text bg v-if="current">上传当前</el-button>
                    <el-button type="primary" v-if="files.length">上传全部</el-button>
                </h4>
            </header>
            <div ref="editorRef" class="editor"></div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import JsonIcon from '@/icons/JsonIcon.vue';

const props = defineProps({
    files: Array,
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