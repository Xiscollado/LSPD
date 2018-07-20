<template>
  <section class="mt-4 container mb-4">
    <div class="row justify-content-center">
      <div class="col-6 text-center">
        <img src="../assets/lspd_logo.png" height="150" class="mb-4">
        <form class="text-left">
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Enter email" v-model="auth.email" required>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                   v-model="auth.password" required>
          </div>
          <button class="btn btn-primary" v-on:click.prevent="sendLogin">Identificarse</button>
          <div class="alert alert-danger mt-2" role="alert" v-if="getErrorMessage">
            {{ getErrorMessage.response.data.message }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      auth: {email: '', password: ''},
      login_url: this.$store.state.api.login + '/oauth/token',
      api_url: this.$store.state.api.url,
      error: null
    }
  },
  created() {
    this.updateErrorMessage(null)
  },
  computed: {
    ...mapGetters([
      'getErrorMessage'
    ])
  },
  methods: {
    ...mapActions([
      'updateErrorMessage',
      'updateAccessToken'
    ]),
    sendLogin: function () {
      let auth = {
        grant_type: this.$store.state.grant_type,
        client_id: this.$store.state.client_id,
        client_secret: this.$store.state.client_secret,
        username: this.auth.email,
        password: this.auth.password,
        scope: '*'
      }

      axios({
        method: 'post',
        url: this.login_url,
        data: auth,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then((response) => {
          this.updateAccessToken(response.data)
          this.getUser()
        })
        .catch(error => this.updateErrorMessage(error))
    },
    getUser: function () {
      axios({
        method: 'get',
        url: this.api_url + '/user',
        headers: {
          'Accept': 'application/json',
          Authorization: 'Bearer ' + this.$store.state.access_token
        }
      })
        .then((response) => {
          this.$store.state.user = response.data
          this.$router.push('/')
        })
        .catch(error => this.updateErrorMessage(error))
    }
  }
}
</script>
<style>

</style>
