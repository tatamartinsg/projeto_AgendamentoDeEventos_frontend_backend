const expressConfig = require('./config/express')
const conexao = require('./infrastructure/conexao')
const CreateTable = require('./infrastructure/createTable')
const PORT = process.env.PORT || 3000

conexao.connect(erro => {
    if(erro){
        console.log("Erro ao conectar com o banco de dados:", erro)
    }
    else{
        CreateTable.init(conexao)
        const app = expressConfig()

        app.listen(PORT, ()=> {
            console.log(`Servidor rodando na porta ${PORT} com sucesso!`)
        })

        app.use((req,res,next) => {
            const erro = new Error("Não encontrado")
            erro.status = 404
            next(erro)
        })

        app.use((error,req,res,next) => {
            res.status(error.status || 500)
            return res.send({
                erro:{
                    mensagem: error.message
                }
            })
        })
    }
})
