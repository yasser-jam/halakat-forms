<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
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

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['حلقة التفوق', 'حلقة المتميزين', 'حلقة الحفاظ'],
        datasets: [
          {
            label: 'محصلة الصفحات',
            data: [10, 42, 23],
            backgroundColor: '#0D9488'
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
