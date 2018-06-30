<template>
  <div id="app">
    <topbar></topbar>
    <router-view/>
  </div>
</template>

<script>

import topbar from './components/TopBarComponent'

export default {
  name: 'App',
  components: {topbar}
}

</script>

<style>
  #app {
    padding-top: 100px;
  }
</style>
