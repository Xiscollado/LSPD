<template>
  <div class="card mb-4" v-on:click="$router.push({ name: 'files', params: { id: file.user_id }})">
    <img v-if="file.details && file.details.image" class="card-img-top" v-bind:src="file.details.image" alt="Card image cap">
    <img v-else class="card-img-top" src="../assets/placeholder.png" alt="Card image cap">
    <div class="badges-container">
      <span class="badge badge-warning" v-if="file.details && file.details.underSeek === 1">En busca y captura</span>
      <span class="badge badge-danger" v-if="file.details && file.details.dangerous === 1">Peligroso</span>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ file.name }} {{ file.firstname }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ file.registration }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
  .card {
    cursor: pointer;
  }

  .badges-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .card-img-top {
    display: block;
    height: 200px;
    object-fit: cover;
  }

</style>
