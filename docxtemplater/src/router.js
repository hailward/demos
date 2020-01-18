import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Day from './views/Day.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/day',
      name: 'day',
      component: Day
    }
  ]
})
