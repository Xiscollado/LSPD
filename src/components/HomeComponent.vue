<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Escribe ID o nombre</span>
          </div>
          <input type="text" class="form-control" placeholder="aquí..." v-model="query">
        </div>
        <fichas class="mt-5 mb-5" :query="query"></fichas>
      </div>
      <div class="col">
        <sidebar sidebarPage="home"></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './SidebarComponent'
import fichas from './FilesComponent'

export default {
  name: 'Home',
  components: {sidebar, fichas},
  data () {
    return {
      info: 'loading',
      query: ''
    }
  }
}
</script>
