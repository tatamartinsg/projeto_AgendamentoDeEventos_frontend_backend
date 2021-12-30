const Cadastro = require('../models/cadastroBD')
const Select = require('../models/selectDB')
const CadastroController = require('../controllers/encryptPassword')
const jwt = require('jsonwebtoken')
const Email = require('../config/email.js')

module.exports = app => {
    app.get('/',(req,res)=>{
        res.send()
    })
    app.get('/all-cadastros', (req,res) => {
        // const email = 'tassiamaggv929@hotmail.com'
        // Email.sendEmail(email)
        const infoEmail = [
            {
                nameEvent
            }
        ]
        Cadastro.selecionaUsuarios()
            .then (resultados_select => {
                for(var i =0; i< resultados_select.length; i++){
                    console.log(resultados_select[i].email)
                }
                res.status(200).send(resultados_select)
            })
            .catch(erro_select => {
                res.status(400).send('Usuarios não encontrados')
            })
    })
    app.get('/all-cadastros/:id', (req,res) => {
        const id_usuario = req.params.id
        console.log(id_usuario)

        Cadastro.selecionaUsuariosPorId(id_usuario)
            .then (resultados => {
                if (resultados == ''){
                    res.status(400).send({mesage:'Usuário não encontrado'})
                }
                else{
                    res.status(200).send(resultados)
                }
            })
            .catch(erro => {
                res.status(400).send('Erro id', erro)
            })
    })

    app.get('/cadastro', (req,res)=>{
        console.log("Entrou no get")
        console.log(req.body)
        res.json('entrou no get')
    })

    app.post('/cadastro', (req,res)=>{
        //FAZER VERIFICAÇÕES DE SEGURANÇA DE CADASTRO
            //SE VIER VAZIO, ETC...

        console.log("entrou post cadastro")
        console.log('req params:',req.body)
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
    
     })

}