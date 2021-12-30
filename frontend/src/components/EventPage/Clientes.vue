<template>
    <div>
        <add-event/>
        <my-events/>
    </div>
</template>
<script>
import AddEvent from './AddEvent/AddEvent.vue'
import MyEvents from './MyEvents/MyEvents.vue'
export default{
    components:{
        'add-event': AddEvent,
        'my-events': MyEvents
    }
}
</script>
<style scoped>

</style>
