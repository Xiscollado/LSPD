<template>
  <li class="penal-code-index">
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action" v-on:click="changeChapterAction(null)">
        Ver todo
      </a>
      <a v-for="chapter in chapterIndex" href="#" class="list-group-item list-group-item-action" v-on:click="changeChapterAction(chapter.number)">
       {{ chapter.title }}
      </a>
    </div>
  </li>
</template>
<script>
import { mapActions } from 'vuex'
import PenalCodeService from '../services/PenalCodeService'
export default {
  data () {
    return {
      chapterIndex: ''
    }
  },
  methods: {
    ...mapActions({
      changeChapterAction: 'changeChapterAction'
    })
  },
  created () {
    this.chapterIndex = PenalCodeService.getPenalCodeChapters()
  }
}
</script>
<style>
  .penal-code-index {
    list-style: none;
  }
</style>
