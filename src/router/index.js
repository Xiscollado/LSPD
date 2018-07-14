import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomeComponent'
import PenalCode from '@/components/PenalCodeComponent'
import FileDetail from '@/components/FileDetailComponent'
import CopyCrimes from '@/components/CopyCrimesComponent'
import LoginComponent from '@/components/LoginComponent'
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
    },
    {
      path: '/copy',
      name: 'copy',
      component: CopyCrimes
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    }
  ]
})
