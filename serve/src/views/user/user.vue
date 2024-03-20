<!-- <template>
    <div class="main">
        <div class="leftpart">
            <p>{{$t('user.name')}}: 111</p>
            <p><router-link to="/user/subject" active-class="active">{{$t('user.subject')}}</router-link></p>
            <p><router-link to="/user/info" active-class="active">{{$t('user.info')}}</router-link></p>    
        </div>
        <div class="rightpart">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="js">
// import { ref, reactive } from "vue";
// import axios from 'axios';

// // 这里假设你已经定义了 getCookie() 函数
// const email = getCookie("email");
// let subjects = ref([]);

// axios.get("http://127.0.0.1:8000/user", { params: { email: email } })
// .then(res => {
//     if (res.data.length > 0) {
//         console.log(res.data)
//         subjects.value = res.data;
//     } else {
//         console.error('未找到相关用户数据');
//     }
// })
// .catch(error => {
//     console.error('获取用户数据时出错：', error);
// });

const formatEmail = () => {
    userdata.email = userdata.email.trim().replace(/(@qq\.com$)|[^a-zA-Z0-9_\-.@]/g, '');
}
</script>

<style scoped lang="scss">
.main {
    width: 50%;
    height: 80vh;
    max-width: 800px;
    min-width: 400px;
    margin: auto;
    margin-top: 50px;
    display: flex;
    align-items: center;
    padding:0px 40px 0px 40px;
    border-radius: 15px;
    background-color: rgba(156, 168, 242, 0.6); /* 背景颜色透明度设置为 0.1 */
    backdrop-filter: blur(10px); /* 背景模糊度 */
    border: 1px solid rgba(255, 255, 255, 0.2); /* 边框颜色透明度设置为 0.2 */

    .leftpart {
        display: flex;
        flex-direction: column;
        align-items: start;
        flex: 2;
        border-right: 2px solid rgba(255, 255, 255, 0.217);
        height: 92%;
        margin-right: 40px;
        p{
            
            &:first-child{
                padding: 8px 6px;
                margin:17px 0;
                font-size: 20px;
            } 
            margin:30px 0;
            color: #ffffff;
            font-weight: 400;
            font-style: normal;
            transition: all .2s;
            line-height: 1;
            font-family: "Paytone One", "PingFangSC", sans-serif;
        }
        a{
            outline: 0;
            text-decoration: none;
            text-underline-position: under;
            cursor: pointer;
            font-size: 18px;
            color: #ffffff;
            font-weight: 400;
            font-style: normal;
            border-radius: 4px;
            padding: 8px 12px;
            transition: all .2s;
            line-height: 1;
            font-family: "Paytone One", "PingFangSC", sans-serif;
            &:hover {
                color: #8c8c8c;
                background-color: #e7e7e733;
            }

            &.active {
                background-color: #ffffff33;
                color: #fff;
            }
        }
    }

    .rightpart {
        height: 88%;
        flex: 7;
        overflow-y: scroll;
    }
}
</style> -->
