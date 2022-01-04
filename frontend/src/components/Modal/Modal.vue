<template>
    <div>
        <!-- Modal -->
        <div class="" id="exampleModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{message}}
                </div>
                <div class="modal-footer">
                    <button @click.prevent="$emit('understood')" type="button" class="btn btn-primary">{{confirma}}</button>
                    <button v-if="sendEmail" @click.prevent="sendEmailAgain()" class="btn btn-dark">Send email again</button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script >
export default{
    props:['message', 'confirma', 'title','sendEmail','email','token'],
    data(){
        return{
            
        }
    },
    methods:{
        sendEmailAgain(){
            this.$http.get(`/sendEmail/${this.token}/${this.email}`)
                .then( res => {
                    this.$toastr('success',res.data.message,'Email Sent')
                    this.sendEmail = false
                })
                .catch( err => {
                    console.log(err)
                })
        }
    }
}
</script>
<style scoped>

</style>
