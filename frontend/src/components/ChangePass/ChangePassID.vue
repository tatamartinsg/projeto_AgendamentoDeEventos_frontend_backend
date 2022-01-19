<template>
    <div>
        <!-- <h1>Entrou Change Pass</h1> -->
        <!-- <my-modal2 :title="'Change your password'" :message="'oi'" /> -->
        <section class="changePass">
            <div class="form-group">
                <h1>Change your password</h1>
                <!-- <small>THE FUNCTION IS NOT WORKING YET</small> -->
                <!-- <label for="exampleInputEmail1">Email address</label> -->
                <div class="form-group row">
                    <label for="exampleInputPasswordUP"><i class="far fas fa-lock icon-modify"></i></label>
                    <div class="col-sm-10">
                        <input v-model="newpassword1" name="password" placeholder="new password" type="password" class="form-control" id="exampleInputPasswordUP">
                    </div>       
                </div>
                <div class="form-group row">
                    <label for="exampleInputPasswordUP"><i class="far fas fa-lock icon-modify"></i></label>
                    <div class="col-sm-10">
                        <input v-model="newpassword2" name="password" placeholder="new password" type="password" class="form-control" id="exampleInputPasswordUP">
                    </div>    
                </div>
                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                <button @click.prevent="submitNewPass()" class="btn btn-primary sendEmail">Send Email</button>
            </div>
        </section>
   
    </div>
</template>
<script>
export default{
    data(){
        return{
            newpassword1:"",
            newpassword2:"",
            params: ""
        }
    },
    created(){
        this.params = this.$route.params.id
        console.log(this.params)
    },
    methods:{
        submitNewPass(){
            if(this.newpassword1 == '' || this.newpassword2 == ''){
                return this.$toastr('warning','An input is empty','Empty')
            }
            if(this.newpassword1 != this.newpassword2){
               return this.$toastr('warning','These passwords do not match with each outher','Pass is wrong')
            }
            const pass = {
            newpassword1: this.newpassword1,
            newpassword2: this.newpassword2
            }
            this.$http.post(`/change-password/${this.params}`, pass)
                .then(response => {
                    return console.log('results',response) 
                })
                .catch(err => {
                    return console.log(err)
                })

        }
    }
}
</script>

<style scoped>
body{
    margin: 0;
    padding: 0;
}
.changePass{
    width: 50%;
    margin: 0 auto;
    text-align: center;
    border: 1px solid black;
    background: white;
}
#exampleInputEmail1{
    margin: 0 auto;
    width: 50%;
    margin-bottom: 10px;
}
.form-group h1{
    color: rgb(0, 0, 0);
    font-size: 22px;
    padding: 15px;
}
.sendEmail{
    width: 50%;
}
.row{
    padding-left: 10%;
    margin: 0;
    margin-bottom: 10px;
}
.row label{
    margin: 0;
}
#exampleInputPasswordUP{
    margin: 0;
}
</style>