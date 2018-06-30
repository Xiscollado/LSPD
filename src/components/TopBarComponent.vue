<template>
  <nav class="navbar navbar-dark bg-primary fixed-top">
    <div class="container">

      <a class="navbar-brand" href="#">
        <img src="../assets/lspd_logo.png" width="30" height="30" alt="">
        <strong>LSPD</strong>
      </a>

      <ul class="nav justify-content-end">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            Volver al inicio
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/penal-code">
            Ir al código penal
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-if="Object.keys(this.$store.state.user).length === 0">{{ $t("topbar.login")
            }}</a>
          <a class="nav-link" href="#" v-else>logout</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">{{ $t("topbar.register") }}</a>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script>
  export default {}
</script>
