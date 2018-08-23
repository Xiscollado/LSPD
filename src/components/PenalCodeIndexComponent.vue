<template>
  <section>

    <li class="penal-code-index">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action" v-on:click="changeChapterAction(null)">
          Ver todo
        </a>
        <a v-for="chapter in chapterIndex" href="#" class="list-group-item list-group-item-action" v-on:click="changeChapterAction(chapter.id)">
          <strong>{{chapter.id}} - {{ chapter.name }}</strong>
          <p class="mt-2">
            <button v-if="user.admin && user.admin.isAdmin === 1" class="btn-warning btn-sm btn" data-toggle="modal" :data-target="['#modalTitle-' + chapter.id]"><i class="fas fa-pencil-alt pr-2"></i>Modificar</button>
          </p>
        </a>
      </div>
    </li>

    <div v-for="chapter in chapterIndex" class="modal fade" tabindex="-1" role="dialog" :id="['modalTitle-' + chapter.id]">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modificar título</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="crimeTitle"><strong>Título</strong></label>
              <input type="text" name="crimeTitle" class="form-control" v-model="chapter.name">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" v-on:click="modifyTitle(chapter)">Modificar título</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteTitle(chapter)">Borrar título</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import PenalCodeService from '../services/PenalCodeService'
  import axios from 'axios'
  export default {
    data () {
      return {
        chapterIndex: {}
      }
    },
    computed: {
      ...mapGetters([
        'user'
        ])
    },
    methods: {
      ...mapActions({
        changeChapterAction: 'changeChapterAction'
      }),
      getTitles() {
        axios.get(this.$store.state.api.url + '/titles', {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.access_token
          }
        }).then(response => {
          this.chapterIndex = response.data
        })
      },
      modifyTitle(chapter){
        $('#modalTitle-' + chapter.id).modal('toggle')
        axios({
          method: 'post',
          url: this.$store.state.api.url + '/titles/' + chapter.id,
          data: {name: chapter.name},
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
      deleteTitle(chapter){
        $('#modalTitle-' + chapter.id).modal('toggle')
        axios({
          method: 'delete',
          url: this.$store.state.api.url + '/titles/' + chapter.id,
          headers: {
            'Accept': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.access_token
          }
        })
        .then((response) => {
          this.getTitles();
        })
        .catch(error => {
          return error
        })
      }
    },
    created () {
      this.getTitles();
    }
  }
</script>
<style>
.penal-code-index {
  list-style: none;
}
</style>
