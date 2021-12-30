export const logOutMixin = {
    methods: {
        logout(){
            if(confirm('Do you really want to LogOut?') == true){
                this.$store.commit('LOGOUT_USER')
                this.$router.push({name: 'home'})
            }
        }
    }
}