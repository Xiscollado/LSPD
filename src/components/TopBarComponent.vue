<template>
  <header class="navbar navbar-dark bg-primary fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="../assets/lspd_logo_light.png" height="50" class="pr-2">
        R.E.C.T.O
      </a>

      <ul class="nav justify-content-end">
        <li class="nav-item pl-2">
          <router-link class="nav-link btn btn-dark btn-sm" to="/">
            <i class="fas fa-users pr-2"></i> FICHAS
          </router-link>
        </li>
        <li class="nav-item pl-2">
          <router-link class="nav-link btn btn-dark btn-sm" to="/penal-code">
            <i class="fas fa-book pr-2"></i> CÓDIGO PENAL
          </router-link>
        </li>
        <li class="nav-item pl-2">
          <router-link class="nav-link btn btn-dark btn-sm" to="/login" v-if="!accessToken">{{ $t("topbar.login") }}</router-link>
          <a class="nav-link btn btn-danger btn-sm" href="#" v-on:click.prevent="logout" v-else><i class="fas fa-sign-out-alt pr-2"></i>SALIR</a>
        </li>
      </ul>
    </div>
  </header>
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
    logout () {
      this.deleteAccessToken()
      this.$router.push('/login')
    }
  }
}
</script>
