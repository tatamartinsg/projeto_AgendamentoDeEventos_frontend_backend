<template>
    <div>
        <!-- <h1>Entrou Change Pass</h1> -->
        <!-- <my-modal2 :title="'Change your password'" :message="'oi'" /> -->
        <section class="changePass">
            <div class="form-group">
                <h1>Change your password</h1>
                <small>THE FUNCTION IS NOT WORKING YET</small>
                <!-- <label for="exampleInputEmail1">Email address</label> -->
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                <button class="btn btn-primary sendEmail">Send Email</button>
            </div>
        </section>
   
    </div>
</template>
<script>

export default{
    // components:{
    //     'my-modal2': Modal2
    // }
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
}
.form-group h1{
    color: rgb(0, 0, 0);
    font-size: 22px;
    padding: 15px;
}
.sendEmail{
    width: 50%;
}
</style>