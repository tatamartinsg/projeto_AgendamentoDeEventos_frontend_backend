const Cadastro = require('../models/cadastroBD')
const postSignUp = require('../controllers/signUP/postSignUp.js')
const jwt = require('jsonwebtoken')
module.exports = app => {
    app.get('/',(req,res)=>{
        res.send()
    })
    app.get('/all-cadastros', (req,res) => {

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
        postSignUp(req,res)
    
     })

     app.delete('/cadastro/:id', (req,res) => {
         Cadastro.deletaUsers(req.params.id)
         .then(response => {
             res.status(200).json({message: "the id was deleted with successful"})
         })
         .catch(error => {
             console.log(error)
             res.status(400).json({error: "couldn't delete the id inserted"})
         })
     })

     app.get('/confirmation/:token', async (req,res) => {    
        try{
            const tokenKEY = 'JWT_KEY-SECRET-KEY-07022002'
            console.log('req paramssssssssss',req.params.token)
           
            await jwt.verify(req.params.token,tokenKEY,(err,decoded)=>{
                if(err){
                    console.log('token invalid')
                    return res.status(401).json({message: "token invalid"})
                }
                else{ 
                    console.log(decoded)
                    console.log('usuario esta confirmado')
                    Cadastro.updateCadastroConfirmed(decoded._idUser)
                    res.status(200).json({message:"email confirmed"})
                    

                }
            })


            
        }
        catch (e) {
            console.log(e)
        }
       
     })

}