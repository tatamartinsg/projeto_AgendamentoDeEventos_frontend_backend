<template>
    <div>
        <div :class="{loading:loading}"></div>
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
                    <button @click.prevent="$emit('understood')" type="button" :class="'btn '+ changeClassButton">{{confirma}}</button>
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
            loading: false,
            changeClassButton: "btn-primary"
        }
    },
    mounted(){
        if(this.sendEmail == false){
            return this.changeClassButton = "btn-success"
        }
    },
    methods:{
        async sendEmailAgain(){
            this.loadingConfirmation()
            await this.$http.get(`/sendEmail/${this.token}/${this.email}`)
                .then( res => {
                    console.log(res)
                    this.$toastr('success',res.data.message,'Email Sent')
                    this.sendEmail = false
                })
                .catch( err => {
                    console.log(err)
                    this.$toastr('error',err.response.data.message,'Error')
                })
        },
        loadingConfirmation(){
            this.loading = true
            setTimeout(() => {
                this.loading = false
            },2000) 
        },
    }
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
</style>
