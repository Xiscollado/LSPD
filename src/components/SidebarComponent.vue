<template>
  <div class="sidebar mb-5">
    <ul class="list-group">
      <penalCodeIndex v-if="sidebarPage === 'penalCode'" class="mb-4"></penalCodeIndex>
      <CrimesCart></CrimesCart>
    </ul>
  </div>
</template>

<script>
import penalCodeIndex from './PenalCodeIndexComponent'
import CrimesCart from './CrimesCartComponent'
export default {
  props: ['sidebarPage'],
  components: { penalCodeIndex, CrimesCart }
}
</script>
<style>

</style>
