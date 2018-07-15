// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './lang'
import VueWait from 'vue-wait'

Vue.config.productionTip = false

// Check if user is logged in
router.beforeEach((to, from, next) => {
  if (!store.state.access_token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  i18n,
  wait: new VueWait({
    useVuex: true,
    vuexModuleName: 'wait'
  }),
  components: {App},
  template: '<App/>'
})
