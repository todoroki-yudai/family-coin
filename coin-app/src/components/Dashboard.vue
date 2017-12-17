<template>
  <div class="dashboard">
    <hr>
    <h1>{{ msg }}</h1>
    <ul class="list-group">
      <li class="justify-content-between">
        Your Address
        <mark>{{ user.address }}</mark>
      </li>
      <li class="justify-content-between">
        Balance
        <mark>{{ user.balance }}</mark>
      </li>
      <li class="justify-content-between">
        Next Increase coin
        <mark>{{ user.increase_coin }}</mark>
      </li>
    </ul>
    <hr>
    <ul>
      <li>
        Thanks Rate
        <div>
          <pie-chart></pie-chart>
        </div>
      </li>
      <li>
        Mesage Rate
        <div>
          <pie-chart></pie-chart>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import PieChart from '@/components/PieChart'
import { getUsersMe } from '../api.js'

// export default Line.extend({
export default {
  name: 'dashboard',
  components: {
    LineChart,
    PieChart
  },
  data () {
    return {
      msg: 'Dashboard',
      user: {
        address: 'Loading...',
        balance: 'Loading...',
        increase_coin: 'Loading...'
      }
    }
  },
  mounted () {
    // parameters.$config = {
    //   headers: {
    //     token: 'aaa'
    //     Access-Control-Allow-Origin: '*',
    //     Access-Control-Allow-Headers: 'Origin, X-Requested-With, Content-Type, Accept'
    //   }
    // }
    getUsersMe({}).then((response) => {
      this.user = response.data
    }).catch(error => { console.log(error) })
  }
}
// )
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
