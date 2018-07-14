<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <img src="../assets/placeholder.png" alt="Criminal image" class="img-fluid img-thumbnail mb-4">
        <header>
          <h2 class="mb-3"><strong>{{ data.result.name }} {{ data.result.firstname }}</strong></h2>
          <h5><strong>DNI:</strong> {{ data.result.registration }}</h5>
          <h5><strong>ID:</strong> {{ data.result.user_id }}</h5>
          <h5><strong>EDAD:</strong> {{ data.result.age }}</h5>
          <h5><strong>TELF:</strong> {{ data.result.phone }}</h5>
          <h5><strong>BANK:</strong> {{ money }} $</h5>
        </header>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <h4>Antecedentes penales</h4>
                <ul class="list-group">
                  <li class="list-group-item" v-for="crime in data.crimes">{{ crime }}</li>
                </ul>
                <h4 class="mt-4">Deudas</h4>
                <ul class="list-group">
                  <li class="list-group-item" v-for="deuda in data.deudas">{{ deuda }}</li>
                </ul>
              </div>
              <div class="col-12 mt-4 mb-4">
                <h4>Propiedades</h4>
                <div class="row">
                  <div class="col-6">
                    <h5 v-show="vehicles" class="mt-4 mb-4"><strong>Vehículos (work in progress..)</strong></h5>
                    <ul v-if="vehicles" class="list-group">
                      <li class="list-group-item" v-for="vehicle in vehicles">{{ vehicle.vehicle }}</li>
                    </ul>
                  </div>
                  <div class="col-6">
                    <h5 v-show="homes" class="mt-4 mb-4"><strong>Casas en propiedad</strong></h5>
                    <ul v-if="homes" class="list-group mb-4">
                      <li class="list-group-item" v-for="home in homes">{{ home.home }} {{ home.number }}</li>
                    </ul>
                    <h5 v-show="business" class="mt-4 mb-4"><strong>Negocios conocidos</strong></h5>
                    <ul v-if="business" class="list-group mb-4">
                      <li class="list-group-item"><strong>Negocio de {{ business.nombre }}</strong> Con un capital de: {{ business.capital }} $ </li>
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
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {
        result: {},
        crimes: {},
        deudas: {},
        historialEMS: {},
        vehicles: {},
        homes: {},
        money: {},
        business: {}
      }
    }
  },
  created() {
    axios.get(this.$store.state.api.url + '/files/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.access_token
      }
    }).then(response => this.updateResults(response.data))
  },
  methods: {
    updateResults(response) {
      this.data.result = response[0]
      if (this.data.crimes) {
        this.data.crimes = this.getDataFromFile(this.data.result.police_records, 'vRP:police_records')
      }
      if (this.data.deudas) {
        this.data.deudas = this.getDataFromFile(this.data.result.police_records, 'vRP:police_deuda')
      }
      if (this.data.historialEMS) {
        this.data.historialEMS = this.getDataFromFile(this.data.result.police_records, 'vRP:ems_historial')
      }
      if (this.data.result.vehicles){
        this.vehicles = this.data.result.vehicles
      }

      if (this.data.result.homes){
        this.homes = this.data.result.homes
      }

      if (this.data.result.money){
        this.money = this.data.result.money.bank
      }

      if (this.data.result.business){
        this.business = this.data.result.business
      }
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
    }
  }
}
</script>
