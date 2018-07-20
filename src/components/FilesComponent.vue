<template>
  <div class="row">
    <v-wait for="my list is to load">
      <template slot="waiting">
        <div>
          <h2 class="text-center">Cargando fichas de ciudadanos...</h2>
        </div>
      </template>
    </v-wait>
    <div class="col-md-3" v-for="file in files"
         v-if="filter === 'seek' && file.details && file.details.underSeek || filter === '' || filter === 'danger' && file.details && file.details.dangerous "
         v-show="(file.firstname.toLowerCase()).indexOf(query.toLowerCase()) !== -1 || (file.name.toLowerCase()).indexOf(query.toLowerCase()) !== -1 || (file.registration.toLowerCase()).indexOf(query.toLowerCase()) !== -1">
      <ficha :file="file"></ficha>
    </div>
  </div>
</template>

<script>
import ficha from './FileComponent'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      files: {}
    }
  },
  props: {
    query: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters(['filter'])
  },
  components: {ficha},
  created () {
    this.$wait.start('my list is to load')
    axios.get(this.$store.state.api.url + '/files', {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.access_token
      }
    }).then(response => {
      this.updateFiles(response)
      this.$wait.end('my list is to load')
    })
  },
  methods: {
    updateFiles (files){
      this.files = files.data;
    }
  }
}
</script>
