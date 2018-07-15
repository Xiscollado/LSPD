import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import VueWait from 'vue-wait'

Vue.use(Vuex)
Vue.use(VueWait)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    error: null,
    client_secret: 'S8Q6uTJD9M1DdqrdNNWoxGGuIG1Z3nI6DaHWpreD',
    client_id: 3,
    grant_type: 'password',
    access_token: null,
    user: {},
    penalCode: {
      showChapter: null
    },
    crimes: [],
    fine: 0,
    months: 0,
    api: {
      url: 'http://localhost:8000/api',
      login: 'http://localhost:8000'
    }
  },
  mutations: {
    changeChapter(state, n) {
      state.penalCode.showChapter = n
    },
    addCrime(state, crime) {
      var crimeIndex = state.crimes.findIndex(x => x.id === crime.id)
      if (crimeIndex > -1) {
        state.crimes[crimeIndex].qty++
      } else {
        state.crimes.push({id: crime.id, title: crime.title, fine: crime.fine, months: crime.months, qty: 1})
      }
      state.fine += crime.fine
      state.months += crime.months
    },
    removeCrime(state, crime) {
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
    removeAllCrimes(state) {
      state.crimes = []
      state.fine = 0
      state.months = 0
    },
    updateErrorMessage(state, message) {
      state.error = message
    },
    updateAccessToken(state, token) {
      state.access_token = token
    },
    deleteAccessToken(state) {
      state.access_token = null
    }
  },
  actions: {
    changeChapterAction(state, n) {
      state.commit('changeChapter', n)
    },
    addCrimeAction(state, crime) {
      state.commit('addCrime', crime)
    },
    removeCrimeAction(state, id) {
      state.commit('removeCrime', id)
    },
    removeAllCrimesAction(state) {
      state.commit('removeAllCrimes')
    },
    updateErrorMessage(state, message) {
      state.commit('updateErrorMessage', message)
    },
    updateAccessToken(state, response) {
      state.commit('updateAccessToken', response.access_token)
    },
    deleteAccessToken(state){
      state.commit('deleteAccessToken')
    }
  },
  getters: {
    actualChapter(state) {
      return state.penalCode.showChapter
    },
    getCrimesCart(state) {
      return state.crimes
    },
    getFinesCount(state) {
      return state.fine
    },
    getMonthsCount(state) {
      return state.months
    },
    getErrorMessage(state) {
      return state.error
    },
    accessToken(state) {
      return state.access_token
    }
  }
})
