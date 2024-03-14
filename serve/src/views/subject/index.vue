<template>
    <div class="main">
        <!-- <div class="side_part">
            <div class="title">My Subject</div>
            <div class="scoll_part">
                <div class="name_file" v-for="(item, index) in subjects" :key="item.id" :title="item.filename">
                    <router-link class="over" :to="`/subject/${item.filename}`">{{ item.filename }}</router-link>
                    <div class="icon_dlt" @click="delete_json(item, index)">
                        <el-icon class="icon">
                            <CloseBold />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="middle_part">
            <div class="introduce" v-for="(info,index) in infos" v-animate="{ direction: index % 2 ? 'left' : 'right' }" :key="index">
                <component :is="info.echart" class="echart"></component>
                <div class="content">
                    <h4>{{ info.title }}</h4>
                    <p>{{ info.content }}</p>
                </div>
            </div>
            <div class="vary_part">

            </div>
        </div>
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
import echarts_percent from "../../components/subject/echarts_percent.vue"
import echarts_score from "../../components/subject/echarts_score.vue"
import { ref } from "vue"
import axios from "axios"
import { CloseBold } from '@element-plus/icons-vue'
import { ElIcon } from "element-plus"

let ispreview_delete = ref(false);
let delete_item = ref(null);
const subjects = ref([]);
let isdelete = ref(null);
let resolveBeforeRemove;

axios.get("http://127.0.0.1:8000/subject")
    .then(res => {
        subjects.value = res.data; // Assuming the response is an array of subjects
        console.log(subjects.value)
    })
    .catch(error => {
        console.error("Error fetching subjects:", error);
    });

let infos = [
    {
        title:"占比情况",
        echart:echarts_percent,
        content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."

    },
    {
        title:"得分情况",
        echart:echarts_score,
        content: "测试乱文 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sequi unde facere dolore non, vero consectetur iure reprehenderit, rerum, numquam esse alias blanditiis. Explicabo autem quo, ipsa distinctio enim dolorum."

    }
]


function delete_json(item, index) {
    ispreview_delete.value = true
    delete_item.value = item.filename;
    console.log(delete_item.value)
    new Promise(resolve => { resolveBeforeRemove = resolve; })
        .then(result => {
            if (result) {
                subjects.value.splice(index, 1);
            }
        });
}

function confirmDelete() {
    axios.delete(`http://127.0.0.1:8000/subject/delete?filename=${delete_item.value}`)
        .then((response) => {
            // 请求成功，处理响应的数据
            console.log(response.data);
        })
        .catch((error) => {
            // 请求失败，处理错误
            console.error(error);
        });
    ispreview_delete.value = false;
    isdelete.value = true;
    resolveBeforeRemove(isdelete.value);
}

function cancelDelete() {
    ispreview_delete.value = false;
}


</script>

<style lang="scss" scoped>
.main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: calc(100vh - 112px);
    /* 剩下页面高度减去导航栏高度 */
    min-height: 500px;

    .side_part {
        padding: 10px 0px 10px 0px;
        height: 88%;
        background-color: #ffff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        display: flex;
        flex-direction: column;
        min-width: 250px;

        .title {
            height: 50px;
            border-bottom: #dbdbdb 1px solid;
            text-align: center;
            font-family: "Paytone One", "PingFangSC", sans-serif;
            font-weight: 200;
            font-style: normal;
            color: #5f86ea;
            font-size: 28px;
            display: flex;
            justify-content: center;
            padding: 0 0 10px 0;
            box-shadow: 0 8px 6px -6px #97afeb;
        }

        .scoll_part {
            overflow-y: auto;
            mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
            padding-bottom: 60px;

            .name_file {
                width: calc(100% - 10px);
                height: 50px;
                box-sizing: border-box;
                margin-left: 10px;
                padding: 0 10px 0 10px;
                border-bottom: #dbdbdb 1px solid;
                text-align: center;
                font-weight: 200;
                font-style: normal;
                color: #97afeb;
                /* 使用省略号表示超出部分 */
                display: flex;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
                /* 垂直居中 */

                a {
                    margin: 0;
                    text-decoration: none;
                    color: #97afeb;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    padding-right: 24px;
                    /* 禁止换行 */
                    text-overflow: ellipsis;
                    font-family: "Paytone One", "PingFangSC", sans-serif, "YouYuan";
                    /* 禁止手型光标 */
                }

                &:hover {
                    a {
                        padding-right: 12px;
                    }

                    .icon_dlt {
                        display: block;
                    }
                }

                .icon_dlt {
                    display: float;
                    float: right;
                    display: none;

                    .icon {
                        width: 0.8em;
                        height: 0.8em;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        overflow: hidden;
                        cursor: pointer;
                        /* 禁止手型光标 */
                    }
                }
            }
        }
    }

}

.middle_part {
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    .introduce {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 40px;

        .echart{

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
                width: 85%;
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

/* 滚动动画 */
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-20%);
    }

    50% {
        transform: translateX(0%);
    }

    75% {
        transform: translateX(20%);
    }

    100% {
        transform: translateX(0);
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
</style>
