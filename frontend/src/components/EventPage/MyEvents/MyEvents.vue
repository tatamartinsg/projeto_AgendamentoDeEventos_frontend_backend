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
                    <ul>
                        <li></li>
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
                isActiveshowEvents: true
            }
        },
        methods:{
            showEvents(){
                this.isActiveshowEvents =! this.isActiveshowEvents
                this.$http.get(`/allEvents/${provedor.state._idUser}`)
                    .then(response => {
                        console.log(response)
                    })
                    .catch( error => {
                        console.log(error)
                    })
            }
        }
    }
</script>
<style scoped>
.myevents{
    margin: 40px;
    border: 2px solid black;
    background-color: #d3f090;
    width: 95%;
}
.div-myEvents{
    display: flex;
    padding: 10px;
    margin: 40px;
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


</style>