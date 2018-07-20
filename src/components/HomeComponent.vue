<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row mb-4">
          <div class="col-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="">dni o nombre: </span>
              </div>
              <input type="text" class="form-control" placeholder="aquí..." v-model="query">
            </div>
          </div>
          <div class="col-6">
            <div class="btn-group float-right" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary disabled">Filtrar por: </button>
              <button type="button" v-on:click="addFilter('seek')" class="btn" v-bind:class="{'btn-success': filter === 'seek', 'btn-primary' : filter !== 'seek'}">Búsqueda y captura</button>
              <button type="button" v-on:click="addFilter('danger')" class="btn" v-bind:class="{'btn-success': filter === 'danger', 'btn-primary' : filter !== 'danger'}">Peligroso</button>
              <button type="button" v-on:click="addFilter('')" class="btn btn-secondary"><i class="far fa-times-circle"></i> Quitar filtros</button>
            </div>
          </div>
        </div>
        <fichas class="mb-5" :query="query"></fichas>
      </div>
    </div>
  </div>
</template>

<script>
import fichas from './FilesComponent'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {fichas},
  data () {
    return {
      info: 'loading',
      query: ''
    }
  },
  methods: {
    ...mapActions([
      'addFilter'
    ])
  },
  computed: {
    ...mapGetters(['filter'])
  }
}
</script>
