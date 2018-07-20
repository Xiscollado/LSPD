<template>
<section>
  <div class="list-group mb-5">
    <div class="card mb-2" v-for="crime in penalCode" v-if="actualChapter === crime.chapterId || !actualChapter" v-show="(crime.title.toLowerCase()).indexOf(query.toLowerCase()) !== -1">
      <div class="card-header">
        <h5 class="card-title mb-0"><strong>{{ crime.title }}</strong></h5>
      </div>
      <div class="card-body">
        <p class="card-text">{{ crime.description }}</p>
        <small>{{ crime.fine }}$ / {{ crime.months }} meses</small>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary btn-sm" v-on:click="addCrime(crime)"><i class="fas fa-shopping-cart pr-2"></i> Añadir crimen</button>
        <button v-if="user.admin && user.admin.isAdmin === 1" class="btn btn-warning btn-sm" data-toggle="modal" :data-target="['#modalCrime-' + crime.id]"><i class="fas fa-pencil-alt pr-2"></i> Modificar crimen</button>
      </div>
    </div>
  </div>
  <div v-for="crime in penalCode" v-if="actualChapter === crime.chapterId || !actualChapter" class="modal fade" tabindex="-1" role="dialog" :id="['modalCrime-' + crime.id]">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modificar artículo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="crimeTitle"><strong>Título</strong></label>
            <input type="text" name="crimeTitle" class="form-control" v-model="crime.title">
          </div>
          <div class="form-group">
            <label><strong>Descripción</strong></label>
            <textarea name="crimeDescription" class="form-control" rows="5" v-model="crime.description"></textarea>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label><strong>Multa</strong></label>
                <div class="input-group">
                  <input type="text" name="crimeFine" class="form-control" v-model="crime.fine">
                  <div class="input-group-append">
                    <span class="input-group-text">$</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label><strong>Meses</strong></label>
                <input type="text" name="crimeMonths" class="form-control" v-model="crime.months">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="updateCrime(crime)">Modificar Artículo</button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'

export default {
  props: {
    query: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      penalCode: null
    }
  },
  computed: {
    ...mapGetters([
      'actualChapter',
      'user'
    ])
  },
  created() {
    axios.get(this.$store.state.api.url + '/crimes', {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.access_token
      }
    }).then(response => {
      this.penalCode = response.data
    })
  },
  methods: {
    ...mapActions({
      addCrime: 'addCrimeAction'
    }),
    updateCrime(crime){
      $('#modalCrime-' + crime.id).modal('toggle')
      axios({
        method: 'post',
        url: this.$store.state.api.url + '/crimes/' + crime.id,
        data: {title: crime.title, description: crime.description, fine:crime.fine, months:crime.months},
        headers: {
          'Accept': 'application/json',
          Authorization: 'Bearer ' + this.$store.state.access_token
        }
      })
        .then((response) => {
          return response
        })
        .catch(error => {
          return error
        })
    }
  }
}
</script>
<style>
  .card{
    cursor: default;
  }
</style>
