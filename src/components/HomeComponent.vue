<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Escribe ID o nombre</span>
          </div>
          <input type="text" class="form-control" placeholder="aquí..." v-model="query">
        </div>
        <fichas class="mt-5 mb-5" :query="query"></fichas>
      </div>
    </div>
  </div>
</template>

<script>
import fichas from './FilesComponent'

export default {
  name: 'Home',
  components: {fichas},
  data () {
    return {
      info: 'loading',
      query: ''
    }
  }
}
</script>
