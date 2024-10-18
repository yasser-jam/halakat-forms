<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref({
  labels: ['حلقة التفوق', 'حلقة المتميزين', 'حلقة الحفاظ'],
  datasets: [
    {
      label: 'محصلة الصفحات',
      data: [10, 42, 23],
      backgroundColor: '#0D9488',
    },
  ],
});

const chartOptions = ref({
  responsive: true,
});
</script>
