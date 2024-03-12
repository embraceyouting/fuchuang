<template>
    <div>
      <e-charts class="chart" :option="option" style="height: 320px; width: 320px;" />
    </div>
</template>
  
<script setup>
    import { ref, computed } from 'vue';

    const data = ref([
    { value: 67, name: 'A' },
    { value: 40, name: 'B' },
    { value: 120, name: 'C' },
    { value: 58, name: 'D' },
    { value: 85, name: 'E' },
    ]);
    const option = computed(() => {
    return {
        series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: data.value,
            emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            },
        },
        ],
    };
    });
</script>


<style scoped>
.chart {
    height: 320px;
}
</style>
  