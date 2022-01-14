const SelectDB = require('../../models/selectDB')

const bcryptCompare = require('../bcryptCompare/bcryptCompare')
module.exports = function postLogin(req, res, body) {
      SelectDB.verifyEmailDataBase(body)
            .then(resultados => {
                if (resultados.length > 0) {
                    if (resultados[0].confirmed == 'false') {
                       return res.status(400).json({message: 'email is not confirmed'})
                    }
                    bcryptCompare(res, body, resultados, false)
                
                }
                else{
                    return res.status(401).send({message: 'Falha na autenticação do email', message: "invalid email"})
                }

            })
}