
export const routes = [
      {
        path: '/',
        name:'home',
        component: () => import('./src/components/SignUpPage/FirstPage.vue'),
        meta:{
          publica: true
        }
      },
      {
        path:'/clientes',
        name: 'clientes',
        component: () => import('./src/components/EventPage/Clientes.vue')
  },
  {
    path: '/confirmation/:token',
    name: 'confirmation',
    component: () => import('./src/components/SignUpPage/Confirmacao.vue'),
    meta:{
          publica: true
    }
  }
]
