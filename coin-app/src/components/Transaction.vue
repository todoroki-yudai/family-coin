<template>
  <div>
    <hr>
    <h1>Transactions</h1>
    <b-table :items="items" :fields="fields">
      <template slot="show_details" scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
         {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
        <!-- In some circumstances you may need to use @click.native.stop instead -->
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-checkbox @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing">
          Details via check
        </b-form-checkbox>
      </template>
      <template slot="row-details" scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { getUsersMeTransactions } from '../api.js'

export default {
  data () {
    return {
      fields: [ 'Destination', 'Amount', 'Message', 'Timestamp' ],
      items: []
    }
  },
  mounted () {
    getUsersMeTransactions({}).then((response) => {
      this.items = []
      for (let data of response.data) {
        this.items.push({
          Destination: data.user_name,
          Amount: data.amount,
          Message: data.message,
          Timestamp: data.timestamp
        })
      }
      // console.log(tmpItems)
      // this.items = tmpItems
    }).catch(error => { console.log(error) })
  }
}
</script>
