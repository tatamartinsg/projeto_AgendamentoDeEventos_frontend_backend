const conexao = require('../infrastructure/conexao')
const repositorio = require('../repositories/cadastro')

class Cadastro{
    selecionaUsuarios(){
        return repositorio.selecionaUsuarios()
    }
    selecionaUsuariosPorId(id_usuario){
        return repositorio.selecionaUsuariosPorId(id_usuario)
    }
    insertCadastro(body){
        return repositorio.addCadastro(body)
            .then(results => {
                console.log(results)
                return{...body}
            })
    }
    deletaUsers(id){
        return repositorio.deletaUsers(id)
    }
}

module.exports = new Cadastro