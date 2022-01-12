
export const routes = [
    {
      path: '/',
      name:'home',
      component: () => import('./src/components/SignUpPage/FirstPage.vue'),
      meta:{
        publica: true
      },
      props: true
    },
    {
      path:'/clientes',
      name: 'clientes',
      component: () => import('./src/components/EventPage/Clientes.vue'),
      props: true
    },
    {
      path: '/confirmation/:token',
      name: 'confirmation',
      component: () => import('./src/components/SignUpPage/Confirmacao.vue'),
      meta:{
            publica: true
      },
      props: true
    },
    {
      path: '/changepass',
      name: 'changepass',
      component: () => import('./src/components/ChangePass/ChangePass.vue'),
      meta:{
            publica: true
      },
      props: true
  },
    {
      path: '/confirmevent/:id',
      name: 'confirmevent',
      component: () => import('./src/components/EventPage/ConfirmEvent/ConfirmEvent.vue'),
      props: true
  },
    {
      path: '/show-participants/:secretKey',
      name: 'showParticipants',
      component: () => import('./src/components/EventPage/ShowEvents/ShowEvents.vue'),
      props: true
    }
]
