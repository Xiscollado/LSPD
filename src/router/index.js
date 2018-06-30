import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomeComponent'
import PenalCode from '@/components/PenalCodeComponent'
import FileDetail from '@/components/FileDetailComponent'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/penal-code',
      name: 'PenalCode',
      component: PenalCode
    },
    {
      path: '/files/:id',
      name: 'files',
      component: FileDetail
    }
  ]
})
