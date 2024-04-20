<template>
  <div class="main">
    <div class="swiper-container">
      <div v-if="isloading" style="height: 100%;width: 100%;" class="isloading">
        <loading></loading>
      </div>
      <swiper v-else :modules="modules" :simulateTouch="false" :navigation="true">
        <swiper-slide>
          <div class="charts">
            <div class="select_part">
              <el-select
                v-model="value"
                filterable
                placeholder="Select"
                style="width: 200px;"
                @change="handleChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            
            <div class="left">
              <div class="left_chart">
                <BorderBox2 class="text_pv"><span>{{ $t("visual.title.distribution") }}</span></BorderBox2>
                <div class="chart">
                  <stack></stack>
                </div>
              </div>
              <div class="left_chart">
                <BorderBox2 class="text_pv"><span>{{ $t("visual.title.ratings") }}</span></BorderBox2>
                <div class="chart">
                  <left_pie></left_pie>
                </div>
              </div>
              <div class="left_chart">
                <BorderBox2 class="text_pv"><span>{{ $t("visual.title.indicators") }}</span></BorderBox2>
                <div class="chart">
                  <left_line></left_line>
                </div>
              </div>
            </div>

            <div class="middle">
              <div class="china">
                <!-- <BorderBox2 class="text_pv"><span>用户地域分布</span></BorderBox2> -->
                <china></china>
              </div>
              <div class="middle_font">
                <BorderBox2 class="text"><span>{{ $t("visual.title.visits") }}</span></BorderBox2>
                <thermal></thermal>
              </div>
            </div>

            <div class="right">


              <div class="right_chart">
                <BorderBox2 class="text_pv"><span>{{ $t("visual.title.trends") }}</span></BorderBox2>
                <div class="chart">
                  <pie></pie>
                </div>

              </div>

              <div class="right_chart">
                <BorderBox2 class="text_pv"><span>{{ $t("visual.title.monitor") }}</span></BorderBox2>
                <div class="chart">
                  <linerace></linerace>
                </div>
              </div>

              <div class="right_chart">
                <BorderBox2 class="text_pv"><span>{{ $t("visual.title.signage") }}</span></BorderBox2>
                <div class="grid chart">
                  <div class="item" v-for="item in problemList" :key="item.name"
                    :style="{ background: getColor(item.times) }">
                    <div>
                      <span style="font-size: 32px;">{{ item.times }}</span>
                      <span><small>{{ item.name }}</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <World></World>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref ,toRef , computed } from "vue"
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import loading from "../../components/visualization/loading.vue"
import thermal from "../../components/visualization/thermal.vue"
import china from "../../components/visualization/china.vue"
import linerace from "../../components/visualization/linerace.vue"
import left_line from "../../components/visualization/left_line.vue"
import left_pie from "../../components/visualization/left_pie.vue"
import pie from "../../components/visualization/pie.vue"
import stack from "../../components/visualization/stack.vue"
import World from '@/components/charts/world.vue'
import service from '@/service'
import { BorderBox8, BorderBox2, BorderBox7, BorderBox6, BorderBox10 } from '@newpanjing/datav-vue3';

let value = ref("")
let options = []
service.get("/subject").then((res)=>{
  const optionsSet = new Set(res.data.map(obj => obj.url));
  options = [...optionsSet].map(url => ({ value: url, label: url }));
})

function handleChange(){
  isloading.value = true;
  setTimeout(()=>{
    isloading.value = false;
  },3000)
}

defineOptions({
  name: "visualization"
})

const modules = [Autoplay, Pagination, Navigation, A11y]
const isloading = ref(true)
setTimeout(() => isloading.value = false, 3000)

const problemList = [
  { name: '用户白屏', times: '1' },
  { name: '重复点击', times: '12' },
  { name: '加载错误', times: '10' },
  { name: '页面加载缓慢', times: '1' },
  { name: '点击报错', times: '9' },
  { name : '多个事件' , times: '12'}
];

function getColor(times) {
  if (times <= 5) {
    return "linear-gradient(45deg, #91CC7533, #91CC75)"
  } else if (times <= 10) {
    return "linear-gradient(45deg, #8AA2D933, #8AA2D9)"
  } else if (times <= 15) {
    return "linear-gradient(45deg, #FAC85833, #FAC858)"
  } else {
    return "linear-gradient(45deg, #EE666633, #EE6666)"
  }
}



</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);

  .swiper-container {
    width: 94%;
    height: 98%;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .isloading {
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(20px);
      background-color: rgba(212, 217, 236, 0.315);
      animation: isloadinganimation 0.5s ease-in-out;
    }

    .swiper {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      --swiper-navigation-color: white;
      position: initial;
      border-radius: 8px;

      .swiper-slide {
        display: flex;
        align-items: center;
        backdrop-filter: blur(20px);
        background-color: rgba(216, 221, 239, 0.5);
        gap: 40px;

        .charts {
          display: flex;
          justify-content: space-around;
          height: 100%;
          width: 100%;
          position: relative;

          .select_part{
            position:absolute;
            left: 50%;
            top: 17px;
            transform: translateX(-50%);
            z-index: 10000000;
          }

          .left {
            width: 24%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .left_chart {

              display: flex;
              flex-direction: column;
              margin-top: 10px;

              .text_pv {
                height: auto;
                width: fit-content;
                padding: 12px 20px;
                margin-bottom: 10px;
                margin-left: auto;
              }

              &:nth-child(1) {
                height: 39.2%;
                width: 100%;
              }

              &:nth-child(2) {
                height: 25%;
                width: 100%;
              }

              &:nth-child(3) {
                height: 30%;
                width: 100%;
                position: relative;

                .chart {
                  position: absolute;
                  inset: 0;
                }
              }

              .chart {
                flex: 1;
              }
            }
          }

          .middle {
            width: 48%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .china {
              height: 70%;
              width: 100%;
              margin-top: 10px;
              position: relative;

              .text_pv {
                position: absolute;
                top: 0;
                left: 0;
              }
            }

            .middle_font {
              height: 30%;
              width: 100%;
              display: flex;
              align-items: center;

              .text {
                width: 15px;
                padding: 15px 18px;
                font-size: 15px;
                box-sizing: content-box;
                height: fit-content;
                display: flex;
                justify-content: center;
                align-items: center;
                writing-mode: tb-rl;
                text-orientation: upright;
              }
            }

            .right {
              width: 24%;
              height: 100%;
              margin: 1% 0%;
            }
          }

          .text_pv {
            height: auto;
            width: fit-content;
            padding: 12px 20px;
            margin-bottom: 10px;
          }

          .right {
            width: 24%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .right_chart {
              width: 100%;
              margin-top: 10px;
              display: flex;
              flex-direction: column;

              .item {
                border-radius: 5px;
                backdrop-filter: blur(20px);
                padding: 2px;
                border: 1px solid #fff;
                background-color: #cc9a9ac1;


                &>div {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  height: 100%;
                  align-items: center;
                  padding: 5px 0 8px;
                  border: #fff 1px solid;
                  border-radius: 2px;

                  &>span {
                    line-height: 1.1;
                    font-family: "YouSheBiaoTiHei", "PingFangSC";
                    padding: 0 8px;
                    text-align: center;
                    white-space: nowrap;
                  }
                }


              }

              &:nth-child(1) {
                height: 32%;
              }

              &:nth-child(2) {
                height: 32%;
              }

              &:nth-child(3) {
                height: 30%;
              }

              .chart {
                flex: 1;
              }

              .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px
              }

              .text_pv {
                height: auto;
                width: fit-content;
                padding: 12px 20px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
}

:deep(.swiper-button-next) {
  transform: translateX(50px)
}

:deep(.swiper-button-prev) {
  transform: translateX(-50px)
}

:deep(.swiper-pagination-bullet) {
  width: 10%;
  height: 5px;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
}

:deep(.swiper-pagination-bullet-active) {
  width: 18%;
  height: 5px;
  border-radius: 5px;
}

:deep(.el-select__wrapper){
  background-color: rgba(244, 239, 239, 0.096);
}

:deep(.el-select__placeholder){
  color: black;
}

:deep(.el-icon svg){
  color: black;
}


@keyframes isloadinganimation {
  0% {
    opacity: 0;
    /* Start with opacity 0 */
  }

  50% {
    opacity: 1;
    /* Fade in to full opacity */
  }

  100% {
    opacity: 0;
    /* Fade out to opacity 0 */
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>