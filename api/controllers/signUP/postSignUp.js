const Select = require('../../models/selectDB')
const { EncryptPassword } = require('../encryptPassword/encryptPassword')
const bcryptCompare = require('../bcryptCompare/bcryptCompare')
const ValidPassword = require('../../validations/validPassword/ValidPassword')
const ValidEmail = require('../../validations/validEmail/validEmail')
const { ValidName } = require('../../validations/ValidName/ValidName')
const EncryptID = require('../encryptID/EncryptID')
const Cadastro = require('../../repositories/cadastro')

module.exports = async function postSignUp(req,res,body) {
    if (ValidName(body.name) == 0) {
        return res.status(400).json({message:"Name invalid"})
    }
    if (ValidEmail(body.email) == 0) {
        return res.status(400).json({message:"Email invalid"})
    }
    if (ValidPassword(body.password) == 0) {
        return res.status(400).json({message:"Your password needs at least 1 uppercase, 1 number, 1 lowercase and 5 caracters", pass: false})
    }

    const resultados = await Select.verifyEmailDataBase(body)
    if (resultados.length > 0) {
        console.log("Já existe esse email cadastrado!")
        return res.status(400).json({message: 'Email existente!'})
    }
    EncryptPassword(body)

    const resultados2 = await Select.verifyEmailDataBase(body)
    const idEncryptado = EncryptID(resultados2[0].id)
    
    Cadastro.addIDEncrypt(idEncryptado, resultados2[0].id)
        .then(ok => {   
            bcryptCompare(res, body, resultados2, false) //change to false to not send the email
        })
        .catch(err => {
            console.log(err)
        })

}