<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  mounted () {
    this.renderChart({
      labels: ['Takashi', 'Yudai', 'Kazuki', 'Chizuko'],
      datasets: [
        {
          backgroundColor: [
            '#922D62',
            '#A4577C',
            '#B37A91',
            '#C69EAE'
          ],
          data: [40, 20, 80, 10]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
