<template>
    <div>
        <!-- <h2>Entrou</h2> -->
        <section id="showEvents">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{infoEvents[0].nameEvent}}</h5>
                    <p class="card-text">Descrição do Evento: {{infoEvents[0].description}}</p>
                    <p>Data do Evento: {{infoEvents[0].dateEvent}}</p>
                </div>
                <!-- <h3>Email confirmados:</h3> -->
                <table >
                    <tr >
                        <th class="th-name" >Name</th>
                        <th class="th-email">Email</th>
                    </tr>
                    <tr class="tr-name-email" v-for="event in events" :key="event">
                        <td>{{event.namePerson}}</td>
                        <td>{{event.emailConfirmed}}</td>
                    </tr>
                </table>
                <!-- <ul v-for="event in events" :key="event" class="list-group list-group-flush">
                    <li class="list-group-item">Nome:  || Email: </li>
                    
                </ul> -->
                <!-- <div class="card-body">
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div> -->
            </div>
        </section>
    </div>
</template>
<script>
export default{
    data(){
        return{
            events: [],
            infoEvents: [],
            params: ''
        }
    },
    created(){
        console.log(this.$route.params.secretKey)
        this.params = this.$route.params.secretKey
        this.$http.get(`/show-participants/${this.params}`)
            .then( response => {
                console.log(response)
                this.events = response.data.response
                this.$http.get(`/confirmevent/${this.$route.params.id}`)
                    .then(response2 => {
                        this.infoEvents = response2.data
                        console.log('', this.infoEvents[0])
                    
                    })
                    .catch( error => {
                        console.log(error)
                    })
            })
            .catch( err => {
                console.log(err)
            })
     }
}
</script>
<style scoped>
/* #showEvents{
    margin: 0 10%;
    width: 100%;
} */
div.card{
    margin: 0 auto;
    width: 100%;
}
.th-name, .th-email{
    width: 50%;
    font-size: 22px;
    text-transform: uppercase;
    border: 1px solid rgb(201, 197, 197);
    padding: 8px;
}
table{
      margin: 10px;
}
.tr-name-email td{
    padding: 10px;
    border: 1px solid rgb(201, 197, 197);
}
.card-title{
    font-size: 32px;
}
</style>