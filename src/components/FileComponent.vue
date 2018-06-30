<template>
  <div class="card mb-4" v-on:click="$router.push({ name: 'files', params: { id: file.id }})">
    <img class="card-img-top" v-bind:src="file.image" alt="Card image cap">
    <div class="badges-container">
      <span class="badge badge-danger seek-badge" v-if="file.isOnSeek">En busca y captura</span>
      <span class="badge badge-dark crimes-badge" v-if="file.crimesCount > 0">Delitos: {{ file.crimesCount }}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ file.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ file.cardID }}</h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">Actualizada: {{ file.updatedDate }}</li>
    </ul>
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
  .card{
    cursor:pointer;
  }
  .badges-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  .card-img-top{
    display: block;
    height: 200px;
    object-fit: cover;
  }

</style>
