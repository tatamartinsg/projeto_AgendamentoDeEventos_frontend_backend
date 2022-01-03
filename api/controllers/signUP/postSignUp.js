const Select = require('../../models/selectDB')
const CadastroController = require('../encryptPassword')

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
                                    res.status(200).json({message: 'Cadastrado com sucesso!'})
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