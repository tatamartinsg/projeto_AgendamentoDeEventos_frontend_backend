<template>
    <div>
        <div class="myevents">
            <div class="div-myEvents">
                <h2 class="event-title">My Events</h2>
                <div class="div-showEvents">
                    <button @click="showEvents()" class="showEvents btn btn-success">Show Events</button>
                </div>
            </div>
            <div>
                <div :class="{isActiveshowEvents: isActiveshowEvents}">
                    <ul v>
                        <li v-for="(events,index) in allEvents" :key="events">
                            <div class="card " >
                                <div class="card-body" >
                                    <h5 class="card-title">{{events.nameEvent}}</h5>
                                    <div :class="'card'+index">
                                        <p class="card-text">Description: {{events.description}}</p>
                                        <!-- <p>Data do Evento: {{events.dateEvent.split('-')[2]+'/'+events.dateEvent.split('-')[1]+'/'+events.dateEvent.split('-')[0]}} </p> -->
                                        <p>Data do Evento: {{dataArrumada(events.dateEvent)[2] + '/' + dataArrumada(events.dateEvent)[1] + '/'+ dataArrumada(events.dateEvent)[0]}}</p>
                                        <p v-if="events.checkbox == 'false' || events.checkbox == ''">NÃO notificamos este evento para outros usuários</p>
                                        <p v-else>Notificamos este evento para outros usuários</p>
                                    </div>
                                   
                                    
                                    <button @click.prevent="removeEvent(index,events.id_schedule)" class="btn btn-danger btnremove">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 15 15">
                                           
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                    <button @dblclick.prevent=" clicoudnv(index)" @click.prevent="clicou(index)" href="#" :class="'button'+index" class="btn btn-dark">{{title_button}}</button>
                                </div>
                                 
                            </div>
                           
                        </li>
                    </ul>
                </div>

                
      
            </div>
        </div>
    </div>
</template>
<script>
    import provedor from '../../../store/index'
    export default{
        data(){
            return{
                isActiveshowEvents: true,
                allEvents: [],
                dates: [],
                clickOnce: false,
                hide: false,
                buttonWasClicked: false,
                title_button: "Hide Event"
            }
        },
        methods:{
            showEvents(){

                if(this.clickOnce === false){
                    this.isActiveshowEvents =! this.isActiveshowEvents
                    this.$http.get(`/allEvents/${provedor.state._idUser}`)
                        .then(response => {
                            this.allEvents = response.data
                            if(response.data.length == 0 ){
                                return this.$toastr('warning', 'There is no events to be shown', 'Events are empty')
                            }
                        
                        })
                        .catch( error => {
                            console.log(error)
                        })
                }
                // this.clickOnce = true
                   
               
            },
            removeEvent(index, id_schedule){
                if(confirm("Do you want to delete this event?") == true){
                    this.allEvents.splice(index, 1)
                    this.$http.delete(`/eventDelete/${id_schedule}`)
                        .then(response => {
                            console.log(response)
                        })
                        .catch( error => {
                            console.log(error)
                        })
                    console.log(id_schedule) // id pra buscar e deletar no banco de dados
                    //manda um post delete
                }
                
            },
            clicou(index){
                var aux = -1
                console.log(index)
                var pegaEvento = document.querySelector(`.card${index}`)
                pegaEvento.classList.toggle('hide')

                var pegaButton = document.querySelector(`.button${index}`)
                if(pegaButton.innerHTML == 'Show Event'){
                    aux = 1
                }
                else{
                    aux = 0
                }
                if( aux == 1){
                    pegaButton.innerHTML = 'Hide Event'
                }
                else{
                    pegaButton.innerHTML = 'Show Event'
                }
                
            },
            dataArrumada(evento){
                return evento.split('-')
            }
        },
      
    }
</script>
<style scoped>
.myevents{
    margin: 40px;
    border: 2px solid rgb(41, 40, 40);
    box-shadow: 3px 4px 10px rgb(179, 179, 179);
    border-radius: 10px;
    background-color: #ffffff;
    width: 95%;
    height: 100%;
}
.div-myEvents{
    display: flex;
    padding: 10px;
    margin: 40px;
    margin-left: 50px;
    width: auto;
}
.event-title{
    color: rgb(0, 0, 0);
}
.div-showEvents{
    justify-content: right;
    margin: 0 auto;
    width: auto;
}
.div-showEvents button{
    /* width: 200px; */
    margin-left: 120%;
    margin-top: 0;
}

.isActiveshowEvents{
    display: none;
}
.hide{
    display: none;
}
.card-body{
    margin-left: 15px;
}
.card-body button{
   margin: 5px;
}
div.card{
    width: 100%;
}
li{
    list-style: none;
}
.btnremove{
    font-size: 14px;
}
</style>