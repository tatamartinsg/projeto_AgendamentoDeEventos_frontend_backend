<template>
    
    <div>
        <div :class="{loading: loading}"> </div>
        <section id="principal">
            <div class="div-confirm">
                <h1 class="title-principal">Confirm Event</h1>
                <button @click.prevent="confirmParticipation()" class="btn btn-success btn-confirm">Confirm participation on this event!</button>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Nome do Evento: <em><strong class="event-title"> {{response.data[0].nameEvent}}</strong></em></li>
                <li class="list-group-item">Data do Evento: <strong>{{response.data[0].dateEvent}}</strong></li>
                <li class="list-group-item">Descrição: {{response.data[0].description}}</li>
            </ul>
            
            
        </section>
    </div>
</template>
<script>
// import router from '../../../../routes'
import provedor from '../../../store/index'
    export default{
        data(){
            return{
                params:'',
                response: [],
                loading: false
            }
        },
        created(){
            this.params = this.$route.params.id
            //procurar o evento no banco de dados
            this.$http.get(`http://localhost:3000/confirmevent/${this.params}`)
            .then(response => {
                console.log(response)
                this.response = response
            })
            .catch( error => {
                console.log(error)
            })
        },
        methods:{
            confirmParticipation(){
                alert(provedor.state._idUser)
                this.$http.get(`http://localhost:3000/all-cadastros/${provedor.state._idUser}`)
                .then(response => {
                    console.log(this.response.data[0])
                    const body = {
                        nameEvent: this.response.data[0].nameEvent,
                        eventID: this.response.data[0].id_schedule,
                        dateEvent: this.response.data[0].dateEvent,
                        description: this.response.data[0].description,
                        emailConfirmed: response.data[0].email,
                        namePerson: response.data[0].name,
                        eventIDEncrypt: this.response.data[0].idEncrypt
                    }
                    this.$http.post('/postEventConfirmed', body)
                           .then(res => {
                               if(res.data.confirmed == true){
                                   this.$toastr('success', 'Your participation on this event was confirmed!')
                                   this.loadingConfirmation()
                                   setTimeout(() => {
                                       this.$router.push('../clientes')
                                   },2000)
                                   
                               }
                            console.log(res)
                        })
                        .catch( err => {
                            console.log(err)
                        })
                })
                .catch( error => {
                    console.log(error)
                })
            },
            loadingConfirmation(){
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                },2000) 
            },
        },
        
    }
</script>
<style scoped>
.loading{
    animation: is-rotating 1s infinite;
    border: 6px solid #c2b7b7;
    border-radius: 50%;
    border-top-color: #1f856f;
    height: 50px;
    width: 50px;
    margin: 0 auto;
}
@keyframes is-rotating {
    to {
        transform: rotate(1turn);
    }
}
#principal{
    border: solid 1px rgb(168, 162, 162);
    margin: 0 auto;
    width: 60%;
}

.title-principal{
    padding: 12px;
    font-size: 28px;
    text-transform: uppercase;
    color: black;
}
.event-title{
    font-size: 18px;
}
.div-confirm{
    display: flex;
    justify-content: space-between;
}
.btn-confirm{
    margin-right: 10px;
}
</style>