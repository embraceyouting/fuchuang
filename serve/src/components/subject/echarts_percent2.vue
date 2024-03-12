<template>
    <div>
      <e-charts class="chart" :option="option" style="height: 320px; width: 320px; " />
    </div>
</template>
  
<script setup>
    import { ref, computed } from 'vue';
    const data = ref([
        { value: 67, name: 'A' },
        { value: 40, name: 'B' },
        { value: 100, name: 'C' },
        { value: 58, name: 'D' },
        { value: 85, name: 'E' }
    ]);

    const option = computed(() => {
    return {
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: data.value.map((item) => item.value),
                type: 'bar',
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
  