<template>
  <section>
    <div class="container mb-4">
      <div class="row mb-4">
        <div class="col">
          <h2><strong>Atestado de la denuncia</strong></h2>
          <div class="card mt-4">
            <div class="card-header">Texto de la multa</div>
            <div class="card-body" id="copyToClipBoard">
              <p class="card-text" v-for="crime in getCrimesCart">{{ crime.title }} X {{ crime.qty }}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-success btn-sm" @click.stop.prevent="copyClipboard">Copia el
                Texto
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="card mt-4">
            <div class="card-header">Multa</div>
            <div class="card-body" id="testing-code">
              <h3><strong>{{ this.getFinesCount }} $</strong></h3>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card mt-4">
            <div class="card-header">Meses de carcel</div>
            <div class="card-body" id="testing-code">
              <h3><strong>{{ this.getMonthsCount }} MESES</strong></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            Se ha copiado el atestado al portapapeles.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable no-new */
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getCrimesCart',
      'getFinesCount',
      'getMonthsCount'
    ])
  },
  methods: {
    copyClipboard() {
      var elm = document.getElementById("copyToClipBoard");
      // for Internet Explorer

      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(elm);
        range.select();
        document.execCommand("Copy");
      }
      else if (window.getSelection) {
        // other browsers
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(elm);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy");
      }
      $('#confirmModal').modal('show')
    }
  },
}
</script>
<style>

</style>
