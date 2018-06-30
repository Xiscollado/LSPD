<template>
  <div class="list-group">
    <a v-for="crime in penalCode" href="#" v-if="actualChapter === crime.chapter || !actualChapter"
       v-show="(crime.title.toLowerCase()).indexOf(query.toLowerCase()) !== -1"
       class="list-group-item list-group-item-action flex-column align-items-start"
       v-on:click="addCrime(crime)"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1"><strong>{{ crime.title }}</strong></h5>
        <small>Actualizado: {{ crime.updated }}</small>
      </div>
      <p class="mb-1">{{ crime.description }}</p>
      <small>{{ crime.fine }}$ / {{ crime.months }} meses</small>
    </a>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import PenalCodeService from '../services/PenalCodeService'

export default {
  props: {
    query: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      penalCode: null
    }
  },
  computed: {
    ...mapGetters([
      'actualChapter'
    ])
  },
  created: function () {
    this.penalCode = PenalCodeService.getPenalCode()
  },
  methods: {
    ...mapActions({
      addCrime: 'addCrimeAction'
    })
  }
}
</script>
