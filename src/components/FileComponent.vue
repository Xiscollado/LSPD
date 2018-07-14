<template>
  <div class="card mb-4" v-on:click="$router.push({ name: 'files', params: { id: file.user_id }})">
    <img class="card-img-top" src="../assets/placeholder.png" alt="Card image cap">
    <div class="badges-container">
      <span class="badge badge-danger seek-badge" v-if="file.isOnSeek">En busca y captura</span>
      <span class="badge badge-dark crimes-badge" v-if="file.crimesCount > 0">Delitos: {{ file.crimesCount }}</span>
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
