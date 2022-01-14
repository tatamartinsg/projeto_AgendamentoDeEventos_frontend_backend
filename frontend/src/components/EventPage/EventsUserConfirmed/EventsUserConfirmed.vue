<template>
    <div>
        <div class="myevents">
            <div class="div-myEvents">
                <h2 class="event-title">Events you're confirmed</h2>
                <div class="div-showEvents">
                    <button @click="showEvents()" class="showEvents btn btn-success">Show Events</button>
                </div>
            </div>
            <div>
                <div :class="{isActiveshowEvents: isActiveshowEvents}">
                    <ul v>
                        <li v-for="(events,index) in allEventsConfirmed" :key="events">
                            <div class="card " id="cardConfirmed" >
                                <div class="card-body" >
                                    <h5 class="card-title">{{events.nameEvent}}</h5>
                                    <div :class="'card'+index">
                                        <p class="card-text">Description: {{events.description}}</p>
                                        <!-- <p>Data do Evento: {{events.dateEvent.split('-')[2]+'/'+events.dateEvent.split('-')[1]+'/'+events.dateEvent.split('-')[0]}} </p> -->
                                        <p>Data do Evento: {{dataArrumada(events.dateEvent)[2] + '/' + dataArrumada(events.dateEvent)[1] + '/'+ dataArrumada(events.dateEvent)[0]}}</p>
                                        <!-- <p v-if="events.checkbox == 'false' || events.checkbox == ''">NÃO notificamos este evento para outros usuários</p> -->
                                        <!-- <p v-else>Notificamos este evento para outros usuários</p> -->
                                    </div>
                                   
                                    
                                    <button @click.prevent="cancelParticipation(index,events.eventID)" class="btn btn-danger btnremove">
                                        Cancel Participation
                                    </button>
                                    <button @dblclick.prevent=" clicoudnv(index)" @click.prevent="clicou(index)" href="#" :class="'button'+index" class="btn btn-dark">{{title_button}}</button>
                                    <!-- <button @click.prevent="show(index)" class="btn btn-primary">Show Participants</button> -->
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
                allEventsConfirmed: [],
                dates: [],
                clickOnce: false,
                hide: false,
                buttonWasClicked: false,
                title_button: "Hide Event",

            }
        },
        methods:{
            show(index){
                this.$router.push(`/showParticipants/${this.allEvents[index].id_schedule}`)
            },
            showEvents(){
                this.isActiveshowEvents =! this.isActiveshowEvents
                this.$http.get(`/all-cadastros/${provedor.state._idUser}`)
                    .then(response => {
                        let email_user = response.data[0].email
                        this.$http.get(`/emailconfirmed/${email_user}`)
                            .then(response => {
                                this.allEventsConfirmed = response.data.response
                                if(response.data.response.length == 0){
                                    return this.$toastr('warning', 'There is no events that you confirmed yet', 'Events confirmed are empty' )
                                }
                                
                            })
                            .catch(error => {
                                if(error.response.data.message == 'empty'){
                                    this.$toastr('warning', 'There is no events that you confirmed yet', 'Events confirmed are empty' )
                                }
                            })
        
                    })
                    .catch( () => {
                        this.$toastr('error', 'You are not logged in', 'Error')
                    })
                        
            },
            cancelParticipation(index){
                if(confirm("Do you want to desconfirm your participation on this event?") == true){
                    let email_user_participation = this.allEventsConfirmed[0].emailConfirmed
                    let id_event = this.allEventsConfirmed[0].eventID
                    this.$http.delete(`/delete-participation-event/${email_user_participation}/${id_event}`)
                        .then(() => {
                            this.allEventsConfirmed.splice(index, 1)
                        })
                        .catch(errDelete => {
                            console.log(errDelete.response)
                        })
                }
                
            },
            clicou(index){
                var aux = -1
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

li{
    list-style: none;
}
.btnremove{
    font-size: 14px;
}
</style>