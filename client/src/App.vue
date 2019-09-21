<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    if (localStorage.broToken) {
      const decoded = this.$utils.decodeToken(localStorage.broToken)
      this.$store.dispatch('setAuthenticated', !this.$utils.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  }
}
</script>

<style>
html,
body,
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
