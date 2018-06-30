import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    penalCode: {
      showChapter: null
    },
    crimes: [],
    fine: 0,
    months: 0
  },
  mutations: {
    changeChapter (state, n) {
      state.penalCode.showChapter = n
    },
    addCrime (state, crime) {
      var crimeIndex = state.crimes.findIndex(x => x.id === crime.id)
      if (crimeIndex > -1) {
        state.crimes[crimeIndex].qty++
      } else {
        state.crimes.push({id: crime.id, title: crime.title, fine: crime.fine, months: crime.months, qty: 1})
      }
      state.fine += crime.fine
      state.months += crime.months
    },
    removeCrime (state, crime) {
      var crimeIndex = state.crimes.findIndex(x => x.id === crime.id)
      if (crimeIndex > -1) {
        if (state.crimes[crimeIndex].qty > 1) {
          state.crimes[crimeIndex].qty--
        } else {
          state.crimes.splice(crimeIndex, 1)
        }
        state.fine -= crime.fine
        state.months -= crime.months
      }
    },
    removeAllCrimes (state) {
      state.crimes = []
      state.fine = 0
      state.months = 0
    }
  },
  actions: {
    changeChapterAction (state, n) {
      state.commit('changeChapter', n)
    },
    addCrimeAction (state, crime) {
      state.commit('addCrime', crime)
    },
    removeCrimeAction (state, id) {
      state.commit('removeCrime', id)
    },
    removeAllCrimesAction (state) {
      state.commit('removeAllCrimes')
    }
  },
  getters: {
    actualChapter (state) {
      return state.penalCode.showChapter
    },
    getCrimesCart (state) {
      return state.crimes
    },
    getFinesCount (state) {
      return state.fine
    },
    getMonthsCount (state) {
      return state.months
    }
  }
})
