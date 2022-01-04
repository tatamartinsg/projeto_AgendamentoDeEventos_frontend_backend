const Select = require('../../models/selectDB')
const SelectDB = require('../../models/selectDB')
const CadastroController = require('../encryptPassword')
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
                        CadastroController.EncryptPassword(body)
                            .then(resultadosPassword => {
                                SelectDB.selecionaEmail(body)
                                .then(resultados => {
                                    if (resultados.length > 0){
                                        bcrypt.compare(body.password, resultados[0].password,(error,result)=> {
                                            if(error){
                                                return res.status(401).send({message: 'Falha na autenticação'})
                                            }
                                            if(result){
                                                console.log(resultados)
                                                const tokenKEY = (process.env.JWT_KEY)
                                                console.log('AAAAAAAAAAAAAAAAAAAAAAA')
                                                console.log(resultadosPassword)
                                                const token = jwt.sign({
                                                    name: resultados[0].name,
                                                    email: resultados[0].email,
                                                    _idUser: resultados[0].id
                                                },tokenKEY,{
                                                    expiresIn: "1000000"
                                                })

                                                const url = `http://localhost:3000/confirmation/${token}`
                                                console.log(url)
                                                // const message = `Please click this email to confirm your email: <a href="${url}">${url}</a>`
                                                // const emailSent = [resultadosPassword.email]
                                                // Email.sendEmail(message,emailSent)
                                                http://localhost:3000/confirmation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9hbyBlIG1hcmlhIiwiZW1haWwiOiJBc0Bob3RtYWlsLmNvbSIsIl9pZFVzZXIiOjMwLCJpYXQiOjE2NDEyMzMwODcsImV4cCI6MTY0MTIzNDA4N30.1MqoTAsDv5dH0j4wx8K-gWyt3syz2Dosi7UfaRqwRyM%20token%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9hbyBlIG1hcmlhIiwiZW1haWwiOiJBc0Bob3RtYWlsLmNvbSIsIl9pZFVzZXIiOjMwLCJpYXQiOjE2NDEyMzMwODcsImV4cCI6MTY0MTIzNDA4N30.1MqoTAsDv5dH0j4wx8K-gWyt3syz2Dosi7UfaRqwRyM
                                                console.log('aaaaaaaaaaaaaaaaa')
                                                console.log('token', token)
                                                res.status(200).json({message: 'Cadastrado com sucesso!'})
                                            }
                                        })
                                    }
                                })
                                
                            })  
                            .catch(erros =>{
                                console.log(erros)
                                res.status(400).json(erros)
                            })
                    }
                })
                .catch(erros =>{
                    console.log(erros)
                    res.status(400).json(erros)
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