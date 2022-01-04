<template>
    <div align="center">
        <modal-bts-confirm :sendEmail="false" :title="title" :message="message" :confirma="confirma" v-on:understood="clickhere"> </modal-bts-confirm>
    </div>
    
    
</template>
<script>
import Modal from '../Modal/Modal.vue'
export default{
    components:{
        'modal-bts-confirm': Modal
    },
    data(){
        return{
            token:"",
            message:'Please confirm your email pressing the button bellow:',
            confirma: 'Confirm Email',
            title:'Confirm your email account'
        }
    },
    
    mounted(){
        this.token = this.$route.params.token
    },
    methods:{
        clickhere(){
            this.$http.get(`http://localhost:3000/confirmation/${this.token}`)
            .then(response => {
                console.log(response)
                if(response.data.message == 'email confirmed'){
                    this.$toastr('success','Your email has been confirmed','Successfull')
                    setTimeout( () => {
                        window.location.href = "http://localhost:8080/"
                    },2000)
                }
            })
            .catch( error => {
                console.log(error,error.response.data.message)
                if(error){
                    this.$toastr('error','Token Invalid','Error')
                }
            })
        }
    }
}
</script>
<style scoped>
.confirm{
    color: rgb(0, 0, 0);
}
</style>