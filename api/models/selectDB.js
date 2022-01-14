const repositorio = require('../repositories/select')

class selectBD{
    verifyEmailDataBase(body){
        return repositorio.verifyEmailDataBase(body)
    }
}

module.exports = new selectBD