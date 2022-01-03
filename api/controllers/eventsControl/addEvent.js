const EventsBD = require('../../repositories/events')
const Cadastro = require('../../repositories/cadastro.js')
const Email = require('../../config/email.js')

module.exports = function AddEvent(req,res) {
    EventsBD.addEvent(req.body)
    .then(response => {
        if(req.body.check == true){
            console.log(req.body.check)
            Cadastro.selecionaUsuarios()
                .then(res => {
                    var EmailRemetente = ""
                    var NomeRemetente = ""
                    var AllEmails = []
                    
                    for(var j = 0; j< res.length; j++){
                        if(res[j].id == req.body.idUserLogged){
                            var index = j
                            EmailRemetente = `${res[index].email}`
                            NomeRemetente = `${res[index].name}`
                        }
                        else{
                            AllEmails.push(res[j].email)
                        }
                    }
                    const message = `
                        *EMAIL AUTOMATICO, POR FAVOR NÃO RESPONDA*
                        
                        Estamos notificando que um novo evento foi agendado, segue as informações:
                        -> Nome do evento: ${req.body.name}
                        -> Data do evento: ${req.body.dateEvent}
                        -> Descrição do evento: ${req.body.description}
                    `
        
                    Email.sendEmail(message, AllEmails)
                    // Email.sendEmail(res,req.body)
                    // console.log(EmailRemetente, NomeRemetente, AllEmails)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        res.status(200).json(req.body)
    })
    .catch((error) => {
        console.log(error)
    })
}