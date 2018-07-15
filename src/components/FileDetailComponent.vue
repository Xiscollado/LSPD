<template>
  <section>
    <!--MODAL NOTE-->
    <div class="modal fade" tabindex="-1" role="dialog" id="updateNoteModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crea una nota</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea name="note" class="form-control" id="noteText" rows="10" v-model="data.note"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateNote()" data-toggle="modal"
                    data-target="#updateNoteModal">Actualizar notas
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--MODAL IMAGE-->
    <div class="modal fade" tabindex="-1" role="dialog" id="updateImageModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Inserta la URL de una imagen</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" v-model="data.image" class="form-control">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateImage()" data-toggle="modal"
                    data-target="#updateImageModal">Actualizar Imagen
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <img v-if="data.image" v-bind:src="data.image" alt="Criminal image" class="img-fluid img-thumbnail mb-4">
          <img v-else src="../assets/placeholder.png" alt="Criminal image" class="img-fluid img-thumbnail mb-4">
          <header class="mb-4">
            <h2 class="mb-3"><strong>{{ data.result.name }} {{ data.result.firstname }}</strong></h2>
            <h5><strong>DNI:</strong> {{ data.result.registration }}</h5>
            <h5><strong>ID:</strong> {{ data.result.user_id }}</h5>
            <h5><strong>EDAD:</strong> {{ data.result.age }}</h5>
            <h5><strong>TELF:</strong> {{ data.result.phone }}</h5>
            <h5><strong>BANK:</strong> {{ data.money.bank }} $</h5>
            <hr>
            <span v-if="data.dangerous === 1" class="badge badge-danger">Peligroso</span>
            <span v-if="data.underseek === 1" class="badge badge-warning">En búsqueda y captura</span>
            <hr>
            <button class="btn btn-info btn-block" data-toggle="modal" data-target="#updateImageModal">Actualizar foto</button>
            <button class="btn btn-info btn-block"
                    v-on:click="updateState({state: 'underseek', value: data.underseek})">Actualizar búsqueda
            </button>
            <button class="btn btn-info btn-block"
                    v-on:click="updateState({state: 'dangerous', value: data.dangerous})">Actualizar peligroso
            </button>
            <button class="btn btn-info btn-block" data-toggle="modal" data-target="#updateNoteModal">Actualizar notas
            </button>
            <button class="btn btn-danger btn-block" v-on:click="deleteNote()">Borrar notas</button>
          </header>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-12 mb-4">
                  <div v-if="data.note" class="alert alert-danger mb-4" role="alert">
                    <strong>IMPORTANTE: </strong>{{ data.note }}
                  </div>
                  <h4>Antecedentes penales</h4>
                  <ul class="list-group">
                    <li class="list-group-item" v-for="crime in data.crimes">{{ crime }}</li>
                  </ul>
                  <p v-show="!data.crimes"><strong>Sin antecedentes penales</strong></p>
                  <h4 class="mt-4">Deudas</h4>
                  <ul class="list-group">
                    <li class="list-group-item" v-for="deuda in data.deudas">{{ deuda }}</li>
                  </ul>
                  <p v-show="!data.deudas"><strong>Sin deudas pendientes</strong></p>
                </div>
                <div class="col-12 mb-4" v-show="data.vehicles || data.business || data.homes">
                  <h4>Propiedades</h4>
                  <div class="row">
                    <div class="col-6">
                      <h5 v-show="data.vehicles" class="mt-4 mb-4"><strong>Vehículos (work in progress..)</strong></h5>
                      <ul v-if="data.vehicles" class="list-group">
                        <li class="list-group-item" v-for="vehicle in data.vehicles">{{ vehicle.vehicle }}</li>
                      </ul>
                    </div>
                    <div class="col-6">
                      <h5 v-show="data.homes" class="mt-4 mb-4"><strong>Casas en propiedad</strong></h5>
                      <ul v-if="data.homes" class="list-group mb-4">
                        <li class="list-group-item" v-for="home in data.homes">{{ home.home }} {{ home.number }}</li>
                      </ul>
                      <h5 v-show="data.business" class="mt-4 mb-4"><strong>Negocios conocidos</strong></h5>
                      <ul v-if="data.business" class="list-group mb-4">
                        <li class="list-group-item"><strong>Negocio de {{ data.business.nombre }}</strong> Con un
                          capital
                          de: {{ data.business.capital }} $
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {
        note: '',
        dangerous: 0,
        underseek: 0,
        image : null,
        result: {},
        crimes: {},
        deudas: null,
        historialEMS: {},
        vehicles: null,
        homes: null,
        money: {
          bank: 0
        },
        business: null
      }
    }
  },
  created() {
    axios.get(this.$store.state.api.url + '/files/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.access_token
      }
    }).then(response => {
      this.updateResults(response.data)
    })
  },
  methods: {
    updateResults(response) {
      this.data.result = response[0]

      if (this.data.result.police_records) {
        this.data.crimes = this.getDataFromFile(this.data.result.police_records, 'vRP:police_records')
        this.data.deudas = this.getDataFromFile(this.data.result.police_records, 'vRP:police_deuda')
        this.data.historialEMS = this.getDataFromFile(this.data.result.police_records, 'vRP:ems_historial')
      }

      if (this.data.result.vehicles) {
        this.data.vehicles = this.data.result.vehicles
      }

      if (this.data.result.homes) {
        this.data.homes = this.data.result.homes
      }

      if (this.data.result.money) {
        this.data.money = this.data.result.money
      }

      if (this.data.result.business) {
        this.data.business = this.data.result.business
      }

      this.data.note = this.data.result.details.notes
      this.data.dangerous = this.data.result.details.dangerous
      this.data.underseek = this.data.result.details.underSeek
      this.data.image = this.data.result.details.image
    },
    getDataFromFile(data, recordData) {
      var dataResult = null
      // traverse police records and get all info
      data.forEach(function (record) {
        if (record.dkey === recordData) {
          dataResult = record.dvalue
        }
      })
      if (dataResult) {
        dataResult = dataResult.split('<br />')

        dataResult = dataResult.filter(function (e) {
          return e
        })
        return dataResult
      } else {
        return null
      }
    },
    deleteNote() {
      this.data.note = ''
      this.updateNote()
    },
    updateNote() {
      axios({
        method: 'post',
        url: this.$store.state.api.url + '/files/' + this.$route.params.id + '/note',
        data: {note: this.data.note},
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
    updateState (newStateObject) {
      let value = (newStateObject.value === 1 ? 0 : 1)
      if (newStateObject.state === 'dangerous') {
        this.data.dangerous = value
      } else {
        this.data.underseek = value
      }
      axios({
        method: 'post',
        url: this.$store.state.api.url + '/files/' + this.$route.params.id + '/' + newStateObject.state,
        data: {value: value},
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
    updateImage () {
      axios({
        method: 'post',
        url: this.$store.state.api.url + '/files/' + this.$route.params.id + '/image',
        data: {image: this.data.image},
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
    }
  }
}
</script>
<style>

</style>
