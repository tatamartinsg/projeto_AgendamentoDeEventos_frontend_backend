<template>
<div>
    <header>
       
        <div class="" :class="{teste: isActive}">
            <div :class="{ collapse: isActive}" id="navbarToggleExternalContent">
                <nav class=" div-third navbar navbar-expand-md navbar-light" :class="{teste: isActive}">
                    <div class="collapse navbar-collapse">
                        <nav v-if="userIsLogged" class="navbar-nav mr-auto">
                            <div class="nav-item">
                                <router-link class=" nav-link home text-white navbar-brand" to="/">SignUp</router-link>
                            </div>
                            <div class="nav-item ">
                                <router-link class="nav-link text-white" to="/clientes">Event Area</router-link>                  
                            </div>
                        </nav>
                        <nav v-if="userIsLogged"  class="navbar-nav">
                            <div class="nav-item">
                            <a class="nav-link text-white" @click.prevent="logout()" href="/">LogOut</a>
                            </div>
                        </nav>
                        <nav v-else class=" ">
                            <div>
                                <router-link class="nav-link home text-white navbar-brand" to="/">SignUp</router-link>
                            </div>
                        </nav>
                    </div>
                    
                    <!-- <span class="text-white spannav">Toggleable via the navbar brand.</span> -->
                </nav>
            </div>
        
        <!-- <nav class="navbar navbar-dark bg-dark" id="navheaderblack">
            <button class="navbar-toggler" @click="clicou()" @dblclick="clicoudnv()" type="button" aria-label="Toggle navigation" style="margin-left: 1%;">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav> -->
    </div>
    </header>
</div>
</template>
<script>
    import { logOutMixin } from '@/mixins.js'
    import { mapGetters } from 'vuex'

    export default{
        mixins: [logOutMixin],
        props:{
            rotas:{
                type: Array,
                required: true
            }
        },
        data(){
            return{
                isActiveDropdown: false,
                isActiveDropdownCategorias: false,
                isActive: false
            }
        },
        methods:{  
            clicou(){
                this.isActive =! this.isActive
            },
            clicouDropdown(){
                this.isActiveDropdown =! this.isActiveDropdown
            },
            clicouDropdownCategorias(){
                this.isActiveDropdownCategorias =! this.isActiveDropdownCategorias
            }
        },
        computed:{
            ...mapGetters(['userIsLogged'])
        }
    }
</script>
<style>
    li a:hover, .dropdown:hover .dropbtn {
        background-color: none;
    }
    .navbar{
        justify-content: flex-start;
    }
    #navbarToggleExternalContent{
        transition: all .2s;
    }
    .dropdownClick{
        display: block;
    }
    .spannav{
        opacity: 0.6;
    }
    .div-header{
         transition: all .2s;
    }
   .teste{
       transform: scale(1.01);
   }
   .div-third{
       padding-left: 20px;
       background: rgb(59, 57, 57);
   }
   header{
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       z-index: 99;
   }
   .mudaCorBotao{
       background: rgb(160, 15, 15);
       border: 0;
   }
   .navbar-toggler{
       margin-top: 5px;
   }
   .navbar-brand{
       margin-right: 5px;
   }

   .logoutClass{
       text-align: right;
       color: white;
   }
   @media (min-width: 320px){
       .navbar-expand-md {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
    }
    .navbar-expand-md .navbar-collapse {
        display: -webkit-box!important;
        display: -ms-flexbox!important;
        display: flex!important;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
    }
    .navbar-expand-md .navbar-nav {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
    }
    
   }
   @media screen and (max-width:760px){
    .nav-item{
        font-size: 13px;
        padding: 8px;
    }
    .nav-item a{
        font-size: 16px;
    }
    .home{
        padding-top: 8px;
    }
    .div-third{
        height: 50px;
    }
   }
   @media screen and (max-width:670px){
       .div-third{
            height: 40px;
        }
   }
    

</style>
