<template>
<section>
  <ul class="list-group">
    <div class="justify-content-between align-items-center mb-4">
      <strong v-show="getCrimesCart.length > 0" class="mb-2">Carrito de crímernes</strong>
      <strong v-show="getCrimesCart.length === 0" class="mb-2">No tienes crímenes en el carrito</strong>
      <i v-show="getCrimesCart.length > 0" class="fas fa-times float-right" v-on:click="removeAllCrimes"></i>
    </div>

    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(crime) in getCrimesCart">
      <span class="badge badge-light">{{ crime.qty }}</span>{{ crime.title }}
      <i class="fas fa-times float-right" v-on:click="removeCrime(crime)"></i>
    </li>
  </ul>
  <footer v-show="getCrimesCart.length > 0" class="mt-4">
    <h4><strong>Total</strong></h4>
    <strong>Multas: {{ getFinesCount }} / Meses: {{ getMonthsCount}}</strong>
  </footer>
</section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default{
  computed: {
    ...mapGetters([
      'getCrimesCart',
      'getFinesCount',
      'getMonthsCount'
    ])
  },
  methods: {
    ...mapActions({
      removeCrime: 'removeCrimeAction',
      removeAllCrimes: 'removeAllCrimesAction'
    })
  }
}
</script>
<style>
  .fa-times{
    cursor:pointer
  }
</style>
