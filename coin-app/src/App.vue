<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Peace Coin</h1>
    <hr />
    <div class="container">
      <b-nav pills>
        <b-nav-item id="tab-dashboard" href="/dashboard">Dashboard</b-nav-item>
        <b-nav-item id="tab-send" href="/send">Send</b-nav-item>
        <b-nav-item id="tab-record" href="/transaction">Transaction</b-nav-item>
      </b-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
