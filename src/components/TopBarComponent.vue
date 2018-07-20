<template>
  <nav class="navbar navbar-dark bg-primary fixed-top">
    <div class="container">

      <a class="navbar-brand" href="#">
        <img src="../assets/lspd_logo_light.png" height="50" class="pr-2">
        R.E.C.T.O
      </a>

      <ul class="nav justify-content-end">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            FICHAS
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/penal-code">
            CÓDIGO PENAL
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login" v-if="!accessToken">{{ $t("topbar.login") }}</router-link>
          <a class="nav-link" href="#" v-on:click.prevent="logout" v-else>SALIR</a>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      register_url: process.env.API_URL + '/register'
    }
  },
  computed: {
    ...mapGetters([
      'accessToken'
    ])
  },
  methods: {
    ...mapActions([
      'deleteAccessToken'
    ]),
    logout (){
      this.deleteAccessToken()
      this.$router.push('/login')
    }
  }
}
</script>
