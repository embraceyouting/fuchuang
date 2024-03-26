<template>
  <div>
    <h1>网站体验得分报告</h1>
    <button class="primary-btn" @click="handleExport">导出为PDF</button>
    <div id="pdfContent">
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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { htmlPdf } from "@/utils/htmlToPDF.js";
import service from '@/service';

const route = useRoute();
const reports = ref([]);

onMounted(() => {
  const projectId = route.params.id;
  console.log(projectId);
  service.get(`/project/${projectId}`)
    .then(res => {
      reports.value = res.data;
      console.log(reports.value)
    })
});

const handleExport = () => {
  const fileName = '网站体验得分报告';
  const fileList = document.getElementsByClassName('pdfRef');
  htmlPdf(fileName, document.querySelector('#pdfContent'), fileList);
  window.open('http://localhost:8000/pdf/1.pdf', '_blank');
};
</script>

<style scoped lang="scss">
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
