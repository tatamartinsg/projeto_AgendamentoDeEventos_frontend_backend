const EventsBD = require('../../repositories/events')
const Cadastro = require('../../repositories/cadastro.js')
const Email = require('../../config/email.js')
const EncryptID = require('../encryptID/EncryptID')

module.exports = function AddEvent(req, res) {

    EventsBD.addEvent(req.body)
        .then(response => {
            console.log(req.body.checkbox)
            if (req.body.checkbox == true) {
                EventsBD.selectIdEvent()
                    .then(select => {
                        const lastId = select[0].id_schedule

                        const link = EncryptID(lastId)
                        EventsBD.addIdEncrypt(lastId,link)
                        console.log(link)
                        Cadastro.selecionaUsuarios()
                            .then(result => {
                          
                                var AllEmails = []
                        
                                for (var j = 0; j < res.length; j++){
                                    if (result[j].confirmed == true) {
                                        if(result[j].id == req.body.idUserLogged){
                                            var index = j
                                            var EmailRemetente = `${result[index].email}`
                                            var NomeRemetente = `${result[index].name}`
                                        }
                                        else{
                                            AllEmails.push(result[j].email)
                                        }
                                    }
                                    
                                }
                                console.log('URLLLLLLLLLLLLLLLLLLLLL')
                                const url = `http://localhost:8080/confirmevent/${link}`
                                const message = `
                                    *EMAIL AUTOMATICO, POR FAVOR NÃO RESPONDA*
                                    
                                    Estamos notificando que um novo evento foi agendado, segue as informações:
                                    -> Nome do evento: ${req.body.name}
                                    -> Data do evento: ${req.body.dateEvent}
                                    -> Descrição do evento: ${req.body.description}
                                    -> Please confirm your participation on this link bellow:
                                    ${url}
                                `
                                console.log(url)
                                // Email.sendEmail(message, AllEmails)
                                // Email.sendEmail(res,req.body)

                                return res.status(200).json(req.body)
                            
                        })
                        .catch(error => {
                            console.log(error)
                            return res.status(400).json(error)
                        })
                    })  
            }
            else {
                return res.status(200).json({body:req.body,message: "we didn't notificate"})
            }
       
    })
    .catch((error) => {
        console.log(error)
        return res.status(400).json(error)
    })
}