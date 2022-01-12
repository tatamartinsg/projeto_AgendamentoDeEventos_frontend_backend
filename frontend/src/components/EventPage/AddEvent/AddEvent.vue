<template>
    <div>
        <div id="mySchedule">
            <div class="div-mySchedule">
                <h1 class="schedule-title">My Schedule</h1>
                <div class="div-addevent">
                    <button @click="addEvent()" class="btn btn-dark">Add Event</button>
                </div>
            </div>
            <!-- <div align="center" :class="{confirm: confirm}">
                <h2>Confirme sua senha antes de enviar</h2>
                <input class="form-control w-50" type="password" v-model="passwordConfirm" />
                <button @click.prevent="clicou()" class="btn btn-warning">Confirma Senha</button>
            </div> -->
            <section id="addEvent" :class="{ isActiveAddEvent: isActiveAddEvent, transitionEvent: transitionEvent}">
                <h2 class="myevent-title">Add Event</h2>
                <hr>
                <div class="div">
                    <form class="formEvent">
                        <div class="name-date">
                            <div class="form-group row">
                                <label class="label-input"  for=""> <i class="icon far fa-user icon-modify"></i></label>
                                <div class="input-name col-sm-8">
                                    <input v-model="name" id="inputnameUP" name="name" class="form-control" type="text" placeholder="Event's name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="label-input"  for=""> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-date-fill" viewBox="0 0 16 16">
                                        <path d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"/>
                                    </svg>
                                </label>
                                <div class="input-name col-sm-8">
                                    <input v-model="date" id="inputnameUP" name="date" class="form-control" type="date" placeholder="name">
                                </div>
                            </div>
                        </div>
                        <div class="description-textarea">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text ">Description</span>
                                </div>
                                <textarea v-model="description" class="form-control col-sm-8" aria-label="Descrition"></textarea>
                            </div>
                            <div class="form-check">
                                <input v-model="check" type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Invite other users to the event</label>
                            </div>
                        </div>
                        <div>
                            <button v-on:click.prevent="submitEvent()" class="addEventSubmit btn btn-success">Submit Event</button>
                        </div>
                        
                    </form>
                </div>

            </section>
        </div>
    </div>
    
    
</template>
// <script>
//     import axios from 'axios'
import provedor from '../../../store/index.js'
import { EventGetDate } from '../../../js/EventGetDate.js'
import { logOutMixin } from '@/mixins.js'
    export default{
        name: 'Clientes',
        mixins: [logOutMixin],
        data(){
            return{
                isActiveAddEvent: true,
                transitionEvent: false,
                confirm: true,
                name:'',
                date:'',
                description:'',
                check:'',
                passwordConfirm: ''
            }
        },
        mounted(){
            this.$http.get('clientes')
                .then(response => {
                    console.log('Entrou', response)
                    if(response.data.message == 'token invalid'){
                        alert("Token invalido")
                    }
                })
                .catch(error => {
                    console.log(error.response.data)
                    if(error.response.data.message == 'token invalid'){
                        alert('your token is not usefull anymore, please do a log in again')
                        this.$store.commit('LOGOUT_USER')
                    }
                })
            console.log(provedor.state._idUser)
            console.log(EventGetDate)
        },  
        methods:{
            addEvent(){
                this.isActiveAddEvent =! this.isActiveAddEvent
                this.transitionEvent =! this.transitionEvent
            },
            formParams(){
                if(this.check == ''){
                    this.check = false
                }
                const objeto = {
                    nameEvent: this.name,
                    dateEvent: this.date,
                    dateCreated: EventGetDate(),
                    description: this.description,
                    checkbox: this.check,
                    emailID: provedor.state._idUser,
                }
                return objeto
            },
            // clicou(){
            //      if(this.passwordConfirm){
            //         // var senha = prompt("Confirme sua senha, por favor")
            //         // console.log(senha)
            //         // let formEvent = '.formEvent'
            //         console.log(this.passwordConfirm) //PELO AMOR DE DEUS DPOS DA UM JEITO DE VERIFICAR SE ISSO TA CERTO
            //         this.$http.post('/addEvent', this.formParams(this.passwordConfirm))
            //         .then((response) =>{
            //             console.log(response.data.check)
            //             if(response.data.check == true){
            //                 this.sendEmailAoBackEnd(response.data)
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error)
            //         })
            //         setTimeout(() => {
            //             this.confirm = true
            //         },1000 )
                    
            //     }
            // },
            submitEvent(){
                this.confirm =! this.confirm
                
                this.$http.post('/addEvent', this.formParams())
                    .then((response) =>{
                        this.$toastr('success','Event was added with successful','Event Added')
                        console.log(response)
                        document.querySelector('.formEvent').reset();
                       

                        // if(response.data.check == true){
                        //     this.sendEmailAoBackEnd(response.data)
                        // }
                    })
                    .catch((error) => {
                        console.log(error.response)
                        if(error.response.data.status == 'empty'){
                            this.$toastr('warning',error.response.data.message,'Invalid Event')
                        }
                    })
                    setTimeout(() => {
                        this.confirm = true
                    },1000 )
            },
            // clearForm(){
            //     this.name = ''
            //     this.description = ''
            //     this.check = ''
            // }
            // sendEmailAoBackEnd(){
            //     this.$http.po
            // }
        }
    
    }
</script>
<style scoped>
button{
    margin: 0;
}
.formEvent{
    display: flex;
}
.isActiveAddEvent{
    display: none;
}
.transitionEvent{
    transition: 2s all;
}
.div-mySchedule{
    display: flex;
    margin: 40px;
    margin-bottom: 20px;
}
.schedule-title,.myevent-title{
    color: rgb(0, 0, 0);
}
.myevent-title{
    margin: 30px 0px 40px 40px;
}
.div-addevent{
    justify-content: right;
    margin: 0 auto;
}
.div-addevent button{
    width: 200px;
    margin-left: 100%;
}
/* .myevent-title{
    font-weight: bold;
} */
#addEvent{
    border: 2px solid rgb(41, 40, 40);
    box-shadow: 3px 4px 10px rgb(179, 179, 179);
    border-radius: 10px;
    padding: 10px;
    margin: 40px;
    background-color: #ffffff;
    width: 95%;
    color: rgb(10, 10, 10);
    font-weight: bold;
}

.input-name{
    padding: 0;
}
.icon{
    display: contents;
}
.label-input{
    margin-left: 20px;
 }
 .name-date{
    width: 50%;
 }
 .description-textarea{
    width: 40%;
 }
 /* checkbox */
 .form-check-input{
    margin: 0;
    position: relative;
 }
 .form-check{
    margin-top: 15px;
    padding: 0;
 }
 .addEventSubmit {
     margin-right: 20px;
 }
 .confirm{
     display: none;
 }
</style>