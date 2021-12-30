<template>
  <div>
    <div id="app">
      <my-header></my-header>
      <!-- <transition name="page">
         <router-view></router-view>
      </transition> -->
    </div>
  </div>
</template>

<script>
import './styles/global.css';
import './styles/index.css'
import Header from './utils/Header.vue'
import { routes } from '../routes.js'

export default {
  name: 'App',
  components:{
    'my-header':Header
  },
  data(){
    return{
      routes
    }
  },

}
</script>

<style>

</style>
