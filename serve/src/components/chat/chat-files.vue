<template>
    <ul class="files" v-if="files.length">
        <TransitionGroup name="list">
            <li class="file" v-for="file in files" :key="file.id">
                <div class="file-info" @click="preview(file)">
                    <ElIcon size="24">
                        <JsonIcon v-if="file.type.includes('json')"></JsonIcon>
                        <Document v-else></Document>
                    </ElIcon>
                    <div class="info">
                        <b>{{ file.name }}</b>
                        <small>{{ getSize(file.size) }}</small>
                    </div>
                    <ElIcon class="remove" v-if="isRemove" @click.stop="remove(file)">
                        <Close />
                    </ElIcon>
                </div>
            </li>
        </TransitionGroup>
    </ul>
</template>

<script setup>
import JsonIcon from '@/icons/JsonIcon.vue';
import { Document, Close } from '@element-plus/icons-vue';

const props = defineProps({
    files: Array,
    isRemove: Boolean
})


function remove(file) {
    props.files.splice(props.files.indexOf(file), 1)
}

function preview(file) {
    window.open(URL.createObjectURL(file))
}

function getSize(size) {
    if (size < 1024) {
        return `${size}B`
    }
    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)}KB`
    }
    return `${(size / 1024 / 1024).toFixed(2)}MB`
}
</script>


<style lang="scss" scoped>
.files {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;

    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: .3s;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: scale(0.1);
    }

    .list-leave-active {
        position: absolute;
    }

    .file {
        height: 64px;
        width: fit-content;
        list-style: none;
        margin: 0;
        line-height: 1.5;
        font-size: 14px;
        background-color: $white;
        border-radius: 12px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .file-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 10px;
            position: relative;
            padding-right: 36px;

            .el-icon {
                margin: 0 4px;
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 4px;

                b {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 200px;
                }
            }

            .remove {
                cursor: pointer;
                right: 0;
                top: 0;
                position: absolute;
            }
        }
    }
}
</style>