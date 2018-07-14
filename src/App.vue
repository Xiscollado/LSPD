<template>
  <div id="app">
    <topbar></topbar>
    <router-view/>
    <footer class="recto-footer">
      <div class="container">
        <div class="container text-center">
          <strong>R.E.C.T.O.</strong> Todos los derechos reservados, Despistaos.es by Despistaos LSPD Team
        </div>
      </div>
    </footer>
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
    padding-top: 150px;
  }

  .recto-footer {
    padding: 4rem 0;
    background-color: #ced4da;
  }
</style>
