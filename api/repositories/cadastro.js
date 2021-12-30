const query = require('../infrastructure/queries')

class Cadastro{
    selecionaUsuarios(){
        const sql = 'SELECT * FROM signUP_users;'
        return query(sql)
    }
    // selecionaUsuariosPorId(id_usuario){
    //     const sql = `SELECT * FROM signUP_users WHERE id = '${id_usuario}';`
    //     return query(sql,id_usuario)

    // }
    addCadastro(body){
        const sql = `INSERT INTO signUP_users SET ?;`
        return query(sql,body)
    }
}

module.exports = new Cadastro