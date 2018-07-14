<template>
  <div class="row">
    <div class="col-md-3" v-for="file in files"
         v-show="(file.firstname.toLowerCase()).indexOf(query.toLowerCase()) !== -1 || (file.name.toLowerCase()).indexOf(query.toLowerCase()) !== -1 || (file.registration.toLowerCase()).indexOf(query.toLowerCase()) !== -1">
      <ficha :file="file"></ficha>
    </div>
  </div>
</template>

<script>
import ficha from './FileComponent'
import axios from 'axios'

export default {
  data () {
    return {
      files: null
    }
  },
  props: {
    query: {
      type: String,
      required: false
    }
  },
  components: {ficha},
  created () {
    axios.get(this.$store.state.api.url + '/files', {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.access_token
      }
    }).then(response => this.updateFiles(response))
  },
  methods: {
    updateFiles (files){
      this.files = files.data;
    }
  }
}
</script>
