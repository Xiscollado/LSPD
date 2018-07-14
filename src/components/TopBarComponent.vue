<template>
  <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container">

      <a class="navbar-brand" href="#">
        <img src="../assets/lspd_logo.png" height="50" alt="">
      </a>

      <ul class="nav justify-content-end">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            Fichas
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/penal-code">
            Código penal
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login" v-if="!accessToken">{{ $t("topbar.login")
            }}</router-link>
          <a class="nav-link" href="#" v-on:click.prevent="logout" v-else>logout</a>
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
