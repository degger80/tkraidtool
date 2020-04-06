import Vue from 'vue'

import VueRouter from 'vue-router'

import isMeteorUser from '/imports/api/helpers/isMeteorUser'
import isRL from '/imports/api/helpers/isRL'
import isAdmin from '/imports/api/helpers/isAdmin'

import Widget from '../imports/ui/pages/Widget.vue'
import AddEvent from '../imports/ui/pages/AddEvent.vue'
import Home from '../imports/ui/pages/Home.vue'
import Profile from '../imports/ui/pages/Profile.vue'
import Event from '../imports/ui/pages/Event.vue'


import AdminUsersPage from '../imports/ui/pages/admin/Users.vue'

Vue.use(VueRouter)
const routes = [

  { path: '/', name: 'home', component: Home },
  { path: '/upcoming-events', name: 'widget', component: Widget },
  { path: '/event/:id', name: 'event', component: Event },
  {
    path: '/profile', name: 'profile', component: Profile,

    beforeEnter: (to, from, next) => {
      isMeteorUser().then(response => {
        // if true, continue, else redirect to Login page
        response ? next() : next({ name: 'home' })
      })
    }
  },
  {
    path: '/add-event', name: 'add-event', component: AddEvent,

    beforeEnter: (to, from, next) => {
      isRL().then(response => {
        // if true, continue, else redirect to Login page
        response ? next() : next({ name: 'home' })
      })
    }
  },
  {
    path: '/admin/users', name: 'users', component: AdminUsersPage,
    beforeEnter: (to, from, next) => {
      isAdmin().then(response => {
        // if true, continue, else redirect to Login page
        response ? next() : next({ name: 'home' })
      })
    }
  },

  // { path: '/generate', name: 'generate', component: ProductionGenerator },

]

const router = new VueRouter({
  mode: 'history',

  routes,

})

export default router