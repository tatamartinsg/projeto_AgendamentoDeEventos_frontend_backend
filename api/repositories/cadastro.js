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
    deletaUsers(id){
        const sql = `DELETE FROM signUP_users WHERE id = '${id}';`
        return query(sql)
    }
    updateCadastroConfirmed(id){
        const sql = `UPDATE signUP_users SET confirmed = 'true' WHERE id = '${id}'`
        return query(sql)
    }
}

module.exports = new Cadastro