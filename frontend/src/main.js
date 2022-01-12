import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from '../routes.js'
import http from '../src/http/index'
import provedor from './store/index.js'
import VueToastr from '@deveodk/vue-toastr'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// If you would like custom styling of the toastr the css file can be replaced
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
Vue.use(VueToastr, {
    defaultPosition: 'toast-top-right',
    defaultType: 'info',
    defaultTimeout: 2000
})

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((routerTo, routerFrom, next) => {
  if (!routerTo.meta.publica && !provedor.state.token) {
    alert('Please, log in first!')
    return next({path: '/'})
  }
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store: provedor,
  render: h => h(App),
}).$mount('#app')
