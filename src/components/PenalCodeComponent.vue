<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col">
        <h2><strong>Penal Code</strong></h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="input-group mb-4">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Buscar por texto:</span>
          </div>
          <input type="text" class="form-control" placeholder="aquí..." v-model="query">
        </div>
        <codetext :query="query"></codetext>
      </div>
      <div class="col">
        <sidebar sidebarPage="penalCode"></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './SidebarComponent'
import codetext from './CodeTextComponent'

export default {
  data () {
    return {
      query: ''
    }
  },
  name: 'CodigoPenal',
  components: { sidebar, codetext }
}
</script>
