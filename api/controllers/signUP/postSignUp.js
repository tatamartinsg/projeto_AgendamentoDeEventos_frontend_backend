const Select = require('../../models/selectDB')
const SelectDB = require('../../models/selectDB')
const { EncryptPassword } = require('../encryptPassword')
const Email = require('../../config/email.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const Email = require('../../config/email')
module.exports = function postSignUp(req,res) {
    const body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
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
                                        console.log(resultados)
                                        const tokenKEY = (process.env.JWT_KEY)
                                        console.log('AAAAAAAAAAAAAAAAAAAAAAA')
                                        const token = jwt.sign({
                                            name: resultados[0].name,
                                            email: resultados[0].email,
                                            _idUser: resultados[0].id
                                        },tokenKEY,{
                                            expiresIn: "2000000"
                                        })

                                        const url = `http://localhost:8080/confirmation/${token}`
                                        console.log(url)
                                        const message = `Please click this email to confirm your email: <a href="${url}">${url}</a>`
                                        const emailSent = [resultados[0].email]
                                        console.log(emailSent)
                                        
                                        try {
                                            // Email.sendEmail(message, emailSent)
                                            console.log('deu certo')
                                        }
                                        catch (err) {
                                            console.log('deu erro', err)
                                        } 
                                           
                                        console.log('aaaaaaaaaaaaaaaaa')
                                        console.log('token', token)
                                        res.status(200).json({message: "sucessfull", token:token})
                                     
                                    }
                                    })
                                }
                            }).catch(err => console.log(err))
                                
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