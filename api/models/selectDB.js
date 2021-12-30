const repositorio = require('../repositories/select')

class selectBD{
    selecionaEmail(body){
        return repositorio.selectEmail(body)
    }
}

module.exports = new selectBD