<template>
<div class="row">
  <div class="col-md-4" v-for="file in files" v-show="(file.name.toLowerCase()).indexOf(query.toLowerCase()) !== -1 || (file.cardID.toLowerCase()).indexOf(query.toLowerCase()) !== -1">
    <ficha :file="file"></ficha>
  </div>
</div>
</template>

<script>
import ficha from './FileComponent'
import FilesService from '../services/FilesService'
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
  mounted () {
    // Mockup de la base de datos
    this.files = FilesService.getFiles()
  }
}
</script>
