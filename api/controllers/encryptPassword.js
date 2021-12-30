const Cadastro = require('../models/cadastroBD')
const bcrypt = require('bcrypt')

function EncryptPassword(body){
    var salt = bcrypt.genSaltSync(10)
    var senhaParaSalvar = bcrypt.hashSync(body.password, salt)

    const body_with_hash = {
        name: body.name,
        email: body.email,
        password: senhaParaSalvar
    }
    return Cadastro.insertCadastro(body_with_hash)
}

module.exports = { EncryptPassword }