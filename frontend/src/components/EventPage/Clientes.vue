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
export default{
    components:{
        'add-event': AddEvent,
        'my-events': MyEvents,
        'events-user': EventsUserConfirmed
    }
}
</script>
<style scoped>

</style>
