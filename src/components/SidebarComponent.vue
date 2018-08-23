<template>
  <section>
    <div class="sidebar mb-5">
      <ul class="list-group">
        <div class="btn-group-vertical" role="group" aria-label="Basic example">
          <button v-if="user.admin && user.admin.isAdmin === 1" class="btn btn-success text-left" data-toggle="modal"
          data-target="#modalCrimeCreate"><i class="fas fa-plus-square pr-2"></i>Añadir crimen al código
        </button>
        <button v-if="user.admin && user.admin.isAdmin === 1" class="btn btn-success mb-4 text-left" data-toggle="modal"
        data-target="#newChapterModal"><i class="fas fa-plus-square pr-2"></i>Añadir título al código
      </button>
    </div>
    <penalCodeIndex v-if="sidebarPage === 'penalCode'" class="mb-4"></penalCodeIndex>
    <CrimesCart></CrimesCart>
  </ul>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="modalCrimeCreate">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear artículo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="crimechapter"><strong>Capítulo</strong></label>
          <select class="form-control" v-model="crime.chapter">
            <option v-for="chapter in chapterIndex" :value="chapter.id">{{ chapter.name }}</option>
          </select>
        </div>
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
        <button type="button" class="btn btn-primary" v-on:click="createCrime(crime)">Crear Artículo</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="newChapterModal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear título</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="crimeTitle"><strong>Título</strong></label>
          <input type="text" name="crimeTitle" class="form-control" v-model="newChapter">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-on:click="createTitle(newChapter)">Crear título nuevo</button>
      </div>
    </div>
  </div>
</div>

</section>
</template>

<script>
  import penalCodeIndex from './PenalCodeIndexComponent'
  import CrimesCart from './CrimesCartComponent'
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    props: ['sidebarPage'],
    data() {
      return {
        crime: {},
        chapterIndex: {},
        newChapter: ''
      }
    },
    components: {penalCodeIndex, CrimesCart},
    computed: {
      ...mapGetters([
        'user'
        ])
    },
    mounted() {
      this.getTitles();
    },
    methods: {
      createCrime (crime) {
        $('#modalCrimeCreate').modal('toggle')
        axios({
          method: 'post',
          url: this.$store.state.api.url + '/crimes',
          data: {title: crime.title, description: crime.description, fine: crime.fine, months: crime.months, chapter:crime.chapter},
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
      },
      createTitle (newChapter) {
        $('#newChapterModal').modal('toggle')
        axios({
          method: 'post',
          url: this.$store.state.api.url + '/titles',
          data: {name: newChapter},
          headers: {
            'Accept': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.access_token
          }
        })
        .then((response) => {
          this.chapterIndex.push({'id' : response.data.id, 'name':response.data.name})
          return response
        })
        .catch(error => {
          return error
        })
      },
      getTitles() {
        axios.get(this.$store.state.api.url + '/titles', {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.access_token
          }
        }).then(response => {
          this.chapterIndex = response.data;
        })
      }
    }
  }
</script>
<style>

</style>
