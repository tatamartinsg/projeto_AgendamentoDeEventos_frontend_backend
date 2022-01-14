const generateToken = require('../../config/generateToken')
const bcrypt = require('bcrypt')
const sendEmailConfirm = require('../signUP/sendEmailConfirm')

module.exports = function compareBcrypt(res, body, resultados, boolean) {
    bcrypt.compare(body.password, resultados[0].password,(error,result)=> {
        if(error){
            return res.status(401).send({message: 'Falha na autenticação'})
        }
        if (result) {     
            let token = generateToken(resultados[0])
            const url = `http://localhost:8080/confirmation/${token}`
            console.log(url)
            if (boolean == true) {
                return sendEmailConfirm(token,resultados)
            }
            return res.status(200).send({message: 'Autenticado com sucesso!',auth:true,token:token, _idUser: resultados[0].id})
        }
        return res.status(401).send({message: 'Falha na autenticação da password', message:'pass'})
    })
}