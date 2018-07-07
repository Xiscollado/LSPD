<template>
<div class="row">
  <div class="col-md-4" v-for="file in files" v-show="(file.name.toLowerCase()).indexOf(query.toLowerCase()) !== -1 || (file.cardID.toLowerCase()).indexOf(query.toLowerCase()) !== -1">
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
  components: { ficha },
  created () {
    axios
      .get('http://127.0.0.1:8000/api/files/')
      .then(response => (this.files = response.data.data))
  }
}
</script>
