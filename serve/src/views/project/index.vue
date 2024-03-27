<template>
  <div id="pdfContent" v-if="finish">
    <div class="page1-box pdfRef">
      <div class="content">
        <div class="project_name">Log4.json</div>
        <div v-for="report in reports" class="one_problem">
          <div class="problem">{{ report.problem }}</div>
          <div class="description">{{ report.description }}</div>
          <div class="solution">{{ report.solution }}</div>
          <div class="score">得分: {{ report.score }}</div>
          <div class="reason">{{ report.reason }}</div>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 100%;height:100vh;overflow: hidden" v-else>
    <iframe :src="src" style="width:100%; height:100%;border:none;"></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { htmlPdf } from "@/utils/htmlToPDF.js";
import { UploadPdf } from "@/utils/UploadPdf.js";
import service from '@/service';

const route = useRoute();
const reports = ref([]);
const finish = ref(true)
const src = ref (null)

onMounted(() => {
  const projectId = route.params.id;
  console.log(projectId);
  service.get(`/project/${projectId}`)
    .then(res => {
      reports.value = res.data;
      if(reports.value.length > 1){
        //如果返回的json数据的数组，表示第一次进入
        setTimeout(()=>{
          const fileName = '网站体验得分报告';
          const fileList = document.getElementsByClassName('pdfRef');
          htmlPdf(fileName, document.querySelector('#pdfContent'), fileList).then(res => {
            UploadPdf(res,projectId).then(res => {
              finish.value = false;
              src.value=`http://localhost:8000/pdf/${res.data}`
            });
          })
        },0)
      }
      else{
        //返回的是已经保存好了的pdf文件路径
        finish.value = false;
        src.value=`http://localhost:8000/pdf/${reports.value.path_pdf}`
      }
    })
});
</script>

<style scoped lang="scss">
*,html,body {
  margin: 0;
  padding: 0;
}

#pdfContent {
  margin: auto;
  width: 210mm;
  height: 279mm;
  padding: 17mm;
  background-color: #ffffff;

  .pdfRef {
    margin: auto;

    .one_problem {
      margin-top: 20px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;

      .problem {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .description,
      .solution,
      .score,
      .reason {
        margin-bottom: 10px;
      }

      .score {
        font-weight: bold;
      }
    }
  }
}

h1 {
  text-align: center;
}

.primary-btn {
  margin: 20px auto;
  display: block;
}
</style>
