const Select = require('../../models/selectDB')
const SelectDB = require('../../models/selectDB')
const { EncryptPassword } = require('../encryptPassword/encryptPassword')
const bcrypt = require('bcrypt')
const generateToken = require('../../config/generateToken')
// const Email = require('../../config/email')
module.exports = function postSignUp(req,res,body) {
    let tamanho_email = body.email.length
    let tamanho_senha = body.password.length
    let aux;

    if (tamanho_email >= 12){
        if(tamanho_senha >= 5){
            Select.selecionaEmail(body)
                .then(resultados => {
                    for (var i=0; i<resultados.length; i++){
                        if(resultados[i].email == body.email){
                            aux = 0
                        }
                        else{
                            aux = 1 
                        }
                    }
                    if(aux == 0){
                        console.log("Já existe esse email cadastrado!")
                        res.status(400).json({message: 'Email existente!'})
                    }
                    else{
                        EncryptPassword(body)
                    
                        SelectDB.selecionaEmail(body)
                            .then(resultados => {
                            console.log('results',resultados)
                            if (resultados.length > 0){
                                bcrypt.compare(body.password, resultados[0].password,(error,result)=> {
                                    if(error){
                                        return res.status(401).send({message: 'Falha na autenticação'})
                                    }
                                    if(result){
                                        const token = generateToken(resultados[0])

                                        const url = `http://localhost:8080/confirmation/${token}`
                                        console.log(url)
                                        const message = `Please click this email to confirm your email: <a href="${url}">${url}</a>`
                                        const emailSent = [resultados[0].email]
                                                           
                                        try {
                                            // if (Email.sendEmail(message, emailSent)) {
                                            //      res.status(200).json({message: "sucessfull", token:token})
                                            // }
                                            res.status(200).json({message: "sucessfull", token:token})
                                        }
                                        catch (err) {
                                            console.log('deu erro', err)
                                            res.status(400).json({message: "error sending the email", token:token})
                                        }                                              
                                    }
                                    })
                                }
                            })
                            .catch(err => console.log(err))                               
                    }
                })
             
        }
        else{
            console.log("Caracteres na senha são insuficientes (menor que 5)")
            res.status(400).json({message:"Caracteres na SENHA são insuficientes (menor que 5)"})
        }
    }
    else{
        console.log("Caracteres no email são insuficientes (menor que 12)")
        res.status(400).json({message:"Email inválido!", erro: 'Caracteres no email são insuficientes (menor que 12)'})
    }
}