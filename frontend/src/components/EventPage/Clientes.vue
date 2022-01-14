<template>
    <div>
        <add-event/>
        <my-events/>
        <events-user/>
    </div>
</template>
<script>
import AddEvent from './AddEvent/AddEvent.vue'
import MyEvents from './MyEvents/MyEvents.vue'
import EventsUserConfirmed from './EventsUserConfirmed/EventsUserConfirmed.vue'
import provedor from '../../store/index'
export default{
    components:{
        'add-event': AddEvent,
        'my-events': MyEvents,
        'events-user': EventsUserConfirmed
    },
    created(){
        if(provedor.state.token == null){
            this.$router.push('../')
        }
    }
}
</script>
<style scoped>

</style>
