<template>
  <div>
    <hr>
    <h1>Send</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="addressGroup"
                    label="Address:"
                    description="We'll never share your address with anyone else.">
        <b-form-input id="addressInput"
                      v-model="form.address"
                      required
                      placeholder="Enter NEM Address">
        </b-form-input>
      </b-form-group>
      <b-form-group id="amountInputGroup" label="Amount:">
        <b-form-input id="amountInput"
                      type="number"
                      v-model="form.amount"
                      required
                      placeholder="Enter amount">
        </b-form-input>
      </b-form-group>
      <b-form-group id="messageInputGroup" label="Message:">
        <b-form-input id="messageInput"
                      type="text"
                      v-model="form.message"
                      required
                      placeholder="Enter message">
        </b-form-input>
      </b-form-group>
      <!--
      <b-form-group id="exampleGroup4">
        <b-form-checkbox v-model="form.checked" id="exampleInput4">
          Check me out
        </b-form-checkbox>
      </b-form-group>
    -->
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <!-- Modal -->
    <b-modal ref="myModalRef" hide-footer title="Congratulation">
      <div class="d-block text-center">
        <h3>Send Success !!!</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal>

  </div>
</template>

<script>
import { postThanksSend } from '../api.js'

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: false
      },
      // foods: [
      //   { text: 'Select One', value: null },
      //   'Carrots', 'Beans', 'Tomatoes', 'Corn'
      // ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      var parameters = {
        receivedAddress: this.form.address,
        amount: this.form.amount,
        message: this.form.message
      }
      postThanksSend(parameters).then((response) => {
        console.log(response)
        this.showModal()
      }).catch(error => { console.log(error) })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.address = ''
      this.form.amount = ''
      this.form.message = null
      this.form.checked = false
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>
