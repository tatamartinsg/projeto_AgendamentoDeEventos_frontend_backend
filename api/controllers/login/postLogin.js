const SelectDB = require('../../models/selectDB')
const generateToken = require('../../config/generateToken')
const bcrypt = require('bcrypt')

module.exports = function postLogin(req, res, body) {
      SelectDB.selecionaEmail(body)
            .then(resultados => {
                if (resultados.length > 0) {
                    console.log(resultados[0].confirmed)
                    if (resultados[0].confirmed == 'false') {
                       return res.status(400).json({message: 'email is not confirmed'})
                    }
                    else {
                        bcrypt.compare(body.password, resultados[0].password,(error,result)=> {
                            if(error){
                                return res.status(401).send({message: 'Falha na autenticação'})
                            }
                            if(result){
                                let token = generateToken(resultados[0])
                                return res.status(200).send({message: 'Autenticado com sucesso!',auth:true,token:token, _idUser: resultados[0].id})
                            }
        
                            return res.status(401).send({message: 'Falha na autenticação da password', message:'pass'})
                        
                        })
                    }            
                }
                else{
                    return res.status(401).send({message: 'Falha na autenticação do email', message: "invalid email"})
                }

            })
}