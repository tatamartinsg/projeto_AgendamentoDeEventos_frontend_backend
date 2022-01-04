const repositorio = require('../repositories/select')

class selectBD{
    selecionaEmail(body){
        return repositorio.selectEmail(body)
    }
    // seeIfItsConfirmed(email){
    //     return repositorio.seeIfItsConfirmed(email)
    // }
}

module.exports = new selectBD