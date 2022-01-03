const Cadastro = require('../models/cadastroBD')
const postSignUp = require('../controllers/signUP/postSignUp.js')

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

}