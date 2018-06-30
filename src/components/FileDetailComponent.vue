<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-12">
            <header>
              <h1><strong>{{ file.name }}</strong></h1>
              <h3>{{ file.cardID }}</h3>
            </header>
            <span v-show="file.isOnSeek" class="badge badge-warning">EN BUSCA Y CAPTURA</span>
            <span class="badge badge-dark">Crímenes: 23</span>
            <span class="badge badge-danger">Peligroso</span>
            <hr>
            <div class="row">
              <div class="col-12">
                <h4>Delitos cometidos</h4>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Cras justo odio
                    <span class="badge badge-primary badge-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Dapibus ac facilisis in
                    <span class="badge badge-primary badge-pill">2</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Morbi leo risus
                    <span class="badge badge-primary badge-pill">1</span>
                  </li>
                </ul>
              </div>
              <div class="col-12 mt-4">
                <h4>Propiedades conocidas</h4>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Cras justo odio
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Dapibus ac facilisis in
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Morbi leo risus
                  </li>
                </ul>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col">
                <h4>Notas</h4>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text.
                  It has roots in a piece of classical Latin literature from 45 BC, making
                  it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                  College in Virginia, looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                  discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                  Bonorum et Malorum"
                  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
                  ethics, very popular
                  during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
                  line in section 1.10.32.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <img v-bind:src="file.image" alt="Criminal image" class="img-fluid img-thumbnail mb-4">
        <button class="btn btn-primary btn-block">Quitar de búsqueda y captura</button>
        <sidebar sidebarPage="home" class="mt-4"></sidebar>
      </div>
    </div>
  </div>
</template>
<script>
import FilesService from '../services/FilesService'
import sidebar from './SidebarComponent'
export default {
  data () {
    return {
      file: null,
      files: null
    }
  },
  components: {sidebar},
  created () {
    let id = this.$route.params.id
    this.files = FilesService.getFiles()
    this.file = FilesService.getFileByID(id, this.files)
  }
}
</script>
